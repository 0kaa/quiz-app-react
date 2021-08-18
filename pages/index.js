import styles from "styles/home.module.scss";
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
export default function Home() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const dispatch = useDispatch()

  const submitUsername = () => {
    if (username) {
      dispatch({ type: 'CHANGE_NAME', userName: username })
      dispatch({ type: 'START_EXAM' })
      router.push('/exam')
    }
  }
  const getUserStatus = useSelector((state) => state.userStartExam)

  useEffect(() => {
    if (getUserStatus) router.push('/exam')
  }, [])

  return (
    <div className="container mt-5">
      <h1 className={styles.title}>
        Welcome in <span>Questions Task!</span>
      </h1>
      <div className={`${styles.user_input} mt-5 mx-auto`}>
        <form onSubmit={(e) => { e.preventDefault(); submitUsername }}>
          <div className="mb-3">
            <input type="text" placeholder="Your Name" onChange={(e) => { setUsername(e.target.value) }} className={'form-control w-100 ' + styles.input} />
          </div>
          <button onClick={submitUsername} className="btn btn-primary w-100">Start Exam</button>
        </form>
      </div>

    </div>
  )
}

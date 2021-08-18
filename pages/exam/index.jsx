import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import axios from 'axios';
import Questions from 'components/Questions';

const exam = ({ questions }) => {
    const router = useRouter()
    const userStartExam = useSelector((state) => state.userStartExam)
    const currentQuestionIndex = useSelector((state) => state.currentQuestionIndex)
    const userAnswersCount = useSelector((state) => state.userAnwersCount)
    useEffect(() => {
        if (!userStartExam) {
            router.push('/')
        }
    }, [])

    return (
        <div className="container">
            {currentQuestionIndex <= questions.length
                ? <Questions questionsLength={questions.length} currentQuestionIndex={currentQuestionIndex} question={questions[currentQuestionIndex - 1]}></Questions> :
                <div>
                    <h2 className="text-center score-value">Your Score is <span className="text-primary">{userAnswersCount}</span></h2>
                </div>
            }

        </div>
    )
}

// This gets called on every request
export async function getServerSideProps() {
    const { data } = await axios.get('https://quiz-app-task.herokuapp.com/questions');
    // Pass data to the page via props
    return { props: { questions: data.questions } }
}



export default exam

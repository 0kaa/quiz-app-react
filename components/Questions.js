import axios from 'axios';
import { useState, useEffect } from 'react'
import questionStyles from "styles/question.module.scss";
import homeStyles from "styles/home.module.scss";
import { useDispatch } from 'react-redux'
const Questions = ({ question, questionsLength, currentQuestionIndex }) => {
    const [answer, setAnswer] = useState()
    const dispatch = useDispatch()
    const checkCorrectAnswer = async () => {
        const { data } = await axios.post('http://127.0.0.1:5000/questions/validation', {
            "questionID": question._id,
            "userAnswer": answer
        })
        if (data.answer) {
            dispatch({ type: 'USER_ANSWERS_COUNT_INCREMENT' })
        }
        dispatch({ type: 'QUESTION_INCREMENT' })
        setAnswer('')
    }
    return (
        <>
            <div>
                <h2 className={'mb-5 ' + homeStyles.title}>{question.question}</h2>
                <div className={questionStyles.answers}>
                    {question.answers.map((questionAnswer, index) => {
                        return (
                            <div key={index} className={`${answer === questionAnswer ? questionStyles.selected : ''} ${questionStyles.answer_box}`} onClick={() => { setAnswer(questionAnswer) }}>{questionAnswer}</div>
                        )
                    })}
                </div>

                <div className="text-center mt-5">
                    <h6 className="text-muted">{currentQuestionIndex <= questionsLength ? `${currentQuestionIndex} / ${questionsLength}` : ''}</h6>
                    <button onClick={checkCorrectAnswer} className="btn btn-primary" disabled={!answer}>
                        {currentQuestionIndex != questionsLength ? 'Next Question' : 'Confirm'}
                    </button>
                </div>
            </div>
        </>
    )
}

export default Questions

import { useState, useEffect, useRef } from "react";
import './Quizz.css';
import {data} from '../../../backend/QuizData';
import ReactDOM from "react-dom/client";
const Quiz = () => {
    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lock, setLock] = useState(false);

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    let option_array = [Option1, Option2, Option3, Option4];
    const checkAns = (e, ans) =>{
        if(lock === false){
            if(question.ans === ans){
                console.log("Correct");
                e.target.classList.add("correct");
                setLock(true);
            } else{
                console.log("Wrong");
                e.target.classList.add("wrong");
                setLock(true);
                option_array[question.ans - 1].current.classList.add("correct");
            }
        }
        
    }
    return(
        <div className = 'container-quiz'>
            <h1>Welcome to Tasty Trivia!!!</h1>
            <h2>{index + 1}.{question.question}</h2>
            <ul id>
                <li onClick = {(e)=>{checkAns(e,1)}}>{question.option1}</li>
                <li onClick = {(e)=>{checkAns(e,2)}}>{question.option2}</li>
                <li onClick = {(e)=>{checkAns(e,3)}}>{question.option3}</li>
                <li onClick = {(e)=>{checkAns(e,4)}}>{question.option4}</li>
            </ul>
            <button>Next</button>
        </div>
    )
}

export default Quiz;
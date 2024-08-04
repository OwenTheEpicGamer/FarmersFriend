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
            if(data[index].ans === ans){
                console.log("Correct");
                e.target.id.add("correct");
                setLock(true);
            } else{
                console.log("Wrong");
                e.target.id.add("wrong");
                setLock(true);
            }
        }
        
    }
    const nextQ = () => {
        const idx = index + 1
        const  nQuestion = question + 1
        if(idx < data.length){
            setIndex(idx); setQuestion(nQuestion)
        }
            
        else alert("You have completed the quiz")
        console.log(data.length)
    }
    return(
        <div className = 'container-quiz'>
            <h1>Welcome to Tasty Trivia!!!</h1>
            <h2>{index + 1}.{data[index].question}</h2>
            <ul id>
                <li onClick = {(e)=>{checkAns(e,1)}}>{data[index].option1}</li>
                <li onClick = {(e)=>{checkAns(e,2)}}>{data[index].option2}</li>
                <li onClick = {(e)=>{checkAns(e,3)}}>{data[index].option3}</li>
                <li onClick = {(e)=>{checkAns(e,4)}}>{data[index].option4}</li>
            </ul>
            <button onClick={nextQ}>Next</button>
        </div>
    )
}

export default Quiz;
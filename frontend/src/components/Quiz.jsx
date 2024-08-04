import { useState, useEffect, useRef } from "react";
import './Quizz.css';
import {data} from '../../../backend/QuizData';

const Quiz = () => {
    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    let option_array = [Option1, Option2, Option3, Option4];
    const checkAns = (e, ans) =>{
        if(lock === false){
            if(question.ans === ans){
                console.log("Correct");
                e.target.setAttribute('id', "correct");
                //e.target.classList.add("correct");
                setLock(true);
                setScore(prev=>prev+1);
            } else{
                console.log("Wrong");
                e.target.setAttribute('id', "wrong");
                //e.target.classList.add("wrong");
                setLock(true);
                //console.log(option_array[question.ans - 1].current.classList);
                option_array[question.ans - 1].current.setAttribute('id', "correct");
            }
        }
        if(data[index].funFact !== ""){
            alert(data[index].funFact);
        }
    }
    const nextQ = () => {
        console.log(index);
        if(index < data.length - 1){
            if(lock===true){
                setIndex(++index);
                setQuestion(data[index]);
                setLock(false);
                option_array.map((option) =>{
                    option.current.setAttribute('id', '');
                    return null;
                })
            }
        }  else alert("You have completed the quiz, you scored " + score + " out of " + data.length);
        console.log(data.length)
    }
    return(
        <div className = 'container-quiz'>
            <h1 class = "welcome-quiz">Welcome to Tasty Trivia!!!</h1>
            <h2>{index + 1}. {question.question}</h2>
            <ul id>
                <li ref = {Option1} onClick = {(e)=>{checkAns(e,1)}}>{question.option1}</li>
                <li ref = {Option2} onClick = {(e)=>{checkAns(e,2)}}>{question.option2}</li>
                <li ref = {Option3} onClick = {(e)=>{checkAns(e,3)}}>{question.option3}</li>
                <li ref = {Option4} onClick = {(e)=>{checkAns(e,4)}}>{question.option4}</li>
            </ul>
            <button onClick={nextQ}>NEXT</button>
        </div>
    )
}

export default Quiz;
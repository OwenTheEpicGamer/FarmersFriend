import './QuantityBtn.css';
import React, {useState} from 'react';

const QuantityBtn = (limit) => {
    const [count, setCount] = useState(0);
    function increase(){
        setCount(count + 1);
    }
    function decrease(){
        if(count > 0){
            setCount(count - 1);
        }
    }
    return <>
    <div class = "container">
        <p>Quantity: </p>
        <button onClick = {decrease} class = "minus">-</button>
        <p class="count-num">{count}</p>
        <button onClick = {increase} class = "plus">+</button>
    </div>
    </>
};

export default QuantityBtn;
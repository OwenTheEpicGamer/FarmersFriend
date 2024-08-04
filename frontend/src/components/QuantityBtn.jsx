import './QuantityBtn.css';
import React, { useState } from 'react';

const QuantityBtn = ({item, totalPrice, setTotalPrice}) => {
    const [count, setCount] = useState(0);

    function increase() {
        setCount(count + 1);
        setTotalPrice(totalPrice+Number(item.price))
        item.quantity -=1;
    }
    function decrease() {
        if (count > 0) {
            setCount(count - 1);
            setTotalPrice(totalPrice-Number(item.price));
            item.quantity +=1; // whata does this update
        }
    }
    return <>
        <div className='box'>
            <h2>{item.name}</h2>
            <p>Price: ${item.price}</p>
            <div class="container">
                <p>Quantity: </p>
                <button onClick={decrease} class="minus">-</button>
                <p class="count-num">{count}</p>
                <button onClick={increase} class="plus">+</button>
            </div>
            {/* <p>Quantity: {item.quantity}</p> */}
        </div>
    </>
};

export default QuantityBtn;
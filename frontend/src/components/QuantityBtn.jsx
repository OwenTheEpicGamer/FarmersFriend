import './QuantityBtn.css';
import React, { useState } from 'react';

const QuantityBtn = ({item, totalPrice, setTotalPrice}) => {
    const [count, setCount] = useState(0);

    function increase() {
        if(item.quantity > 0){
            setCount(count + 1);
            setTotalPrice(totalPrice+Number(item.price))
            item.quantity -=1;
        }   
    }
    function decrease() {
        if (count > 0) {
            setCount(count - 1);
            setTotalPrice(totalPrice-Number(item.price));
            item.quantity +=1; 
        }
    }

    const handleUpdate = async (id, newQuant) => {
        try { 
            const response = await fetch(`http://localhost:3001/update/${id}`, {
                method: 'PATCH',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: newQuant })
            });
            if(response.ok) {
                const result = await response.json(); console.log('Document Updated o7', result)
            } else {
                const error = await response.json(); console.error('Failed :(', error)
            }
        } catch (error) {
            console.error('Error', error)
        }
    }
    return <>
        <div className='box'>
            <h2>{item.name}</h2>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <div class="container">
                <p>Buy: </p>
                <button onClick={decrease} class="minus">-</button>
                <p class="count-num">{count}</p>
                <button onClick={increase} class="plus">+</button>
                <button class="submit-btn" onClick={() => handleUpdate(item._id, item.quantity)}>Confirm</button>

            </div>
        </div>
    </>
};

export default QuantityBtn;
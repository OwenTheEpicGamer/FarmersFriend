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
              {/* row 1 */}
              {item.name === "Corn" ? (
                <div><img class = "image1" src = "src\img\corn.jpg"/></div>
            ): null}
            {item.name === "Tomato" ? (
                <div><img class = "image1" src = "src\img\tomato.jpg"/></div>
            ): null}
            {item.name === "Bread" ? (
                <div><img class = "image1" src = "src\img\bread.jpg"/></div>
            ): null}
            {/* row 2 */}
            {item.name === "Cheese" ? (
                <div><img class = "image1" src = "src\img\cheese.jpg"/></div>
            ): null}
            {item.name === "Eggs" ? (
                <div><img class = "image1" src = "src\img\eggs.png"/></div>
            ): null}
            {item.name === "Peas" ? (
                <div><img class = "image1" src = "src\img\peas.png"/></div>
            ): null}
            {/* row 3 */}
            {item.name === "Cherries" ? (
                <div><img class = "image1" src = "src\img\cherry.png"/></div>
            ): null}
            {item.name === "Watermelon" ? (
                <div><img class = "image1" src = "src\img\watermelon.png"/></div>
            ): null}
            {item.name === "Asparagus" ? (
                <div><img class = "image1" src = "src\img\asparagus.png"/></div>
            ): null}
            {/* row 4 */}
            {item.name === "Kale" ? (
                <div><img class = "image1" src = "src\img\kale.png"/></div>
            ): null}
            {item.name === "Apple" ? (
                <div><img class = "image1" src = "src\img\apple.png"/></div>
            ): null}
            {item.name === "Green Onions" ? (
                <div><img class = "image1" src = "src\img\greenOnion.png"/></div>
            ): null}
            <h2>{item.name}</h2>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Condition: {item.condition}</p>
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
import React, { useState, useEffect, useContext } from 'react';
import './Listings.css'
import QuantityBtn from './QuantityBtn';
import Welcome from './Welcome.jsx';

const Listings = () => {
    fetch('http://localhost:3001/listings', {
        method: "GET",
    })
    .then((res) => {
        return res.json();
    })
    .then(data => {
        setList(data);
        console.log(list)
    })

    const [list, setList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredList = list.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Welcome></Welcome>
            <h1>Current Listings</h1>
            <input
            className='search'
                type="text"
                placeholder='Search items'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className='itemContainer'>
                <div className='grid'>
                    {filteredList.map((item, index) => (
                        <div className='box' key={index}>
                            <h2>{item.name}</h2>
                            <p>Price: ${item.price}</p>
                            <QuantityBtn ></QuantityBtn>
                            {/* <p>Quantity: {item.quantity}</p> */}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Listings;
import React, { useState, useEffect, useContext } from 'react';
import './Listings.css'
import QuantityBtn from './QuantityBtn';
import Welcome from './Welcome.jsx';
import Submit from './Submit.jsx';

const Listings = () => {   
    useEffect(() => {
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
    }, [])

    const [list, setList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);

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
                        <React.Fragment key={index}>
                            <QuantityBtn item={item} totalPrice={totalPrice} setTotalPrice={setTotalPrice}/>
                        </React.Fragment>
                    ))}
                </div>
                <div class = "cost-container">
                    <p class = "total-price-1">Total Cost</p>
                    <p class = "total-price-2">${totalPrice.toFixed(2)}</p>
                    <Submit></Submit>
                </div>
            </div>
        </>
    );
}

export default Listings;
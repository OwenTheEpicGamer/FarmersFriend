import React, { useState, useEffect, useContext } from 'react';

const Listings = () => {
    const [list, setList] = useState([]);
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

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {list.map((item, index) => (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Listings;
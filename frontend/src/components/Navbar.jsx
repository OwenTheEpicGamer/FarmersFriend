import React, { useState } from 'react'
import Listings from './Listings.jsx'
import Bot from './Bot.jsx'
import styled from "styled-components"

const Tab = styled.button`
  padding: 10px 30px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
  border-bottom: 2px solid transparent;
  transition: ease border-bottom 250ms;
  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`;

const Navbar = () => {
    const types = ['Crop Listing', 'Seasonal Recipe']
    const [active, setActive] = useState(types[0])
  return (
    <>
        <div>
        {types.map((type) => (
            <Tab
            key={type}
            active={active === type}
            onClick={() => setActive(type)}
             >
                {type}
            </Tab>
        ))}
    </div>
    <p/>
    {active === 'Crop Listing' && 
    <div>
        <Listings />
        </div>}
    {active === 'Seasonal Recipe' && 
    <div>
      <Bot />
      </div>}
    </>

  )
}

export default Navbar
import React, { useState } from 'react'
import Listings from './Listings.jsx'
import Bot from './Bot.jsx'
import './Bot.css';
import styled from "styled-components"
import Quiz from './Quiz.jsx';

const Tab = styled.button`
  padding: 10px 30px;
  cursor: pointer;
  font-size: 16px;
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
    const types = ['Crop Listing', 'Seasonal Recipe', 'Tasty Trivia']
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
    <div class = "bot-bg">
      <div>
      <Bot />
      </div>
    </div>
    }
    {active === 'Tasty Trivia' && 
    <div>
      <Quiz></Quiz>
      </div>}
    </>

  )
}

export default Navbar
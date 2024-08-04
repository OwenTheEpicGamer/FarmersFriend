import React, { useState, useEffect } from 'react'
import './Bot.css';
const Bot = () => {
  const [recipe, setRecipe] = useState();
  const [gotRecipe, setGotRecipe] = useState(false)

  if (!gotRecipe) {
    setGotRecipe(true)
    fetch('http://localhost:3001/recipe', {
      method: "GET",
    })
      .then((res) => {
        return res.text()
      })
      .then(data => {
        setRecipe(data)
      })
  }
  return (
    <>
    <div class = "parent">
      <img class = "bot-bg" src = "src/img/bg.jpg"/>
      <div class = "recipe-text" dangerouslySetInnerHTML={{ __html: recipe }}></div>
    </div>
    </>
  )
}
export default Bot;
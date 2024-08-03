import React, { useState } from 'react'

const Bot = () => {
  const [recipe, setRecipe] = useState();
  const [gotRecipe, setGotRecipe] = useState(false)

  if(!gotRecipe) {
    setGotRecipe(true)
    fetch('http://localhost:3001/recipe', {
      method: "GET",
    })
    .then((res) => {
      return res.text();
    })
    .then(data => {
      console.log(data)
      setRecipe(data)
  })
  }
  return (
    <>
    <div>
      <p>Fard</p>
      <p>{recipe}</p>
    </div>
    </>
  )
}

export default Bot
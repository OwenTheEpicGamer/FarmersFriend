import React, { useState, useEffect } from 'react'

const Bot = () => {
  const [recipe, setRecipe] = useState();
  const [gotRecipe, setGotRecipe] = useState(false)

  if(!gotRecipe) {
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
    <div dangerouslySetInnerHTML={{ __html: recipe}}>
    </div>
    </>
  )
}

export default Bot
import React, { useState } from 'react'

const Bot = () => {

  fetch('http://localhost:3001/recipe', {
    method: "GET",
  })
  .then((res) => {
    return res.json();
  })
  .then(data => {
    console.log(data)
})
  return (
    <>
    <div>
      <p>Fard</p>
    </div>
    </>
  )
}

export default Bot
import React, { useEffect } from 'react'

function Pop() {

  useEffect(() => {
    getPop();
  },[]);

  const getPop = async () => {
    const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.API_KEY}&number=12`)
    const data = await api.json();
    console.log(data);
  }

  return (
    <div>Pop</div>
  )
}

export default Pop
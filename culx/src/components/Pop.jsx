import { useEffect, useState } from 'react';
import styled from "styled-components"
import {Splide, SplideSlide} from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from 'react-router-dom';

function Pop() {

  const [pop, setPop] = useState([]);

  useEffect(() => {
    getPop();
  }, []);

  const getPop = async () => {

    const check = localStorage.getItem('popular');

    if (check){
      setPop(JSON.parse(check));
    }else {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
      const data = await api.json();

      localStorage.setItem('popular', JSON.stringify(data.recipes));
      setPop(data.recipes);
      console.log(data.recipes);
    }
    
  };

  return (
    <div>
      <Wrapper>
        <h3>Popular Recipes</h3>
          <Splide options={{
             perPage: 3,
             arrows: false,
             drag: "free",
             gap: "5rem",
           }}
          >
            {pop.map((recipe) => {
              return(
                <SplideSlide key={recipe.id}>
                  <Card>
                    <Link to={"/recipe/" + recipe.id}>
                      <p>{recipe.title}</p>
                      <img src={recipe.image} alt={recipe.title} />
                      <Gradient />
                    </Link>
                  </Card>
                </SplideSlide>
                );
              })}
            </Splide>
          </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
  `;

  const Card = styled.div`
  width: 100%; /* Set the width of the card container */
  max-width: 700px; /* Set the maximum width to control the rectangle's size */
  border-radius: 1rem; /* Add rounded edges */
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: auto; /* Allow the image to adjust its height while maintaining aspect ratio */
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    height: 40%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;


const Gradient = styled.div`
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));`

export default Pop;
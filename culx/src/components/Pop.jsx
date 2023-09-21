import { useEffect, useState } from 'react';
import styled from "styled-components"
import {Splide, SplideSlide} from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

function Pop() {

  const [pop, setPop] = useState([]);

  useEffect(() => {
    getPop();
  }, []);

  const getPop = async () => {
    const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
    const data = await api.json();
    setPop(data.recipes);
    console.log(data.recipes);
  };

  return (
    <div>
      <Wrapper>
        <h3>Popular Recipes</h3>
          <Splide options={{
             perPage: 2,
           }}>
            {pop.map((recipe) => {
              return(
                <SplideSlide>
                  <Card>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                  </Card>
                </SplideSlide>
                )
              })}
            </Splide>
          </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
  `;

const Card =styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;

  img{
    border-radius: 2rem;
  }
`;

export default Pop;
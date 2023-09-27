import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function Recipe() {
  const [details, setDetails] = useState({
    title: "",
    name: "",
    image: "",
    summary: "",
    instructions: "",
    extendedIngredients: [],
  });

  const params = useParams();
  const [activeTab, setActiveTab] = useState("instructions");

  const fetchDetails = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
      );
      const detailData = await response.json();
      setDetails(detailData);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  }, [params.name]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return (
    <DetailContainer>
      <ImageContainer>
        <img src={details.image} alt={details.title} />
      </ImageContainer>
      <InfoContainer>
        <h2>{details.title}</h2>
        <TabButtons>
          <Button
            className={activeTab === "instructions" ? "active" : ""}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </Button>
          <Button
            className={activeTab === "ingredients" ? "active" : ""}
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </Button>
        </TabButtons>
        {activeTab === "instructions" && (
          <div>
            <p dangerouslySetInnerHTML={{ __html: details.summary }}></p>
            <p dangerouslySetInnerHTML={{ __html: details.instructions }}></p>
          </div>
        )}
        {activeTab === "ingredients" && details.extendedIngredients && (
          <ul>
            {details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.originalString}</li>
            ))}
          </ul>
        )}
      </InfoContainer>
    </DetailContainer>
  );
}

const DetailContainer = styled.div`
  display: flex;
  margin-top: 10rem;
  margin-bottom: 5rem;

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  padding-right: 2rem;

  img {
    max-width: 100%;
    height: auto;
  }
`;

const InfoContainer = styled.div`
  flex: 2; /* Adjust the flex value as needed to control the width of the info section */
  font-size: 1.2rem;
  font-weight: 400;

  h2 {
    margin-bottom: 2rem;
  }

  p {
    margin-bottom: 1rem;
  }

  ul {
    margin-top: 2rem;
    list-style: none;
    padding: 0;
  }
`;

const TabButtons = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }
`;

export default Recipe;

import { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
        );
        const detailData = await response.json();
        setDetails(detailData);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchDetails();
  }, [params.name]);


  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
      </div>
      <Info>
      <Button className={activeTab === "instructions" ? "active" : ""}
        onClick={() => setActiveTab("instructions")}>Instructions</Button>
        <Button1 className={activeTab === "ingredients" ? "active" : ""}
        onClick={() => setActiveTab("ingredients")}>Ingredients</Button1>
        {activeTab === "instructions" && (
        <div>
          <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
          <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
        </div> )}
        {activeTab === "instructions" && (
        <ul>
          {details.extendedIngredients.map((ingredient) => 
            <li key={ingredient.id}>Ingredients</li>
          )}
        </ul> )}
      </Info>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2 rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
  `

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`
const Button1 = styled.button`
  padding: 1rem 2rem;
  margin-top: 1rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`

const Info = styled.div`
  margin-left: 10rem;
  `

export default Recipe
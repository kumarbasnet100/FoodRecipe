import React, { useEffect, useState } from "react";
import "./meal.css";

const Meal = () => {
  const [mealData, setMealData] = useState([]);
  const [area, setArea] = useState("indian");
  const [inputData, setInputData] = useState('');

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      const api = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
      );
      const data = await api.json();

      console.log(data.meals);

      setMealData(data.meals);
    };

    fetchDataFromAPI();
  }, [area]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputData}`
    );
    const data = await api.json();
    console.log("search data=", data.meals);

    setMealData(data.meals);
    setInputData('');
  };

  return (
    <>
      <div
        className="my-3"
        style={{ width: "1000px", margin: "auto", textAlign: "center" }}
      >
        <button
          onClick={() => setArea("Indian")}
          type="button"
          className="btn btn-outline-primary mx-3"
        >
          Indian
        </button>
        <button
          onClick={() => setArea("Canadian")}
          type="button"
          className="btn btn-outline-warning mx-3"
        >
          Canadian
        </button>
        <button
          onClick={() => setArea("American")}
          type="button"
          className="btn btn-outline-light mx-3"
        >
          American
        </button>
        <button
          onClick={() => setArea("Thai")}
          type="button"
          className="btn btn-outline-info mx-3"
        >
          Thai
        </button>
        <button
          onClick={() => setArea("British")}
          type="button"
          className="btn btn-outline-warning mx-3"
        >
          British
        </button>
        <button
          onClick={() => setArea("Russian")}
          type="button"
          className="btn btn-outline-info mx-3"
        >
          Russian
        </button>
      </div>
      <form onSubmit={submitHandler} className="text-center mx-auto my-3">
        <input placeholder="searchByMealName" onChange={(e)=>setInputData(e.target.value)} type="text" />
      </form>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            width: "1200px",
          }}
        >
          {mealData.map((data) => (
            <div
              key={data.idMeal}
              style={{ textAlign: "center", margin: "20px", maxWidth: "250px" }}
            >
              <div>
                <img
                  src={data.strMealThumb}
                  style={{
                    width: "220px",
                    border: "2px solid blue",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <h5>{data.strMeal}</h5>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Meal;

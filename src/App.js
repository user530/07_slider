import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import data from "./data";

export default function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  const prevInd = () => (index === 0 ? people.length - 1 : index - 1);
  const nextInd = () => (index === people.length - 1 ? 0 : index + 1);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(nextInd());
    }, 3000);

    return () => clearInterval(slider);
  }, [index]);

  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span>Reviews:
        </h2>
      </div>

      <div className="section-center">
        {people.map((person, personInd) => {
          const { id, image, name, title, quote } = person;

          let articleClass = "nextSlide";
          if (personInd === index) articleClass = "activeSlide";
          if (personInd === prevInd()) articleClass = "lastSlide";

          return (
            <article key={id} className={articleClass}>
              <img src={image} alt={`${name}-img`} className="person-img" />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text">{quote}</p>
              <FaQuoteRight className="icon" />
            </article>
          );
        })}

        <button className="prev" onClick={() => setIndex(prevInd())}>
          <FiChevronLeft />
        </button>

        <button className="next" onClick={() => setIndex(nextInd())}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

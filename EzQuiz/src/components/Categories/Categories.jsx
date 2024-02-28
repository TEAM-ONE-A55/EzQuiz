import { useEffect, useState } from "react";
import { API_CATEGORIES } from "../../constants/constants";
import PropTypes from "prop-types";
import "./Categories.css";

export default function Categories({ setCategory }) {
  const [options, setOptions] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch(API_CATEGORIES)
      .then((response) => response.json())
      .then((categories) => setOptions(categories.trivia_categories));
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCategory(e.target.value);
  };

  return (
    <div className="select-container">
      <select
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e)}
      >
        {options &&
          options.map((c) => {
            if (c.id !== 13) {
              return (
                <option value={c.id} key={c.id}>
                  {c.name}
                </option>
              );
            }
          })}
      </select>
    </div>
  );
}

Categories.propTypes = {
  setCategory: PropTypes.func.isRequired,
};

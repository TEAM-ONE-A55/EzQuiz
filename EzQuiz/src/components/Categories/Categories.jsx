import { useEffect, useState } from "react";
import { API_CATEGORIES } from "../../constants/constants";
import PropTypes from "prop-types";
import "./Categories.css";
import Select from "react-select";
import { reactSelectStyles } from "../../services/react-select-styles";

export default function Categories({ setCategory }) {
  const [options, setOptions] = useState(null);

  useEffect(() => {
    fetch(API_CATEGORIES)
      .then((response) => response.json())
      .then((categories) => setOptions(categories.trivia_categories.filter((c) => c.id !== 13)))
  }, []);

  return (
    <Select
        id="categories-dropdown-select"
        options={options && options.map((option) => {
            return { value: option.id, label: option.name };
        })}
        onChange={(e) => setCategory(e.value)}
        className="basic-multi-select w-64 mx-auto"
        styles={reactSelectStyles}
    />
  );

}

Categories.propTypes = {
  setCategory: PropTypes.func.isRequired,
};

import { reactSelectStyles } from "../../services/react-select-styles";
import { useEffect, useState } from "react";
import { API_CATEGORIES } from "../../constants/constants";
import PropTypes from "prop-types";
import Select from "react-select";

export default function Categories({ setCategory, initialValue = "" }) {
  const [options, setOptions] = useState(null);
  const [option, setOption] = useState(null);

  useEffect(() => {
    fetch(API_CATEGORIES)
    .then((response) => response.json())
    .then((categories) => {
      setOptions(categories.trivia_categories.filter((c) => c.id !== 13))
      setOption(categories.trivia_categories.find((c) => c.id === initialValue).name)
    })
  }, [initialValue]);

  if (initialValue) {
    return (
     <Select
          value={{ value: initialValue, label: option }}
          options={options && options.map((option) => {
              return { value: option.id, label: option.name };
          })}
          onChange={(e) => setCategory(e.value)}
          className="basic-multi-select w-64 mx-auto"
          styles={reactSelectStyles}
      />
  ) } else {
    return (
      <Select
      options={options && options.map((option) => {
          return { value: option.id, label: option.name };
      })}
      onChange={(e) => setCategory(e.value)}
      className="basic-multi-select w-64 mx-auto"
      styles={reactSelectStyles}
  />
    )
  }

}

Categories.propTypes = {
  initialValue: PropTypes.string,
  setCategory: PropTypes.func.isRequired,
};

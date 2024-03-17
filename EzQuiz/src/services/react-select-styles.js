export const reactSelectStyles = {
    control: (baseStyles) => ({
        ...baseStyles,
        border: "none",
        outline: "none",
        boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.1)",
        "&:hover": {
          backgroundColor: "none",
        },
        "&:active": {
          backgroundColor: "none",
        },
        transition: "all 0.2s ease-in-out",
        overflow: "hidden",
        caretColor: "transparent",
      }),
      option: (baseStyles) => ({
        ...baseStyles,
        color: "#1c1c1c",
        backgroundColor: "white",
        "&:hover": {
          backgroundColor: "#f3f4f6",
        },
        transition: "all 0.1s ease-in-out",
        overflow: "hidden",
      }),
      menu: (baseStyles) => ({
        ...baseStyles,
        transition: "0.1s ease-in-out",
        overflow: "hidden",
      }),
      
}
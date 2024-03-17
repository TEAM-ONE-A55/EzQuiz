import { quizVisibilityOptions } from "../../constants/constants";
import PropTypes from "prop-types";
import Select from "react-select";
import { reactSelectStyles } from "../../services/react-select-styles";
import { useState } from "react";
import {
  Dropdown,
  Ripple,
  initTWE,
} from "tw-elements";

initTWE({ Dropdown, Ripple });

export default function QuizVisibility({ setVisibility }) {

  const [state, setState] = useState("Public");

  return (
      <Select
        id="visibility-dropdown-select"
        options={quizVisibilityOptions.map((option) => {
            return { value: option, label: option };
        })}
        onChange={(e) => setVisibility(e.value.toLowerCase())}
        className="basic-multi-select w-64 mx-auto"
        styles={reactSelectStyles}
      />
  );
}

QuizVisibility.propTypes = {
  setVisibility: PropTypes.func,
};


// return (
//   <div className="relative block w-56" data-twe-dropdown-ref>
//     <button
//       className="flex items-center w-56 relative rounded bg-neutral-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 shadow-light-3 transition duration-150 ease-in-out hover:bg-neutral-200 hover:shadow-light-2 focus:bg-neutral-200 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
//       type="button"
//       id="dropdownMenuButton9"
//       data-twe-dropdown-toggle-ref
//       aria-expanded="false"
//       data-twe-ripple-init
//       data-twe-ripple-color="light">
//       {state}
//       <span className="ms-2 w-2 [&>svg]:h-5 [&>svg]:w-5">
//         <svg
//           className="absolute right-2 bottom-2"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 20 20"
//           fill="currentColor">
//           <path
//             fillRule="evenodd"
//             d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
//             clipRule="evenodd" />
//         </svg>
//       </span>
//     </button>
//     <ul
//       className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-base shadow-lg data-[twe-dropdown-show]:block "
//       aria-labelledby="dropdownMenuButton9"
//       data-twe-dropdown-menu-ref>
//       <li>
//         <a
//           className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline"
//           href="#"
//           data-twe-dropdown-item-ref
//           onClick={() => setState("public")}
//           >Public
//           </a>
//       </li>
//       <li>
//         <a
//           className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline"
//           href="#"
//           data-twe-dropdown-item-ref
//           onClick={() => setState("private")}
//           >Private
//           </a>
//       </li>
//     </ul>
//   </div>
// )
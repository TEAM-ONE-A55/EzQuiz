import PropTypes from "prop-types";
import Select from "react-select";
import { TECollapse } from "tw-elements-react";
import { useState } from "react";
import { reactSelectStyles } from "../../../services/react-select-styles";

export default function NewQuestion({ quiz, indexQ, handleChange, setCorrectAnswer, removeQuestion }) {

    const [activeAccElement, setActiveAccElement] = useState("");
    
    const handleAccClick = (value) => {
      if (value === activeAccElement) {
        setActiveAccElement("");
      } else {
        setActiveAccElement(value);
      }
    };
    
    return (
        <div key={indexQ}>
            <div id="accordionExample">
                <div className="rounded-lg border border-neutral-200 bg-white">
                <h2 className="mb-0" id="headingOne">
                    <button
                    className={`${
                        activeAccElement === "element1" &&
                        `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)]`
                    } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                    type="button"
                    onClick={() => handleAccClick("element1")}
                    aria-expanded="true"
                    aria-controls="collapseOne"
                    >
                    Question {indexQ + 1}
                    <span
                        className={`${
                        activeAccElement === "element1"
                            ? `rotate-[-180deg] -mr-1`
                            : `rotate-0 fill-[#212529]  dark:fill-white`
                        } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                        </svg>
                    </span>
                    </button>
                </h2>
                <TECollapse
                    show={activeAccElement === "element1"}
                    className="!mt-0 !rounded-b-none !shadow-none"
                >
                    <div className="px-5 py-4">
    
                        <div className="mt-1 mb-4">
                            <div className="max-w-[80%] mx-auto mb-5">
                                <span className="ml-4">Title<span className=" text-red-600 ml-1">*</span></span><br />
                                <input 
                                className="pl-3 border border-neutral-300 outline-none border-none2 rounded-md p-2 w-full focus:border-neutral-400 transition duration-300 ease-in-out" 
                                type="text" placeholder="Add question title..." 
                                onChange={(e) => handleChange("question", e.target.value, indexQ)}
                                />
                            </div>
    
                            <div className="max-w-[80%] mx-auto">
                                <span className="ml-4">Option 1<span className=" text-red-600 ml-1">*</span></span><br />
                                <input 
                                className="pl-3 border border-neutral-300 outline-none border-none2 rounded-md p-2 w-full focus:border-neutral-400 transition duration-300 ease-in-out" 
                                type="text" placeholder="Add option 1" 
                                onChange={(e) =>
                                    handleChange("option", e.target.value, indexQ, 0)
                                }
                                />
                            </div>
    
                            <div className="max-w-[80%] mx-auto">
                                <span className="ml-4">Option 2<span className=" text-red-600 ml-1">*</span></span><br />
                                <input 
                                className="pl-3 border border-neutral-300 outline-none border-none2 rounded-md p-2 w-full focus:border-neutral-400 transition duration-300 ease-in-out" 
                                type="text" placeholder="Add option 2" 
                                onChange={(e) =>
                                    handleChange("option", e.target.value, indexQ, 1)
                                }
                                />
                            </div>
    
                            <div className="max-w-[80%] mx-auto">
                                <span className="ml-4">Option 3<span className=" text-red-600 ml-1">*</span></span><br />
                                <input 
                                className="pl-3 border border-neutral-300 outline-none border-none2 rounded-md p-2 w-full focus:border-neutral-400 transition duration-300 ease-in-out" 
                                type="text" placeholder="Add option 3" 
                                onChange={(e) =>
                                    handleChange("option", e.target.value, indexQ, 2)
                                }
                                />
                            </div>
    
                            <div className="max-w-[80%] mx-auto">
                                <span className="ml-4">Option 4<span className=" text-red-600 ml-1">*</span></span><br />
                                <input 
                                className="pl-3 border border-neutral-300 outline-none border-none2 rounded-md p-2 w-full focus:border-neutral-400 transition duration-300 ease-in-out" 
                                type="text" placeholder="Add option 4" 
                                onChange={(e) =>
                                    handleChange("option", e.target.value, indexQ, 3)
                                }
                                />
                            </div>
                        </div>
                        
                        <div className="max-w-[50%] mx-auto">
                            <span className="ml-8">Choose correct answer<span className=" text-red-600 ml-1">*</span></span><br />
                            <Select
                                options={quiz.questions[indexQ].incorrect_answers.map((option) => {
                                    return { value: option, label: option };
                                })}
                                onChange={(e) => setCorrectAnswer(indexQ, e.value || '')}
                                className="basic-multi-select w-64 mx-auto"
                                styles={reactSelectStyles}
                            />
                        </div>
    
                        <span className="mt-16 mb-16 text-xl text-center block">10 points</span>
    
                        <button 
                        onClick={() => removeQuestion(indexQ)}
                        className="w-[40%] mx-auto mb-4 block rounded-lg bg-neutral-300 px-6 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-neutral-400 hover:shadow-neutral-800 focus:outline-none focus:ring-0"
                        >
                            Remove Question
                        </button>
                    </div>
                </TECollapse>
                </div>
            </div>
        </div>
    )
    // return (
    //     <div key={indexQ}>
    //         <h4>Question {indexQ + 1}</h4>
    //         <label htmlFor={`create-quiz-question-${indexQ}`}>
    //             Question {indexQ + 1} Title*
    //         </label>
    //         <br />
    //         <input
    //             id={`create-quiz-question-${indexQ}`}
    //             type="text"
    //             value={question.question}
    //             onChange={(e) => handleChange("question", e.target.value, indexQ)}
    //         />
    //         <br />
    //         <button onClick={() => addOption(indexQ)}>New Option</button>
    //         <br />
    //         {question.mixedAnswers.map((option, indexO) => <NewOption key={indexO} indexQ={indexQ} indexO={indexO} handleChange={handleChange} removeOption={removeOption} />)}
    //         <p>Choose correct answer*</p>
    //         <Select
    //             id="question-amount-dropdown-select"
    //             options={quiz.questions[indexQ].incorrect_answers.map((option) => {
    //                 return { value: option, label: option };
    //             })}
    //             onChange={(e) => setCorrectAnswer(indexQ, e.value)}
    //             className="basic-multi-select w-64 mx-auto"
    //         />
    //         <button onClick={() => removeQuestion(indexQ)}>
    //             Remove Question
    //         </button>
    //     </div>
    // );
}

NewQuestion.propTypes = {
    quiz: PropTypes.object,
    question: PropTypes.object,
    indexQ: PropTypes.number,
    indexO: PropTypes.number,
    handleChange: PropTypes.func,
    removeOption: PropTypes.func,
    addOption: PropTypes.func,
    setCorrectAnswer: PropTypes.func,
    removeQuestion: PropTypes.func,
};
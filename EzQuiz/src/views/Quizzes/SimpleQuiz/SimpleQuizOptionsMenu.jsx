import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";3
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router';
import { deleteQuizFromDatabase } from "../../../services/quiz.service";
import PropTypes from 'prop-types';
import { updateHub } from "../../../services/hub.service";

export default function SimpleQuizOptionsMenu({ quiz, id, handle, setChange, hubType, hubId}) {
    const { userData } = useContext(AppContext);

    const navigate = useNavigate();

    return (
    <Menu as="div" className="absolute sqom-left">

        <Menu.Button className="relative flex rounded-full text-sm focus:outline-none">
          <Bars3Icon className="h-7 w-7" aria-hidden="true" />
        </Menu.Button>
        
        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-20 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
            <Menu.Item>
                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100 w-full duration-75 ease-in-out"
                onClick={() => navigate(`/edit-quiz/${id}`)}
                >
                    Edit
                </button>
            </Menu.Item>
            <Menu.Item>
                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100 w-full duration-75 ease-in-out"
                onClick={() => {
                    deleteQuizFromDatabase(id, handle, hubType, hubId);
                    updateHub(hubType, hubId, "quizzes", id, null )
                    setChange((prev) => prev + 1);
                    }}>
                    Delete
                </button>
            </Menu.Item>
            <Menu.Item>
                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100 w-full duration-75 ease-in-out"
                onClick={() => {
                    navigate(`/results/${id}`, {}); 
                    }}>
                   Results
                </button>
            </Menu.Item>
            </Menu.Items>
        </Transition>
    </Menu>
    )
}

SimpleQuizOptionsMenu.propTypes = {
    quiz: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    handle: PropTypes.string.isRequired,
    setChange: PropTypes.func.isRequired,
    hubType: PropTypes.string,
    hubId: PropTypes.string
}
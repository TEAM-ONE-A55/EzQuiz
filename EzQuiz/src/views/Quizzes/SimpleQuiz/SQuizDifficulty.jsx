import PropTypes from 'prop-types'

export default function SQuizDifficulty({ difficulty }) {
    if (difficulty.toLowerCase() === 'easy') {
        return (
            <p className=" bg-green-400 text-xs uppercase text-white font-medium px-1 py-0.5 rounded mt-1">Easy</p>
        )
    } else if (difficulty.toLowerCase() === 'medium') {
        return (
            <p className=" bg-yellow-400 text-xs uppercase text-white font-medium px-1 py-0.5 rounded mt-1">Medium</p>
        )
    } else if (difficulty.toLowerCase() === 'hard') {
        return (
            <p className=" bg-red-400 text-xs px-1 uppercase text-white font-medium py-0.5 rounded mt-1">Hard</p>
        )
    }
}

SQuizDifficulty.propTypes = {
    difficulty: PropTypes.string.isRequired
}
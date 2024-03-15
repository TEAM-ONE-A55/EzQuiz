import PropTypes from 'prop-types'

export default function SQuizDifficulty({ difficulty }) {
    if (difficulty === 'easy') {
        return (
            <p className="text-white bg-green-400 text-xs px-1 py-0.5 rounded mt-1">Easy</p>
        )
    } else if (difficulty === 'medium') {
        return (
            <p className="text-white bg-yellow-400 text-xs px-1 py-0.5 rounded mt-1">Medium</p>
        )
    } else if (difficulty === 'hard') {
        return (
            <p className="text-white bg-red-400 text-xs px-1 py-0.5 rounded mt-1">Hard</p>
        )
    }
}

SQuizDifficulty.propTypes = {
    difficulty: PropTypes.string.isRequired
}
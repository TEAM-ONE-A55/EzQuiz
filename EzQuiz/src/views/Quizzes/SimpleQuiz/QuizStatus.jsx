import PropTypes from 'prop-types'

export default function QuizStatus({ status }) {
    if (status.toLowerCase() === 'ongoing') {
        return (
            <p className="text-white bg-green-400 text-xs uppercase font-medium px-1 py-0.5 rounded mt-1">{status}</p>
        )
    } else if (status.toLowerCase() === 'scheduled') {
        return (
            <p className="text-white bg-yellow-400 text-xs uppercase font-medium px-1 py-0.5 rounded mt-1">{status}</p>
        )
    } else if (status.toLowerCase() === 'sinished') {
        return (
            <p className="text-white bg-red-400 text-xs px-1 uppercase font-medium py-0.5 rounded mt-1">{status}</p>
        )
    }
}

QuizStatus.propTypes = {
    status: PropTypes.string.isRequired
}
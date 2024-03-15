import PropTypes from 'prop-types'

export default function QuizStatus({ status }) {
    if (status === 'Ongoing') {
        return (
            <p className="text-white bg-green-400 text-xs px-1 py-0.5 rounded mt-1">{status}</p>
        )
    } else if (status === 'Scheduled') {
        return (
            <p className="text-white bg-yellow-400 text-xs px-1 py-0.5 rounded mt-1">{status}</p>
        )
    } else if (status === 'Finished') {
        return (
            <p className="text-white bg-red-400 text-xs px-1 py-0.5 rounded mt-1">{status}</p>
        )
    }
}

QuizStatus.propTypes = {
    status: PropTypes.string.isRequired
}
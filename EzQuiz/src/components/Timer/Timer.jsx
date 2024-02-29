import { useTimer } from "react-timer-hook";
import "./Timer.css";
export default function Timer({ expiryTimestamp, setFinish}) {
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: () => setFinish(true),
  });
  return (
    <div className="timer">
      <div className="timer-values">
        <span>{days}</span> : 
        <span>{hours}</span> : 
        <span>{minutes}</span> : 
        <span>{seconds}</span>
      </div>
      <div className="timer-str">
        <span>days</span> {" "}
        <span>hours</span> {" "}
        <span>minutes</span> {" "}
        <span>seconds</span> {" "}
      </div>
    </div>
  );
}

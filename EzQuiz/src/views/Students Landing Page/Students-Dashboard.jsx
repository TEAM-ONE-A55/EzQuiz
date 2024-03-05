import Button from "../../components/Button/Button";
import BestPlayers from "../../components/BestPlayers/BestPlayers";

export default function StudentsDashboard() {
  return (
    <div>
      <div style={{ border: "solid" }}>
        <h2>Quizzes</h2>
        <h4>Trending Quizzess</h4>
        <p>Hardcoded quiz</p>
        <p>Hardcoded quiz</p>
        <p>Hardcoded quiz</p>
        <p>Hardcoded quiz</p>
        <Button onClick={() => {}}>All quizzes</Button>
        <Button onClick={() => {}}>Random quiz</Button>
      </div>

      <div style={{ border: "solid" }}>
        <BestPlayers />
      </div>
    </div>
  );
}

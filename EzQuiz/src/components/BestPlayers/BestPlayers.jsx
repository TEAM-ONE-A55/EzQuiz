import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/user.service";

export default function BestPlayers() {
  const [users, setUsers] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);

  const getAllPlayers = async () => {
    const users = await getAllUsers();
    setUsers(users);
  };

  useEffect(() => {
    getAllPlayers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const players = users.map((user) => {
        return {
          handle: user.val().handle,
          score: user.val().score,
        };
      });

      const sortedPlayers = players.sort((a, b) => {
        if (a.score === undefined && b.score === undefined) return 0;
        if (a.score === undefined) return 1;
        if (b.score === undefined) return -1;
        return b.score - a.score;
      });
      setAllPlayers(sortedPlayers);
    }
  }, [users]);

  return (
    <div>
      <h1>Best Players</h1>
      <h2>Top 10</h2> <br />
      <ul>
        {allPlayers.map(
          (player, index) =>
            player.score &&
            index < 10 && (
              <div key={player.handle}>
                {index + 1}. {player.handle} - {player.score} points
              </div>
            )
        )}
      </ul>
    </div>
  );
}

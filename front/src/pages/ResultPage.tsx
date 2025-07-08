import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface GameInfo {
  nome_jogo: string;
  tempo_de_jogo: number;
  ultima_vez_jogado: string;
  img_url_montada: string;
  appid: number;
}

const ResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const steamId = (location.state as any)?.steamId || '';

  const [username, setUsername] = useState<string>('');
  const [game, setGame] = useState<GameInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!steamId) return;
    setLoading(true);
    setError(null);
    Promise.all([
      fetch(`http://localhost:5000/username?steamid=${steamId}`).then(res => res.json()),
      fetch(`http://localhost:5000/sorteiotodos?steamid=${steamId}`).then(res => res.json())
    ]).then(([userRes, gameRes]) => {
      if (userRes.error) setError(userRes.error);
      else setUsername(userRes.username);
      if (gameRes.error) setError(gameRes.error);
      else setGame(gameRes);
      setLoading(false);
    }).catch(() => {
      setError('Failed to fetch data from API.');
      setLoading(false);
    });
  }, [steamId]);

  if (!steamId) return <div className="semi-box">No Steam ID provided.</div>;
  if (loading) return <div className="semi-box">Loading...</div>;
  if (error) return <div className="semi-box">Error: {error}</div>;

  return (
    <div className="semi-box">
      <button onClick={() => navigate(-1)} style={{ float: 'right' }}>Back</button>
      <h2>{username}</h2>
      <h3>{game?.nome_jogo}</h3>
      <img src={game?.img_url_montada} alt="Game Cover" style={{ width: 200, height: 300, borderRadius: 8 }} />
      <p><strong>Playtime:</strong> {Math.round((game?.tempo_de_jogo || 0) / 60)} hours</p>
      <p><strong>Last Played:</strong> {game?.ultima_vez_jogado}</p>
      <p><strong>Steam ID:</strong> {steamId}</p>
    </div>
  );
};

export default ResultPage; 
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface GameInfo {
  nome_jogo: string;
  tempo_de_jogo: number;
  ultima_vez_jogado: string;
  img_url_montada: string;
  appid: number;
}

const API_ROUTES = [
  { value: 'sorteiotodos', label: 'Jogo Aleatório' },
  { value: 'nuncajogados', label: 'Nunca Jogados' },
  { value: 'poucotempodejogo', label: 'Pouco Tempo de Jogo' },
  { value: 'maisjogados', label: 'Mais Jogados' },
  { value: 'esquecidos', label: 'Esquecidos' }
];

const ResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const steamId = (location.state as any)?.steamId || '';

  const [username, setUsername] = useState<string>('');
  const [game, setGame] = useState<GameInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<string>('sorteiotodos');

  const fetchGameData = async (route: string) => {
    if (!steamId) return;
    setLoading(true);
    setError(null);
    try {
      const [userRes, gameRes] = await Promise.all([
        fetch(`http://localhost:5000/username?steamid=${steamId}`).then(res => res.json()),
        fetch(`http://localhost:5000/${route}?steamid=${steamId}`).then(res => res.json())
      ]);
      
      if (userRes.error) setError(userRes.error);
      else setUsername(userRes.username);
      if (gameRes.error) setError(gameRes.error);
      else setGame(gameRes);
    } catch (err) {
      setError('Failed to fetch data from API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGameData(selectedRoute);
  }, [steamId, selectedRoute]);

  if (!steamId) return <div className="semi-box">No Steam ID provided.</div>;
  if (loading) return <div className="semi-box">Loading...</div>;
  if (error) return <div className="semi-box">Error: {error}</div>;

  return (
    <div className="semi-box">
      <button onClick={() => navigate(-1)} style={{ float: 'right' }}>Back</button>
      
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '1.5rem', 
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <select 
          value={selectedRoute} 
          onChange={(e) => setSelectedRoute(e.target.value)}
          style={{
            padding: '0.5rem',
            borderRadius: '8px',
            border: '1px solid #bbb',
            fontSize: '1rem',
            backgroundColor: 'white',
            color:'black'
          }}
        >
          {API_ROUTES.map(route => (
            <option key={route.value} value={route.value}>
              {route.label}
            </option>
          ))}
        </select>
        
        <button 
          onClick={() => fetchGameData(selectedRoute)}
          disabled={loading}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: loading ? '#ccc' : '#2d3e50',
            color: 'white',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '1rem'
          }}
        >
          {loading ? 'Carregando...' : 'Reroll'}
        </button>
      </div>

      <h2>Conta: {username}</h2>
      <h3>{game?.nome_jogo}</h3>
      <img src={game?.img_url_montada} alt="Game Cover" style={{ width: 200, height: 300, borderRadius: 8 }} />
      <p><strong>Tempo de jogo:</strong> {Math.round((game?.tempo_de_jogo || 0) / 60)} horas</p>
      <p><strong>Última vez jogado em:</strong> {
        game?.ultima_vez_jogado === 'never' || 
        game?.ultima_vez_jogado === 'Never' || 
        game?.ultima_vez_jogado === '0' || 
        game?.ultima_vez_jogado === '' ||
        game?.ultima_vez_jogado === '31/12/1969' ||
        game?.ultima_vez_jogado === null || 
        game?.ultima_vez_jogado === undefined
          ? 'Nunca'
          : game?.ultima_vez_jogado
      }</p>
      <p><strong>Steam ID:</strong> {steamId}</p>
    </div>
  );
};

export default ResultPage; 
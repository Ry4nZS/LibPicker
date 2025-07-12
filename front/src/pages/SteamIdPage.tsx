import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SteamIdPage: React.FC = () => {
  const [steamId, setSteamId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (steamId.trim()) {
      navigate('/result', { state: { steamId } });
    }
  };

  return (
    <div className="semi-box">
      <h1>LibPicker</h1>
      <div style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
        padding: '1rem', 
        borderRadius: '8px', 
        marginBottom: '1.5rem',
        border: '1px solid #ddd',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>
          <strong>Como usar:</strong>
        </p>
        <p style={{ margin: '0', fontSize: '0.8rem', lineHeight: '1.4' }}>
          Digite seu Steam ID para descobrir qual jogo da sua biblioteca você deve jogar hoje! 
          O sistema escolherá aleatoriamente um jogo baseado nos seus dados do Steam.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="steamId">Insira seu Steam ID:</label>
        <input
          id="steamId"
          type="text"
          value={steamId}
          onChange={e => setSteamId(e.target.value)}
          placeholder="Steam ID"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SteamIdPage; 
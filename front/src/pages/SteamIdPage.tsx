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
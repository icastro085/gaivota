import React, { useState, useEffect } from 'react';
import FarmFormTable from './FarmFormTable';
import { loadCsv, parseFramToObject } from '../../helpers';
import api from '../../facades/api';

export default function FarmForm() {
  const [farmsList, setFarmsList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const loadFarms = async () => {
    const { data: { items = [] } } = await api.get('/farm');
    setFarmsList(items);
  };

  const handleFiles = (e) => {
    const [file] = e.target.files;
    loadCsv(file, async (lines) => {
      const linesFiltered = lines
        .filter(([id]) => !!id && id !== 'farm_id')
        .map((data) => parseFramToObject(data));

      const promises = linesFiltered.map(async (data) => api.post('/farm', data));
      await Promise.all(promises);

      loadFarms();
    });
  };

  useEffect(() => {
    loadFarms();
  }, []);

  return (
    <form className="farm-form" onSubmit={handleSubmit}>
      <h3>Fazendas</h3>
      <hr />
      <div className="row">
        <div className="col-5">
          <label>Importa fazendas a partir do CSV:</label>
          <input type="file" onChange={handleFiles} accept=".csv" />
        </div>
      </div>

      <div className="row table-farms">
        <div className="col-12">
          <FarmFormTable farmsList={farmsList} />
        </div>
      </div>
    </form>
  );
}

import React, { useState } from 'react';
import FarmFormTable from './FarmFormTable';
import loadCsv from '../../helpers/loadCsv';

export default function FarmForm() {
  const [farmsList, setFarmsList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleFiles = (e) => {
    const [file] = e.target.files;
    loadCsv(file, (lines) => {
      setFarmsList(lines.filter(([id]) => !!id && id !== 'farm_id'));
    });
  };

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

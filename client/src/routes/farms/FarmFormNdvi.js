import React from 'react';
import { loadCsv } from '../../helpers';
import api from '../../facades/api';

export default function FarmFormNdvi() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleFiles = (e) => {
    const [file] = e.target.files;
    if (file) {
      // TODO: validar formato
      loadCsv(file, async (lines) => {
        const components = lines.shift().map((value) => {
          if (value === 'date') {
            return value;
          }

          return value.split('_')[1];
        });

        components.shift();

        const data = lines.map((line) => {
          const date = line.shift();
          return line.map((value, i) => ({
            farmId: components[i],
            date,
            value,
          }));
        }).flat();

        const ndviRemove = components.map((farmId) => ({ farmId }));
        await api.post('/farm-ndvi/batch-delete', ndviRemove);
        await api.post('/farm-ndvi/batch-insert', data);
        // TODO: mostra um feeback
      });
    }
  };

  return (
    <form className="farm-form" onSubmit={handleSubmit}>
      <h3>NDVI</h3>
      <hr />
      <div className="row">
        <div className="col-5">
          <label>Importa NDVI a partir do CSV:</label>
          <input type="file" onChange={handleFiles} accept=".csv" />
        </div>
      </div>
    </form>
  );
}

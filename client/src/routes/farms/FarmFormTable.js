import React from 'react';
import FarmFormTableRow from './FarmFormTableRow';

export default function FarmFormTable({
  farmsList = [],
}) {
  if (!farmsList.length) {
    return (
      <p>
        Nenhuma fazenda!
      </p>
    );
  }

  return (
    <>
      <label>Lista de fazendas:</label>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Cultura</th>
            <th>Variedade</th>
            <th>Área Total</th>
            <th>Estimativa de Rendimento</th>
            <th>Preço</th>
            <th>GeoJSON</th>
          </tr>
        </thead>
        <tbody>
          {
            farmsList.map((farm) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <FarmFormTableRow key={farm._id} {...farm} />
            ))
          }
        </tbody>
      </table>
    </>
  );
}

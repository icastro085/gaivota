import React from 'react';

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
          </tr>
        </thead>
        <tbody>
          {
            farmsList.map(({
              _id,
              farmId,
              name,
              latitude,
              longitude,
              culture,
              variety,
              totalArea,
              yieldEstimation,
              price,
            }) => (
              <tr key={_id} data-id={_id}>
                <td>{farmId}</td>
                <td>{name}</td>
                <td>{latitude}</td>
                <td>{longitude}</td>
                <td>{culture}</td>
                <td>{variety}</td>
                <td>{totalArea}&nbsp;ha</td>
                <td>{yieldEstimation}&nbsp;ton/ha</td>
                <td>{price}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
}

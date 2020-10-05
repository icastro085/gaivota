import React from 'react';

export default function FarmSelected({
  selectedFarm: {
    name,
    culture,
    variety,
    totalArea = 0,
    yieldEstimation = 0,
    price,
  } = {},
}) {
  return (
    <table className="farm-details">
      <tbody>
        <tr>
          <td>Nome</td><td>{name}</td>
        </tr>
        <tr>
          <td>Cutura</td><td>{culture}</td>
        </tr>
        <tr>
          <td>Variedade</td><td>{variety}</td>
        </tr>
        <tr>
          <td>Área</td><td>{totalArea}&nbsp;ha</td>
        </tr>
        <tr>
          <td>Estimativa de Rendimento</td><td>{yieldEstimation}&nbsp;ton/ha</td>
        </tr>
        <tr>
          <td>Total</td><td>{totalArea * yieldEstimation}</td>
        </tr>
        <tr>
          <td>Preço</td><td>{price}</td>
        </tr>
      </tbody>
    </table>
  );
}

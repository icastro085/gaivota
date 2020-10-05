import React from 'react';
import { readAsText } from '../../helpers';
import api from '../../facades/api';

export default function FarmFormTableRow({
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
}) {
  const onUploadGeoJSON = (file) => {
    readAsText(file, async (GeoJSON) => {
      const data = JSON.parse(GeoJSON);
      data.farmId = farmId;
      await api.post('farm-geo-json', data);
    });
  };

  return (
    <tr data-id={_id}>
      <td>{farmId}</td>
      <td>{name}</td>
      <td>{latitude}</td>
      <td>{longitude}</td>
      <td>{culture}</td>
      <td>{variety}</td>
      <td>{totalArea}&nbsp;ha</td>
      <td>{yieldEstimation}&nbsp;ton/ha</td>
      <td>{price}</td>
      <td>
        <input
          type="file"
          onChange={(e) => onUploadGeoJSON(e.target.files[0])}
          accept=".GeoJSON" />
      </td>
    </tr>
  );
}

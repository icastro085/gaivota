import React, { useEffect, useState } from 'react';
import Select from '../../components/Select';
import LeafletMap from '../../components/LeafletMap';
import api from '../../facades/api';

export default function Home() {
  const [selectedFarm, setSelectedFarm] = useState({});
  const [farmsList, setFarmsList] = useState([]);
  const itemsFarm = farmsList.map(({ farmId, name }) => ({
    id: farmId,
    value: name,
  }));

  const onChangeFarm = (farmId) => {
    console.log(farmId);
  };

  useEffect(() => {
    const loadFarms = async () => {
      const { data: { items = [] } } = await api.get('/farm');
      setFarmsList(items);
      setSelectedFarm(items[0]);
    };

    loadFarms();
  }, []);

  return (
    <div className="row map-container">
      <div className="col-8">
        <LeafletMap />
      </div>
      <div className="col-4 search-container">
        <form>
          <h4>Fazenda</h4>

          {
            farmsList.length
              ? (
                <Select
                  items={itemsFarm}
                  value={selectedFarm.farmId}
                  onChange={onChangeFarm}>
                  Selecione uma fazenda
                </Select>
              )
              : null
          }
        </form>
      </div>
    </div>
  );
}

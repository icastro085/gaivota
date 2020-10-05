import React, { useEffect, useState } from 'react';
import Select from '../../components/Select';
import LeafletMap from '../../components/LeafletMap';
import FarmSelected from './FarmSelected';
import api from '../../facades/api';

export default function Home() {
  const [selectedFarm, setSelectedFarm] = useState({});
  const [selectedFarmGeoJson, setSelectedFarmGeoJson] = useState(null);
  const [farmsList, setFarmsList] = useState([]);
  const itemsFarm = farmsList.map(({ farmId, name }) => ({
    id: farmId,
    value: name,
  }));

  const getSelectedFarm = (farmId) => (
    farmsList.find(({ farmId: id }) => id === farmId)
  );

  const getSelectedGeoJson = async (farmId) => {
    const { data: { data: farmGeoJson } } = await api.get(`/farm-geo-json/${farmId}`);
    return farmGeoJson;
  };

  const onChangeFarm = async (farmId) => {
    if (farmsList.length) {
      const selectedFarmUpdated = getSelectedFarm(farmId);
      const selectedFarmGeoJsonUpdated = await getSelectedGeoJson(farmId);

      setSelectedFarm(selectedFarmUpdated);
      setSelectedFarmGeoJson(selectedFarmGeoJsonUpdated);
    }
  };

  useEffect(() => {
    const loadFarms = async () => {
      const { data: { items = [] } = {} } = await api.get('/farm');
      if (items && items.length) {
        const selectedFarmUpdated = items[0];
        const selectedFarmGeoJsonUpdated = await getSelectedGeoJson(selectedFarmUpdated.farmId);

        setFarmsList(items);
        setSelectedFarm(selectedFarmUpdated);
        setSelectedFarmGeoJson(selectedFarmGeoJsonUpdated);
      }
    };

    loadFarms();
  }, []);

  return (
    <div className="row map-container">
      <div className="col-8">
        <LeafletMap farm={selectedFarm} farmGeoJson={selectedFarmGeoJson} />
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

          <FarmSelected selectedFarm={selectedFarm} />
        </form>
      </div>
    </div>
  );
}

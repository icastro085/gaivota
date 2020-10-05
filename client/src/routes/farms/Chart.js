import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import Select from '../../components/Select';
import api from '../../facades/api';
import chartSelector from '../../config/chart_selector.json';

const options = {
  responsive: true,
  title: {
    display: false,
  },
  legend: {
    display: false,
  },
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      gridLines: {
        drawOnChartArea: false,
      },
      ticks: {
        autoSkip: true,
        maxTicksLimit: 10,
        maxRotation: 0,
        padding: 30,
      },
    }],
  },
};

function reduceData(data) {
  const mapped = {};
  data.forEach(({ date, value }) => {
    const key = new Date(date).toLocaleDateString();
    mapped[key] = (mapped[key] || 0) + value;
  });

  return mapped;
}

export default function Chart() {
  // TODO: usar labels para o select com uma tradução
  const selectItems = chartSelector.options.map(({ id, name }) => ({ id, value: name }));
  const [selectedItem, setSeletectedItem] = useState(chartSelector.options[0]);
  const [farmsList, setFarmsList] = useState([]);
  const [chartData, setChartData] = useState({});
  const [selectedFarm, setSelectedFarm] = useState({});

  const onChangeItem = (selectedId) => {
    const item = chartSelector.options.find(({ id }) => id === selectedId);
    setSeletectedItem(item);

    console.log(item);
  };

  const getSelectedFarm = (farmId) => (
    farmsList.find(({ farmId: id }) => id === farmId)
  );

  const onChangeFarm = async (farmId) => {
    if (farmsList.length) {
      const selectedFarmUpdated = getSelectedFarm(farmId);
      setSelectedFarm(selectedFarmUpdated);
    }
  };

  useEffect(() => {
    const loadFarms = async () => {
      const { data: { items = [] } } = await api.get('/farm');
      setFarmsList(items);
      setSelectedFarm(items[0]);// leave it as default
    };

    loadFarms();
  }, []);

  useEffect(() => {
    const loadContent = async () => {
      const endpoint = selectedItem.id === 0 ? '/farm-ndvi' : 'farm-precipitation';
      const { data: { items = [] } } = await api.get(`${endpoint}/${selectedFarm.farmId}`);
      setChartData(reduceData(items));
    };

    if (selectedFarm.farmId) {
      loadContent();
    }
  }, [selectedItem.id, selectedFarm.farmId]);

  const chartLabels = Object.keys(chartData);
  const chartDataItems = Object.values(chartData).map((value) => parseFloat(value).toFixed(2));
  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: selectedItem.name,
        data: chartDataItems,
      },
    ],
  };

  const itemsFarm = farmsList.map(({ farmId, name }) => ({
    id: farmId,
    value: name,
  }));

  return (
    <>
      <form>
        <h3>Métricas</h3>
        <hr className="title-separator" />

        <div className="row">
          <div className="col-4">
            <Select
              items={selectItems}
              value={selectedItem.id}
              onChange={onChangeItem}>
              {chartSelector.label}
            </Select>
          </div>

          <div className="col-2">
            {
              farmsList.length
                ? (
                  <Select
                    items={itemsFarm}
                    value={selectedFarm.farmId}
                    onChange={onChangeFarm}>
                    Fazenda
                  </Select>
                )
                : null
            }
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="chart-container">
              {
                selectedItem.chart_type === 'bar'
                  ? (
                    <Bar
                      data={data}
                      width={100}
                      height={500}
                      options={options}
                    />
                  )
                  : (
                    <Line
                      data={data}
                      width={100}
                      height={500}
                      options={options}
                    />
                  )
              }
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

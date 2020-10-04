export { default as loadCsv } from './loadCsv';

export const parseFramToObject = ([
  farmId,
  name,
  latitude,
  longitude,
  culture,
  variety,
  totalArea,
  yieldEstimation,
  price,
]) => ({
  farmId,
  name,
  latitude: parseFloat(latitude),
  longitude: parseFloat(longitude),
  culture,
  variety,
  totalArea: parseFloat(totalArea),
  yieldEstimation: parseFloat(yieldEstimation),
  price: parseFloat(price),
});

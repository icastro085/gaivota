const mongoose = require('mongoose');
const { Schema } = mongoose;

const FarmGeoJSON = new Schema({
  farmId: String,
  type: String,
  crs: {
    type: { type: String },
    properties: { name: String }
  },
  features: [
    {
      type: { type: String },
      properties: {
        g_name: String,
        g_area_ha: [String, Number],
        field_id: String,
      },
      geometry: {
        type: { type: String },
        coordinates: [],
      },
    },
  ],
}, { versionKey: false });

module.exports = mongoose.model('FarmGeoJSON', FarmGeoJSON);

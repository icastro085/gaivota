const { Router } = require('express');
const FarmGeoJSON = require('../model/FarmGeoJSON');

const router = new Router({ mergeParams: true });
const options = { upsert: true, new: true, setDefaultsOnInsert: true };

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const farmGeoJson = await FarmGeoJSON.findOneAndUpdate(
      { farmId: data.farmId },
      data,
      options,
    );

    res.status(200).send({
      data: farmGeoJson,
    });
  } catch (e) {
    res.status(500).send('Internal error server');
  }
});

router.get('/:farmId', async (req, res) => {
  try {
    const { farmId } = req.params;
    const farmGeoJson = await FarmGeoJSON.findOne({ farmId });
    res.status(200).send({
      data: farmGeoJson,
    });
  } catch (e) {
    res.status(500).send('Internal error server');
  }
});

module.exports = router;

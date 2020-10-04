const { Router } = require('express');
const Farm = require('../model/Farm');

const router = new Router({ mergeParams: true });
const options = { upsert: true, new: true, setDefaultsOnInsert: true };

router.post('/', async (req, res) => {
  const data = req.body;

  const farm = await Farm.findOneAndUpdate(
    { farmId: data.farmId },
    data,
    options,
  );

  res.status(200).send({
    data: farm,
  });
});

router.get('/', async (req, res) => {
  const items = await Farm.find();
  res.status(200).send({
    items,
  });
});

module.exports = router;

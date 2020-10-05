const { Router } = require('express');
const FarmNdvi = require('../model/FarmNdvi');

const router = new Router({ mergeParams: true });

router.post('/batch-insert', async (req, res) => {
  try {
    const data = req.body;

    await FarmNdvi.insertMany(data);

    res.status(200).send({
      status: 'ok',
    });
  } catch (e) {
    res.status(500).send('Internal error server');
  }
});

router.post('/batch-delete', async (req, res) => {
  try {
    const data = req.body;
    const query = data
      .map(({ farmId }) => ({ farmId }))
      .filter(({ farmId }) => !!farmId);

    if (query.length) {
      await FarmNdvi.deleteMany({ $or: query });
    }

    res.status(200).send({
      status: 'ok',
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).send('Internal error server');
  }
});

router.get('/:farmId', async (req, res) => {
  try {
    const { farmId } = req.params;
    const items = await FarmNdvi.find({ farmId });
    res.status(200).send({
      items,
    });
  } catch (e) {
    res.status(500).send('Internal error server');
  }
});

router.get('/', async (req, res) => {
  try {
    const items = await FarmNdvi.find();
    res.status(200).send({
      items,
    });
  } catch (e) {
    res.status(500).send('Internal error server');
  }
});

module.exports = router;

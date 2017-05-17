
'use strict';

const express = require('express');
const knex = require('../knex');

const router = express.Router();

// YOUR CODE HERE

router.get('/', (req, res) => {
  knex('classifieds')
    .select('id', 'title', 'description', 'item_image', 'price')
    .then((data) => res.send(data));
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  knex('classifieds')
    .where('id', id)
    .select('id', 'title', 'description', 'item_image', 'price')
    .then((data) => res.send(data[0]));
});

router.post('/', (req, res) => {
  const ad = req.body;

  knex('classifieds')
    .insert(ad)
    .returning(['id','title', 'description', 'item_image', 'price'])
    .then((data) => res.send(data[0]));
});

router.patch('/:id', (req, res) => {
  const id = req.params.id;
  const ad = req.body;

  knex('classifieds')
    .where('id', id)
    .update(ad)
    .returning(['id', 'title', 'description', 'item_image', 'price'])
    .then((data) => res.send(data[0]));
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  knex('classifieds')
    .where('id', id)
    .del()
    .returning(['id', 'title', 'description', 'item_image', 'price'])
    .then((data) => res.send(data[0]));
});

module.exports = router;

const express = require('express');
const cors = require('cors');
const { isDev } = require('../util/misc');


const stack = [
  express.json()
];
if (isDev()) {
  stack.push(cors({
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true
  }));
}
module.exports = {
  stack,
  order: 1
};
const express = require('express')
const routes = express.Router();
const UserController = require('../controllers/UserController');

routes.get('/helloWorld', UserController.helloWorld);

module.exports = routes;

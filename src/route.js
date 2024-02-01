// Rotas
const express = require('express')
// Trabalha só com as questões
const questionController = require('./controllers/question-controller')
// Trabalha só com as salas
const roomController = require('./controllers/room-controller')
// route quarda todas as funcionaldiades de rotas que o express tem
const route = express.Router()

// Definindo rotas
route.get('/index', (request, response)=> response.render("index", {page: 'enter-room'}))
route.get('/create-room', (request, response) => response.render("index", {page: 'create-room'}))

route.post('/new-room', roomController.create)
route.get('/question-room/:room', roomController.open)
route.post('/enter-room', roomController.enter)

route.post('/question/create/:room', questionController.create)
route.post('/question/:room/:question/:action', questionController.index)

// Exportando par ausar no route.js
module.exports = route
// 'Iniciando  servidor'
const express = require('express')
const route = require('./route')
const path = require('path')

const server = express()

// Falando para o express (server) que a view engine vai ser o ejs
server.set('view engine', 'ejs')


// Falando para o express usar o conteudo estático e passamos o nome da pasta onde vai ficar guardado esse conteúdo, 'pasta public'.
server.use(express.static('public'))

// Passando o cominho da pastar views, a pasta views não está no padrão que seria fora da pasta src, resumindo (.../rocketq/src/views)
server.set('views',path.join(__dirname, 'views') )

//Pega o conteudo do formulário, decodifica e passa para o controller
server.use(express.urlencoded({extended: true}))

// express use o arquivo route
server.use(route)

//Rodando na web porta 4000, arrow function para rodar no terminar(node) tester se não da erro
server.listen(3000, ()=> console.log('Rodando'))


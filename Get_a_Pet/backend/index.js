const express = require('express')
const cors = require('cors')

const app = express()

// config da resposta Json
app.use(express.json())

// Resolvendo Cors
app.use(cors({ credentials: true, origin: 'http://localhost:3000'}))

// Arquivos de Imagens 
app.use(express.static('public'))

// Rotas
const UserRoutes = require('./routes/UserRoutes')
const PetRoutes = require('./routes/PetRoutes')

app.use('/users', UserRoutes)
app.use('/pets', PetRoutes)

app.listen(5000) 
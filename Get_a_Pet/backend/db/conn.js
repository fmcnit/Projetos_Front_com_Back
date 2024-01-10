const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1')
    console.log("Conectado")
}

main().catch((err) =>{
    console.log(err)
})

module.exports = mongoose
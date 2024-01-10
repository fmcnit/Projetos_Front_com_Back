const jwt = require('jsonwebtoken')

const createUserToken = async (user, req, res) => {

    // Criando o Token
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, "nossosecret")

    // retornando o Token
    res.status(200).json({
        message: "Voce esta autenticado",
        token: token,
        userId: user._id 
    })
}
module.exports = createUserToken
const Pet = require("../model/Pet")

//helpers
const getToken = require("../helpers/get-token")
const getUserByToken = require("../helpers/get-user-by-token")
const { getUserById } = require("./UserController")
const { isValidObjectId } = require("mongoose")

module.exports = class Petcontroller {

    static async create(req, res){
        
        const { name, age, weight, color } = req.body

        const available = true

        const image = req.files

        // Upload de imagens

        // Validações
        
        if(!name){
            res.status(422).json({ message: "O Nome é obrigatório" })
            return
        }
        if(!age){
            res.status(422).json({ message: "Qual a idade do seu Pet" })
            return
        }
        if(!weight){
            res.status(422).json({ message: "Qual o peso do seu Pet" })
            return
        }
        if(!color){
            res.status(422).json({ message: "Por favor, informe a cor do seu Pet" })
            return
        }
        if(images.lenght === 0){
            res.status(422).json({ message: "Por favor, coloque as imagens do seu Pet" })
            return
        }


        // resgatar usuario para o Pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images:[],
            user:{
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone,
            },
        })

        images.map((image) =>{
            pet.images.push(image.filename)
        })

        try {
            const newPet = await pet.save()
            res.status(201).json({
                message: "Pet cadastrado com sucesso",
                newPet,
            })

        } catch (error) {
            res.status(500).json({
                message: error
            })
            
        } 
    }

    static async getAll(req, res) {
        const pets = await Pet.find().sort("-createdAt")

        res.status(200).json({
            message: "Tudo ok",
            pets: pets,
        })
    }

    static async getAllUserPets(req, res) {
        const token = getToken(req)
        const user = await getUserByToken(token)
        const pets = await Pet.find({ 'user._id': user._id }).sort('-createdAt')

        res.status(200).json({
            pets,
        })
    }


    // Mostrando os pet de um Usuário
    static async getAllUserAdoptions(req, res) {
        const token = getToken(req)
        const user = await getUserByToken(token)
        const pets = await Pet.find({ 'adopter._id': user._id }).sort('-createdAt')

        res.status(200).json({  
            pets,
        })
    }

    // Pegando o Pet pelo Id
    static async getPetById(req, res){
        const id = req.params.id

        if (!isValidObjectId(id)) {
            res.status(422).json({
                message: "Id Inválido"
            })
            return
        }

        //Checando se o Pet existe
        const pet = await Pet.findOne({_id: id})

        if(!pet){
            res.status(404).json({
                message: "Pet não encontrado"
            })
        }
        res.status(200).json({
            pet: pet,
        })
        
    }

    // Removendo Pet
    static async removePetById(req, res){

        const id = req.params.id

        if (!isValidObjectId(id)) {
            res.status(422).json({
                message: "Id Inválido"
            })
            return
        }
        const pet = await Pet.findOne({_id: id})

        if(!pet){
            res.status(404).json({
                message: "Pet não encontrado"
            })
            return
        }

        // Validar se o Usuário que quer deletar esta registrado no Pet

        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.toString() !== user._id.toString()){
            res.status(422).json({
                message: "Problemas em processar seu pedido"
            })
            return
        }

        await Pet.findByIdAndDelete(id)
        res.status(200).json({
            message: "Pet removido com sucesso"
        })
        return
    }
    static async updatePet(req, res){

        const id = req.params.id
        
        const { name, age, weight, color, available } = req.body

        const images = req.files

        const updatedData = {}

        const pet = await Pet.findOne({ _id: id })

        if(!pet){
            res.status(404).json({
                message: "Pet não encontrado"
            })
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.toString() !== user._id.toString()){
            res.status(422).json({
                message: "Problemas em processar seu pedido"
            })
            return
        }
        // Validações
        
        if(!name){
            res.status(422).json({ message: "O Nome é obrigatório" })
            return

        } else {
            updatedData.name = name
        }

        if(!age){
            res.status(422).json({ message: "Qual a idade do seu Pet" })
            return

        } else {
            updatedData.age = age
        }

        if(!weight){
            res.status(422).json({ message: "Qual o peso do seu Pet" })
            return

        }else {
            updatedData.weight = weight
        }

        if(!color){
            res.status(422).json({ message: "Por favor, informe a cor do seu Pet" })
            return
        
        }else {
            updatedData.color = color
        }

        if(images.lenght === 0){
            res.status(422).json({ message: "Por favor, coloque as imagens do seu Pet" })
            return
        
        }else {
            updatedData.images = []
            images.map((image) => {
                updatedData.images.push(image.filename)
            })
        }

        await Pet.findOneAndUpdate(id, updatedData)
        res.status(200).json({
            message: "Pet Atualizado com sucesso"
        })

    }

    static async schedule(req, res){
        const id = req.params.id

        const pet = await Pet.findOne({ _id: id })

        if(!pet){
            res.status(404).json({
                message: "Pet não encontrado"
            })
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.equals(user._id)){
            res.status(422).json({
                message: "Não pode agendar visita do seu próprio Pet"
            })
            return
        }
        // check if user has already adopted this pet
        if (pet.adopter) {
            if (pet.adopter._id.equals(user._id)) {
                res.status(422).json({
                    message: 'Você já agendou uma visita para este Pet!',
                })
                return
            }
        }

        // add user to pet
        pet.adopter = {
            _id: user._id,
            name: user.name,
            image: user.image,
        }
    
        console.log(pet)
    
        await Pet.findByIdAndUpdate(pet._id, pet)
    
        res.status(200).json({
            message: `A visita foi agendada com sucesso, entre em contato com ${pet.user.name} no telefone: ${pet.user.phone}`,
        })
        
    }

     // conclude a pet adoption
  static async concludeAdoption(req, res) {
        const id = req.params.id

        // check if pet exists
        const pet = await Pet.findOne({ _id: id })

        pet.available = false

        await Pet.findByIdAndUpdate(pet._id, pet)

        res.status(200).json({
        pet: pet,
        message: `Parabéns! O ciclo de adoção foi finalizado com sucesso!`,
        })
    }
}
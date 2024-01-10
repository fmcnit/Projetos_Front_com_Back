const multer = require('multer')

const path = require('path')

const imagestore = multer.diskStorage({
    destination: function(req, file, cb){

        let folder = ""

        if (req.baseUrl.includes("users")) {

            folder = "users"
            
        } else if( req.baseUrl.includes("pets")){

            folder = "pets"
        }
        cb(null, `public/images/${folder}`)

    },
    filename: function(req, file, cb){
        cb(null, Date.now() + String(Math.floor(Math.random()*10000)) + path.extname(file.originalname))
    }
})

const imageUpload = multer({
    storage: imagestore,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return cb(new Error("Por favor, apenas arquivos JPG ou PNG"))
        }
        cb(undefined, true)
    }
    
})

module.exports = { imageUpload }
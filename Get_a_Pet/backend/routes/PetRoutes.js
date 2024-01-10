const router = require("express").Router();

const PetController = require("../controllers/PetController")

//middleware
const verifyToken = require("../helpers/verify-token")
const { imageUpload } = require("../helpers/image-upload");
const Petcontroller = require("../controllers/PetController");
const Pet = require("../model/Pet");

router.post(
  "/create",
  verifyToken,
  imageUpload.array("images"),
  PetController.create
)
router.get('/', Petcontroller.getAll)
router.get('/mypets', verifyToken, PetController.getAllUserPets)
router.get('/myadoptions', verifyToken, PetController.getAllUserAdoptions)
router.get('/:id', Petcontroller.getPetById)
router.delete('/:id', verifyToken, PetController.removePetById)
router.patch('/:id', verifyToken, imageUpload.array('images'), PetController.updatePet)
router.patch('/schedule/:id', verifyToken, PetController.schedule)
router.patch('/conclude/:id', verifyToken, PetController.concludeAdoption)

module.exports = router;

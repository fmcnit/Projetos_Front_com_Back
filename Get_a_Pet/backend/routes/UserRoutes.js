const router = require("express").Router();

const UserController = require("../controllers/UserController");

// Chamando Middleware
const verifyToken = require("../helpers/verify-token");
const { imageUpload } = require("../helpers/image-upload");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/checkuser", UserController.checkUser);
// Rota para pegar o Id do usuário
router.get("/:id", UserController.getUserById);

// Rotas protegidas por causa da autenticação
router.patch(
  "/edit/:id",
  verifyToken,
  imageUpload.single("image"),
  UserController.editUser
);

module.exports = router;

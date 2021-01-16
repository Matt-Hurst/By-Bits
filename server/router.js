const router = require("express").Router();
const { loginController, getPolicyController } = require("./controller");

router.get("/", getPolicyController);
router.post("/login", loginController);

module.exports = router;

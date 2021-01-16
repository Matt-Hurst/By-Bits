const router = require("express").Router();
const { loginController, getPolicyController } = require("./controller");

router.get("/", loggerMiddleWare, getPolicyController);
router.post("/login", loggerMiddleWare, loginController);

module.exports = router;

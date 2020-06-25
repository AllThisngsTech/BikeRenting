const express = require("express");
const router = express.Router();
const auth=require("../middleware/auth")

const UserController = require('../Controller/user');
//const checkAuth = require('../middleware/check-auth');

router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);
router.post("/rent_bike",auth,UserController.rent_bike);
router.post("/return_bike",auth,UserController.return_bike);
router.delete("/:userId",UserController.user_delete);

module.exports = router;


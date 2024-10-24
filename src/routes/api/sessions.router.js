import {Router} from 'express'
import {loginUser,current,registerUser,updateUser,delUser} from "./../../controllers/users.controller.js"
import { passportCall, handlePolicies } from '../../utils.js'

const router = Router();

router.post("/login", loginUser)
router.get("/current", passportCall('jwt'), handlePolicies(["user","admin"]), current)
router.post("/register", registerUser)
router.put("/:id", updateUser)
router.delete("/:id", delUser)

export default router;
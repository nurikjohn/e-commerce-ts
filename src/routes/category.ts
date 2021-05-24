import { Router } from "express"
import { AuthController } from "../controllers/auth"
import { CategoryController } from "../controllers/category"
import { UserRole } from "../models/User"
import { CategoryValidator } from "../validators/category"

const router = Router({ mergeParams: true })
const controller = new CategoryController()
const validator = new CategoryValidator()
const authConroller = new AuthController()

router.get("/", controller.getAll)
router.get("/:id", controller.get)

// Protected routes
router.use(authConroller.protect, authConroller.allowTo([UserRole[UserRole.admin]]))

router.post("/", validator.create, controller.create)
router.patch("/:id", validator.update, controller.update)
router.delete("/:id", controller.delete)

export default router

import { Router } from "express"
import { AuthController } from "../controllers/auth"
import { ProductController } from "../controllers/product"
import { UserRole } from "../models/User"
import { ProductValidator } from "../validators/product"

const router = Router({ mergeParams: true })
const controller = new ProductController()
const validator = new ProductValidator()
const authConroller = new AuthController()

router.get("/", validator.get, controller.getAll)
router.get("/:id", validator.get, controller.get)

// Protected routes
router.use(authConroller.protect, authConroller.allowTo([UserRole[UserRole.admin]]))

router.post("/", validator.create, controller.create)
router.patch("/:id", validator.update, controller.update)
router.delete("/:id", controller.delete)

export default router

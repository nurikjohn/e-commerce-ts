import { Router } from "express"
import { AuthController } from "../controllers/auth"
import { OrderController } from "../controllers/order"
import { OrderValidator } from "../validators/order"

const router = Router({ mergeParams: true })
const controller = new OrderController()
const validator = new OrderValidator()
const authConroller = new AuthController()

// Protected routes
router.use(authConroller.protect)

router.get("/:id", controller.get)
router.post("/", validator.create, controller.create)
router.patch("/:id", validator.update, controller.update)
router.delete("/:id", controller.delete)
router.get("/", controller.getAll)

export default router

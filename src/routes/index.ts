import { Router } from "express"
import authRouter from "./auth"
import categoryRouter from "./category"
import productRouter from "./product"
import orderRouter from "./order"

const router = Router({ mergeParams: true })

router.use("/api/auth", authRouter)
router.use("/api/categories", categoryRouter)
router.use("/api/products", productRouter)
router.use("/api/orders", orderRouter)

export default router

import express, { Request, Response } from "express"
import swagger from "swagger-ui-express"
import cors from "cors"
import routes from "./routes/index"
import { expressLogger } from "./config/logger"
import { ErrorController } from "./controllers/error"
import AppError from "./utils/appError"

const app = express()
const errorController = new ErrorController()

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(expressLogger())

app.use(routes)

app.get("/status", (req: Request, res: Response) => {
    res.json({
        stauts: "OK"
    })
})

app.all("*", (req, res, next) => {
    next(new AppError(404, `Can't find ${req.originalUrl} on this server!`))
})

app.use(errorController.handle)

export default app

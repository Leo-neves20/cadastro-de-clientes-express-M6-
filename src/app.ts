import express from "express"
import "express-async-errors"
import { handleError } from "./error/appError.error"
import contactsRoutes from "./routes/contacts.routes"
import loginRoutes from "./routes/login.routes"
import pdfRoutes from "./routes/pdf.routes"
import userRouter from "./routes/user.routes"
import cors from "cors"

export const app = express()
app.use(express.json())

app.use(cors)

app.use("/api/user", userRouter)
app.use("/api/login", loginRoutes)
app.use("/api/contact", contactsRoutes)
app.use("/api/pdf/generate", pdfRoutes)

app.use(handleError)
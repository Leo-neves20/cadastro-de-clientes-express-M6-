import express from "express"
import "express-async-errors"
import { handleError } from "./error/appError.error"
import contactsRoutes from "./routes/contacts.routes"

import userRouter from "./routes/user.routes"

export const app = express()
app.use(express.json())

app.use("/api/user", userRouter)
app.use("/api/contact", contactsRoutes)

app.use(handleError)
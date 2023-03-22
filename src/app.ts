import express from "express"
import "express-async-errors"
import { handleError } from "./error/appError.error"

export const app = express()
app.use(express.json())

app.use(handleError)
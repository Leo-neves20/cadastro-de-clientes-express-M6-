import { Router } from "express";
import pdfController from "../controller/pdf.controller";
import tokenValidationMiddleware from "../middleware/tokenValidation.middleware";

const pdfRoutes = Router()

pdfRoutes.get("", tokenValidationMiddleware, pdfController)

export default pdfRoutes
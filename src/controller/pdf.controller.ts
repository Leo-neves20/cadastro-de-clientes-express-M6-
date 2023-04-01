import { Request, Response } from "express";
import PdfPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import pdfService from "../service/pdf.service";

const pdfController = async (req: Request, res: Response) => {

    const arrData = await pdfService(req.user.id)

    const fonts = {
        Helvetica: {
            normal: 'Helvetica',
            bold: 'Helvetica-Bold',
            italics: 'Helvetica-Oblique',
            bolditalics: 'Helvetica-BoldOblique'
        }
    }

    const printer = new PdfPrinter(fonts)

    const docDefinition: TDocumentDefinitions = {
        defaultStyle: {font: "Helvetica"},
        content: [{text: "aaaaaaaaaaaaaaaaaaaaaa"}]
    }

    const pdfDoc = printer.createPdfKitDocument(docDefinition)

    const chunks = []

    pdfDoc.on("data", (chunk) => {
        chunks.push(chunk)
    })

    pdfDoc.end()

    pdfDoc.on("end", () => {
        const response = Buffer.concat(chunks) 
        res.end(response)
    })

}

export default pdfController
import express, { Request, Response, ErrorRequestHandler } from "express"

import apiRouters from "./routes/index"

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())

app.use(apiRouters)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Express with TypeScript!")
})

app.get("/", (req: Request, res: Response, err) => {
  res.send("Hello Express with TypeScript!")
})

interface IError extends Error {
  status?: number
  meta?: string
}

const errorHandler: ErrorRequestHandler = (err: IError, req, res, next) => {
  const statusCode = err.status || 500
  const errorMessage = err.meta || err.message

  res.status(statusCode).json({
    status: "error",
    message: errorMessage || "Something went wrong",
  })
}

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})

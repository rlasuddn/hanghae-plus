import express, { Request, Response } from "express"

import apiRouters from "./routes/index"

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())

app.use(apiRouters)

app.get("/", (req: Request, res: Response) => {
    res.send("Hello Express with TypeScript!")
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})

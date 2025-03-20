import express from "express"
import { initHandlers } from "./handlers/handler"

const app = () => {
    const app = express()
    const port = 3000
    app.use(express.json())
    initHandlers(app)

    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
    })
}

app();
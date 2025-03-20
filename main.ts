import express from "express"

const app = () => {
    const app = express()
    const port = 3000
    app.use(express.json())

    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
    })
}

app();
import { Application, Request, Response } from "express"

export const initHandlers = (app: Application) => {
    app.get("/ping", (req: Request, res: Response) => {
        res.send({"message": "hello world"})
    })
}
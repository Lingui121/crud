import express, { json } from "express"
import router from "./routers/router.js"
import cors from "cors"

const app = express()
const porta = 8000

app.use(json())
app.use(cors())
app.use(router)

app.get("/", (req, res) => {
    return res.send("Ola Mundo!")
})

app.listen(porta, (erro) => {
    if(erro){
        console.log(erro)
    }else{
        console.log("Servidor Rodando na Porta: " + porta)
    }
})
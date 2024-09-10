import express from "express"
import { createProduto, deleteProduto, getProduto, getProdutos, updateProduto } from "../services/produtos.service.js"


const router = express.Router()

router.get("/produtos", getProdutos)
router.get("/produto/:id", getProduto)
router.post("/produto", createProduto)
router.put("/produto/:id", updateProduto)
router.delete("/produto/:id", deleteProduto)




export default router
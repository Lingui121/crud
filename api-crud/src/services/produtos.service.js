import { consulta } from "../database/conexao.js"

export async function getProdutos(req, res){
    try{
        const sql = "SELECT * FROM tabelaprodutos"
        const produtos = await consulta(sql)
        if(produtos[0]){
            return res.status(200).json(produtos)
        }else{
            return res.json({Mensagem: "Nao Existem produtos"})
        }
        
    }catch(erro){
        console.log(erro)
    }
}

export async function getProduto(req, res){
    const { id } = req.params

    try{
        const sql = "SELECT * FROM tabelaprodutos WHERE idProduto = ?"
        const produto = await consulta(sql, [id])
        if(produto[0]){
            return res.status(200).json(produto[0])
        }else{
            return res.status(404).json({Mensagem: "Produto Nao Encontrado!"})
        }
    }catch(erro){
        return res.json(erro)
    }
}

export async function createProduto(req, res){
    const { nomeProduto } = req.body

    try{
        const sql = "INSERT INTO tabelaprodutos SET ?"
        const produto = await consulta(sql, [{ nomeProduto }] )
        return res.status(201).json(produto)
    }catch(erro){
        return res.status(500).json({Mensagem: erro.message})
    }
}

export async function updateProduto(req, res){
    const { id } = req.params
    const { nomeProduto } = req.body

    try{

        const sql1 = "SELECT * FROM tabelaprodutos WHERE idProduto = ?"
        const produto1  = (await consulta(sql1, [id]))[0]
        if(produto1){
            const sql = "UPDATE tabelaprodutos SET ? WHERE idProduto = ?"
            const produto = await consulta(sql, [{
            nomeProduto : nomeProduto ? nomeProduto : produto1.nomeProduto
        }, id])
            return res.status(200).json(produto)
        }
        
    }catch(erro){
        return res.status(500).json(erro.message)
    }

}

export async function deleteProduto(req, res){
    const { id } = req.params

    try{
        const sql1 = "SELECT * FROM tabelaprodutos WHERE idProduto = ?"
        const produto1 = await consulta(sql1, [id])
        if(produto1[0]){
            const sql = "DELETE FROM tabelaprodutos WHERE idProduto = ?"
            const produto = await consulta(sql, [id])
            return res.status(200).json(produto)
        }else{
            return res.json({Mensagem: "Produto Nao Encontrado!"})
        }
    }catch(erro){
        return res.json(erro.message)
    }
}
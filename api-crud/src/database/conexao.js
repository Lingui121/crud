import expres from "express"
import mysql from "mysql"

const conexao = mysql.createConnection({
    user:"root",
    database:"dbcrud",
    password:"",
    port:3306,
    host:"localhost"
})

conexao.connect((erro) => {
    if(erro){
        console.log(erro)
    }else{
        console.log("Conexao bem sucedida!")
    }
})

export function consulta(sql, dados=[]){
    return new Promise(function(resolve, reject){
        conexao.query(sql, dados, function(erro, result){
            if(erro){
                return reject(erro)
            }
            return resolve(result)
        })
    })    
}


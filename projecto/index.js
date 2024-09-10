const botao = document.querySelector("#cadastrar")

let produtos = []

window.addEventListener("load", () => {
    mostrarDados()
})

botao.addEventListener("click", async function cadastrar(e){

    const input = document.querySelector("#produto")
    
    try {
        const resposta = await axios.post("http://localhost:8000/produto", {
            nomeProduto:input.value
        })
        if(resposta.data){
            alert("Produto Cadastrado com Sucesso!")
            input.value=""
        }else{
            alert("houve um problema ao cadastrar!")
        }
        mostrarDados()
    } catch (erro) {
        console.error(erro)
    }

})

const apagar = document.querySelector("#botaoApagar")

async function remover(idProduto){
    try{
        const confirmacao = window.confirm("Tens a certeza que pretendes apagar este produto?")
        if(confirmacao){
            const resposta = await axios.delete("http://localhost:8000/produto" + "/" + idProduto )
        if(resposta.data){
            mostrarDados()
            alert("Apagado com Sucesso!")
        }else{
            alert("Houve algum erro!")
        }  
        }    
    }catch(erro){
        console.error(erro)
    }
}
async function mostrarDados(){
    const resposta = await axios.get("http://localhost:8000/produtos")
    produtos = resposta.data
    const dados = document.getElementById("dados")
    dados.innerHTML =            `
                <table class="tabela">
                    <thead>
                        <tr class="linha">
                        <th class = "cabecalho" >nome</th>
                        <th class = "cabecalho" >data</th>
                        <th id="cabecalho" >apagar</th>
                    </tr>
                    </thead>
                    <tbody>
                        ${produtos.map((produto) => `
                    <tr class="linha">
                        <td class = "coluna">${produto.nomeProduto}</td>
                        <td class = "coluna">${produto.dataCriacao}</td>
                        <td class = "coluna">
                            <button data-id = "${produto.idProduto}" class="botao" type="button" >X</button>
                        </td>
                    </tr>`).join("")}
                    </tbody>
            
                </table>
                `    
                document.querySelectorAll(".botao").forEach((botaoApagar) => {
                    botaoApagar.addEventListener("click", function(){
                        const id = this.getAttribute("data-id")
                        remover(id)
                    })
                }) 
}






const input = document.querySelector("#produto")


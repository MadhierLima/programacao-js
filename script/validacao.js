let resultado = document.getElementById("resultado");
const form = document.getElementById("form");

form.addEventListener("submit", function(event){
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const email = document.getElementById("email").value;

    if(idade <= 0) {
        resultado.innerHTML = `A idade deve ser maior que 0. <br>
        Por favor, limpe os campos e preencha novamente.`;
        resultado.classList.add("ativo");
        return;
    }

    const usuario = {nome, idade, email};

    resultado.innerHTML += `Nome: ${usuario.nome} <br> Idade: ${usuario.idade} <br> Email: ${usuario.email} <br>`;
    resultado.classList.add("ativo");
});

function limparCampos() {
    nome.value = "";
    idade.value = "";
    email.value = "";
}
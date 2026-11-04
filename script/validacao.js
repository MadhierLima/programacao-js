const form = document.getElementById("form");
const resultado = document.getElementById("resultado");

function mostrarErro(campo, mensagem) {
    const input = document.getElementById(campo);
    const erro = document.getElementById("erro-" + campo);

    erro.textContent = mensagem;

    if(mensagem) {
        input.classList.add("invalido");
    } else {
        input.classList.remove("invalido");
    }
}

function validarNome(nome) {
    if(nome === "") return "Informe seu nome.";
    if(nome.length < 3) return "O nome deve ter pelo menos 3 caracteres.";
    return "";
}

function validarIdade(idade) {
    const numero = Number(idade);

    if(idade === "") return "Informe sua idade.";
    if(!Number.isInteger(numero)) return "A idade deve ser um número inteiro.";
    if(numero <= 0) return "A idade deve ser maior que 0";
    if(numero > 120) return "A idade ser no máximo 120.";
    return "";
}

function validarEmail(email) {
    if(email === "") return "Informe seu email.";
    if(!email.includes("@") || !email.includes(".")) return "Informe um email válido.";
    return "";
}

function adicionarLinha(texto) {
    const linha = document.createElement("p");
    linha.textContent = texto;
    resultado.appendChild(linha);
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const idade = document.getElementById("idade").value.trim();
    const email = document.getElementById("email").value.trim();
    const erroNome = validarNome(nome);
    const erroIdade = validarIdade(idade);
    const erroEmail = validarEmail(email);

    mostrarErro("nome", erroNome);
    mostrarErro("idade", erroIdade);
    mostrarErro("email", erroEmail);

    if (erroNome || erroIdade || erroEmail) {
        resultado.classList.remove("ativo");
        return;
    }

    resultado.innerHTML = "";
    adicionarLinha("Nome: " + nome);
    adicionarLinha("Idade: " + idade);
    adicionarLinha("Email: " + email);
    resultado.classList.add("ativo");
});

form.addEventListener("reset", function() {
    mostrarErro("nome", "");
    mostrarErro("idade", "");
    mostrarErro("email", "");
    resultado.classList.remove("ativo");
})
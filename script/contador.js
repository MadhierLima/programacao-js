let contador = 0;
const salvo = localStorage.getItem("contador");
const numero = document.getElementById("numero");
const incrementar = document.getElementById("incrementar");
const decrementar = document.getElementById("decrementar");
const zerar = document.getElementById("zerar");

if(salvo !== null) {
    contador = Number(salvo);
}

function atualizarTela() {
    numero.textContent = contador;
    numero.classList.remove("positivo", "negativo");

    if(contador > 0) {
        numero.classList.add("positivo");
    } else if (contador < 0) {
        numero.classList.add("negativo");
    }

    localStorage.setItem("contador", contador);
}

function aumentar() {
    contador++;
    atualizarTela();
};

function diminuir() {
    contador--;
    atualizarTela();
};

function zerarContador(){
    contador = 0;
    atualizarTela();
};

incrementar.addEventListener("click", aumentar);
decrementar.addEventListener("click", diminuir);
zerar.addEventListener("click", zerarContador);

document.addEventListener("keydown", function (evento) {
    if (evento.key === "ArrowUp") {
        evento.preventDefault(); // evita a página rolar
        aumentar();
    } else if (evento.key === "ArrowDown") {
        evento.preventDefault();
        diminuir();
    }
});

atualizarTela();
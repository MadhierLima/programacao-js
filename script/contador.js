let contador = 0;

const numero = document.getElementById("numero");
const incrementar = document.getElementById("incrementar");
const decrementar = document.getElementById("decrementar");
const zerar = document.getElementById("zerar");

incrementar.addEventListener("click", function() {
    contador++;
    numero.textContent = contador;
});

decrementar.addEventListener("click", function() {
    contador--;
    numero.textContent = contador;
});

zerar.addEventListener("click", function(){
    contador = 0;
    numero.textContent = contador;
});

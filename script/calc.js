const visor = document.getElementById('visor');
const historico = document.getElementById('historico');
let atual = '0';
let anterior = null;
let operador = null;
let novoNumero = false;
const MAX_DIGITOS = 12;
const SIMBOLOS = { '+': '+', '-': '−', '*': '×', '/': '÷' };

function arredondar(numero) {
    return String(parseFloat(numero.toFixed(10)));
}

function atualizarTela() {
    visor.textContent = atual.replace('.', ',');
    historico.textContent = operador ? `${anterior.replace('.', ',')} ${SIMBOLOS[operador]}` : '';
}

function mostrarErro() {
    atual = 'Erro';
    anterior = null;
    operador = null;
    novoNumero = true;
    atualizarTela();
}

function adicionarNumero(numero) {
    if (novoNumero) {
        atual = '0';
        novoNumero = false;
    }
    // Conta apenas os algarismos (ignora "-" e ".")
    if (atual.replace(/[-.]/g, '').length >= MAX_DIGITOS) return;
    atual = atual === '0' ? numero : atual + numero;
    atualizarTela();
}

function adicionarDecimal() {
    if (novoNumero) {
        atual = '0';
        novoNumero = false;
    }
    if (atual.includes('.')) return;
    atual += '.';
    atualizarTela();
}

function escolherOperador(novoOperador) {
    if (atual === 'Erro') return;
    if (operador && !novoNumero) {
        calcular();
        if (atual === 'Erro') return;
    }
    anterior = atual;
    operador = novoOperador;
    novoNumero = true;
    atualizarTela();
}

function calcular() {
    if (!operador) return;

    const a = parseFloat(anterior);
    const b = parseFloat(atual);
    const contas = {
        '+': a + b,
        '-': a - b,
        '*': a * b,
        '/': a / b,
    };
    const resultado = contas[operador];

    if (!Number.isFinite(resultado)) return mostrarErro();

    atual = arredondar(resultado);
    anterior = null;
    operador = null;
    novoNumero = true;
    atualizarTela();
}

function porcentagem() {
    if (atual === 'Erro') return;
    atual = arredondar(parseFloat(atual) / 100);
    atualizarTela();
}

function apagar() {
    if (novoNumero) return;
    // Volta para '0' se sobrar só um caractere ou só "-X" (número negativo)
    const ficaVazio = atual.length === 1 || (atual.length === 2 && atual.startsWith('-'));
    atual = ficaVazio ? '0' : atual.slice(0, -1);
    atualizarTela();
}

function limpar() {
    atual = '0';
    anterior = null;
    operador = null;
    novoNumero = false;
    atualizarTela();
}

const acoes = { limpar, apagar, porcentagem, decimal: adicionarDecimal, igual: calcular };

document.querySelector('.buttons').addEventListener('click', (evento) => {
    const botao = evento.target.closest('button');
    if (!botao) return;

    const { numero, operador: op, acao } = botao.dataset;
    if (numero !== undefined) adicionarNumero(numero);
    else if (op) escolherOperador(op);
    else if (acao) acoes[acao]();
});

document.addEventListener('keydown', (evento) => {
    const tecla = evento.key;

    if (/^\d$/.test(tecla)) adicionarNumero(tecla);
    else if (['+', '-', '*', '/'].includes(tecla)) {
        evento.preventDefault(); // evita atalhos do navegador (ex.: "/" abre a busca no Firefox)
        escolherOperador(tecla);
    } else if (tecla === ',' || tecla === '.') adicionarDecimal();
    else if (tecla === '%') porcentagem();
    else if (tecla === 'Enter' || tecla === '=') {
        evento.preventDefault();
        calcular();
    } else if (tecla === 'Backspace') apagar();
    else if (tecla === 'Escape') limpar();
});

atualizarTela();
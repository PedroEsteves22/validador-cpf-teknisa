const botaoAbrir = document.querySelector('[data-modal="abrir"]');
const botaoFechar = document.querySelector('[data-modal="fechar"]');
const containerModal = document.querySelector('[data-modal="container"]');

function abrirModal(event){
  event.preventDefault();
  containerModal.classList.add('ativo');
}

function fecharModal(event){
  event.preventDefault();
  containerModal.classList.remove('ativo');
}

function cliqueForaModal(event){
  fecharModal();
}

botaoAbrir.addEventListener('click', abrirModal);

botaoFechar.addEventListener('click', fecharModal);


$(document).ready(function() {
  $('#cpf').inputmask('999.999.999-99');
});

function validaCpf(){
  const cpfFormatado = document.getElementById('cpf').value;
  const cpf = limpaFormatacao(cpfFormatado);

  if(cpf.length !== 11){
    mostraResultado('CPF deve conter 11 dígitos', 'red');
    return;
  }

  if(verificaDigitosRepetidos(cpf)){
    mostraResultado('CPF não pode conter repetição do mesmo digito', red);
    return;
  }

  const digito1 = calcularDigitoVerificador(cpf, 1);

  if(!digito1){
    mostraResultado(`CPF inválido - ${cpfFormatado}`, 'red');
  }

  const digito2 = calcularDigitoVerificador(cpf, 2);

  if(!digito2){
    mostraResultado(`CPF inválido - ${cpfFormatado}`, 'red');
  }

  mostraResultado(`CPF valido - ${cpfFormatado}`, 'green');
  
}

function calcularDigitoVerificador(cpf, posicao){
  const sequencia = cpf.slice(0, 8 + posicao).split('');

  let soma = 0;
  let multiplicador = 9 + posicao;

  for(const numero of sequencia){
    soma += multiplicador * Number(numero);
    multiplicador--;
  }

  const restoDivisao = (soma * 10) % 11;
  const digito = cpf.slice(8 + posicao, 9 + posicao);

  return restoDivisao == digito;
}

function limpaFormatacao(cpf){
  cpf = cpf.replace(/\D/g, '');
  return cpf;
}

function mostraResultado(texto, cor){
  const span = document.getElementById('resultado');

  span.innerHTML = texto;
  span.style.color = cor;
}

function verificaDigitosRepetidos(cpf){
  return cpf.split('').every((d) => d === cpf[0]);
}





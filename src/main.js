function roll(){
  let tipoDado = Number(document.getElementById('dadoType').value);
  let quantidade = document.getElementById('dadoNumber').value;
  let i = 0;
  let somaTotal = 0;
  let listaResultados = [];

  for (i; i<quantidade; i++){
    let resultadoDado = Math.floor(Math.random() * tipoDado) + 1;
    somaTotal += resultadoDado;

    listaResultados.push(resultadoDado);
  }

  document.getElementById("resultHtml").innerHTML = somaTotal;
  document.getElementById("resultDados").innerHTML = listaResultados.join(" + ");
}
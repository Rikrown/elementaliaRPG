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

const btnMostrar = document.getElementById('btn-mostrar');
const listaPGs = document.getElementById('lista-personagens');

btnMostrar.addEventListener('click', () => {
    // Aqui entra o fetch
    fetch('/mostrar-personagens')
        .then(response => response.json()) // Converte para JSON
        .then(personagens => {
          listaPGs.innerHTML = "";
          for (let i=0; i < personagens.length; i++){
            let p = personagens[i];
            listaPGs.innerHTML += `<p>${p.nome} - Elemento: ${p.elemento}</p>`
          }
        });
});
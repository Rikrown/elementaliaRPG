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

btnMostrar.addEventListener('click', atualizarLista);

function deletarPersonagem(id){
    const confirmacao = confirm("Tem certeza que deseja apagar este herói?");
    if (confirmacao) {
  fetch(`/excluir-personagem/${id}`, {method: "DELETE"})
    .then(response => {
      if (response.ok) {
       atualizarLista();
    } else{
      alert("Erro ao exlcuir personagem")
    }
});
}
}

function atualizarLista() {
    fetch('/mostrar-personagens')
        .then(response => response.json())
        .then(personagens => {
            listaPGs.innerHTML = "";
            for (let i = 0; i < personagens.length; i++) {
                let p = personagens[i];
                listaPGs.innerHTML += `
                    <p>${p.nome} - Elemento: ${p.elemento}</p>
                    <button onclick="deletarPersonagem(${p.id})">Excluir</button>
                `;
            }
        });
}
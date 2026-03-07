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
                    <button onclick="editarPersonagem(${p.id})">Editar</button>
                `;
            }
        });
}

function editarPersonagem(id){
    fetch(`/buscar-personagem/${id}`)
      .then(response => response.json())
      .then(personagem => {
          document.getElementById("idPersonagem").value = personagem.id;
          document.getElementById("n").value = personagem.nome;
          document.getElementById("e").value = personagem.elemento;
          document.getElementById("hpMax").value = personagem.vidamax;
          document.getElementById("hpAtual").value = personagem.vidaatual;
          document.getElementById("folegoMax").value = personagem.folegomax;
          document.getElementById("folegoAtual").value = personagem.folegoatual;
          document.getElementById("for").value = personagem.forca;
          document.getElementById("agi").value = personagem.agilidade;
          document.getElementById("con").value = personagem.constituicao;
          document.getElementById("int").value = personagem.inteligencia;
          document.getElementById("car").value = personagem.carisma;
          document.getElementById("men").value = personagem.mente;
   })
}
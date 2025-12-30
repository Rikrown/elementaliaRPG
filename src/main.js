import { DiceRoll } from '@dice-roller/rpg-dice-roller';

const res = await fetch('http://localhost:3000/skills/1');
const skill = await res.json();

const modifierTotal = skill.modifiers.reduce(
  (sum, m) => sum + m.value, 0
);
const rollHistory = [];

function addToHistory(rollResult, expression, modifier) {
  rollHistory.push({
    expression,
    total: rollResult.total,
    rolls: rollResult.rolls.map((r) => r.value),
    modifier,
    timestamp: new Date().toISOString(),
  });

  renderHistory();
}

function renderHistory() {
  const historyEl = document.getElementById('history');
  historyEl.innerHTML = '';

  rollHistory.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = `[${item.timestamp}] ${item.expression} → ${item.total}`;
    historyEl.appendChild(li);
  });
}

function calculateModifier(modifiers) {
  return modifiers.reduce((sum, mod) => sum + mod.value, 0);
}


function roll() {
  const diceSelect = document.getElementById('dadoType');
  const numberInput = document.getElementById('dadoNumber');
  const resultElement = document.getElementById('resultHtml');

  const selectedDice = diceSelect.value;   // ex: "d6"
  const selectedNum = numberInput.value;   // ex: "3"

  const rollExpression = `${selectedNum}${selectedDice}`; // "3d6"

  const result = new DiceRoll(rollExpression);

  resultElement.textContent = `Resultado final: ${result.total}`;
}

let maxBuffs = Math.floor(character.level / 2); //nivel de Elemento
buff.compatibleType === skill.type; //compatibilidade entre propriedades - habilidades
if (!buff.reusable && alreadyUsedThisTurn) throw Error; //reusabilidade (importante para Melhorar Habilidade)
const baseRoll = `${num}${dice}`; // "3d6"
const modifierTotal = calculateModifier(modifiers);

// associa o botão ao evento
document.getElementById('rollBtn').addEventListener('click', roll);

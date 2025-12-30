import * as rpgDiceRoller from '@dice-roller/rpg-dice-roller';
import { DiceRoll, DiceRoller } from '@dice-roller/rpg-dice-roller';

const roller = new DiceRoller();

let defaultDice = '';
let x = '';

document.getElementById('dadoType').valueOf(`dadoType`).innerHTML = defaultDice;
document.getElementById('dadoNumber').innerHTML = x;

function roll(){
  defaultDice = x + defaultDice;
  let rollResult;
  rollResult = new DiceRoll(defaultDice);
  return rollResult;
}
let resultFinal;
resultFinal = roll();
let resultElement = document.getElementById('resultHtml');
resultElement.innerHTML = roll();
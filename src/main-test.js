import * as rpgDiceRoller from '@dice-roller/rpg-dice-roller';
import { DiceRoll, DiceRoller } from '@dice-roller/rpg-dice-roller';
import * as readline from 'node:readline';
import('readline-sync')

const roller = new DiceRoller();

let defaultDice;
defaultDice = '';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


rl.question('Which type of dice do you want?', (x = 0) => {
  defaultDice = defaultDice + x;
  rl.question(`How many ${defaultDice}? `, (x = 0) => {
    defaultDice = x + defaultDice;
    let rollResult;
    rollResult = new DiceRoll(defaultDice);
    console.log(`Result is ${rollResult}`);
    rl.close(); // Important to close the interface when done
  });
});
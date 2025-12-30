//engine levemente modificada para o sistema

import { DiceRoll } from '@dice-roller/rpg-dice-roller';
import { validateBuffs } from '../validators/buffValidator.js';

const diceScale = [3, 4, 6, 8, 10, 12, 20]; //escala de dados

// 1. base
let config = getBaseConfig(skill);

// 2. prioridade 0
applyPriorityZero(config, effects);

// 3. NORMALIZAÇÃO
config = normalizeDice(config);

// 4. prioridade 1
applyCostMultipliers(config, effects);

// 5. rolagem
const roll = rollDice(config);

// 6. prioridade 2
const finalDamage = applyDamageMultipliers(roll.total, effects);

function skillBonus(level) { //bônus de perícias
  if (level <= 0) return 0;
  if (level <= 4) return level * 5;
  return 20 + (level - 4);
}

if (skill.category === 'CLASS') { //desabilita buffs para habilidades de classe
  disableBuffs();
}

const bonus = skillBonus(characterSkill.level);
roll.total += bonus;

export function normalizeDice({ diceCount, diceType }) {
  if (diceCount > 0) return { diceCount, diceType };

  let index = diceScale.indexOf(diceType);

  while (diceCount <= 0 && index > 0) {
    index--;
    diceType = diceScale[index];
    diceCount += 1;
  }

  return {
    diceCount: Math.max(1, diceCount),
    diceType: Math.max(3, diceType),
  };
}

export function applyEffects(config, effects) {
  const sorted = [...effects].sort((a, b) => a.priority - b.priority);

  let damageMultiplier = 1;
  let costMultiplier = 1;

  sorted.forEach((effect) => {
    switch (effect.stat) {
      case 'diceCount':
        config.diceCount += effect.value;
        break;

      case 'diceType':
        config.diceType += effect.value;
        break;

      case 'staminaCost':
        config.staminaCost += effect.value;
        break;

      case 'staminaMultiplier':
        costMultiplier *= effect.value;
        break;

      case 'damageMultiplier':
        damageMultiplier *= effect.value;
        break;
    }
  });

  config.staminaCost = Math.ceil(config.staminaCost * costMultiplier);

  return { config, damageMultiplier };
}


export function rollSkill({ character, skill, activeBuffs }) {
  validateBuffs({ character, skill, activeBuffs });

  //tipos de dados, custos, etc

  const baseConfig = {
    diceCount: Number(skill.baseDice.split('d')[0]),
    diceType: Number(skill.baseDice.split('d')[1]),
    staminaCost: skill.staminaCost,
    balanceCost: skill.balanceCost,
  };

  const finalConfig = { ...baseConfig };

  //número de buffs ativos

  activeBuffs.forEach((ab) => {
    ab.buff.effects.forEach((effect) => {
      finalConfig[effect.stat] += effect.value;
    });
  });

  //A rolagem em si

  const expression = `${finalConfig.diceCount}d${finalConfig.diceType}`;
  const roll = new DiceRoll(expression);

  return {
    expression,
    total: roll.total,
    rolls: roll.rolls.map((r) => r.value),
    costs: {
      stamina: finalConfig.staminaCost,
      balance: finalConfig.balanceCost,
    },
  };
}

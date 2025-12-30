//parte visual

import router from './roll.js';
import { validateBuffs } from '../validators/buffValidator.js';

export function previewSkill({ character, skill, activeBuffs }) {
  validateBuffs({ character, skill, activeBuffs });

  //pega os dados

  const baseConfig = {
    diceCount: Number(skill.baseDice.split('d')[0]),
    diceType: Number(skill.baseDice.split('d')[1]),
    staminaCost: skill.staminaCost,
    balanceCost: skill.balanceCost,
  };

  const finalConfig = { ...baseConfig };

  //pega os buffs

  activeBuffs.forEach((ab) => {
    ab.buff.effects.forEach((effect) => {
      finalConfig[effect.stat] += effect.value;
    });
  });

  //pega os custos

  return {
    expression: `${finalConfig.diceCount}d${finalConfig.diceType}`,
    costs: {
      stamina: finalConfig.staminaCost,
      balance: finalConfig.balanceCost,
    },
  };
}

//montando o resultado

router.post('/preview', async (req, res) => {
  const { characterId, skillId, turn } = req.body;

  const character = await prisma.character.findUnique({
    where: { id: characterId },
  });
  const skill = await prisma.skill.findUnique({ where: { id: skillId } });
  const activeBuffs = await prisma.activeBuff.findMany({
    where: { characterId, skillId, turn },
    include: { buff: { include: { effects: true, compatible: true } } },
  });

  const preview = previewSkill({ character, skill, activeBuffs });
  res.json(preview);
});

const preview = await fetch('/roll/preview', { ... }).then(r => r.json());

//mostrando resultado

console.log(preview.expression);
console.log(preview.costs.stamina);

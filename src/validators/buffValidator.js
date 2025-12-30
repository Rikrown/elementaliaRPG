//validar se buffs podem ou não ser utilizados

export async function validateBuffs({ character, skill, activeBuffs, turn }) {
  //máximo de buffs
  const maxBuffs = Math.floor(character.playerLevel / 2);

  if (activeBuffs.length > maxBuffs) {
    throw new Error('Limite de buffs excedido');
  }

  //checa quais buffs foram utilizados nesse turno
  const usedThisTurn = new Set();

  activeBuffs.forEach((ab) => {
    const buff = ab.buff;

    //diz que o buff não é compatível com a habilidade
    if (buff.compatibleType !== skill.type) {
      throw new Error(`Buff incompatível: ${buff.name}`);
    }

    //diz se o buff é reutilizável
    if (!buff.reusable) {
      if (usedThisTurn.has(buff.id)) {
        throw new Error(`Buff já usado neste turno: ${buff.name}`);
      }
      usedThisTurn.add(buff.id);
    }
  });

//definir turno
  const currentTurn = await prisma.turn.findFirst({
    where: { active: true },
  });

//avançar turnos
  await prisma.turn.updateMany({
    where: { active: true },
    data: { active: false },
  });

  await prisma.turn.create({
    data: { number: previousTurn + 1 },
  });

//auto-desativar buffs temporários
  await prisma.activeBuff.deleteMany({
    where: {
      turn: { lt: currentTurn.number },
    },
  });

}

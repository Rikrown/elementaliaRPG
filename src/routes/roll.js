import express from 'express';
import { PrismaClient } from '@prisma/client';
import { rollSkill } from '../services/rollEngine.js';

const router = express.Router();
const prisma = new PrismaClient();

//rola os dados baseado na ficha do usuário

router.post('/', async (req, res) => {
  const { characterId, skillId, turn } = req.body;

  const character = await prisma.character.findUnique({
    where: { id: characterId },
  });

  const skill = await prisma.skill.findUnique({
    where: { id: skillId },
  });

  const activeBuffs = await prisma.activeBuff.findMany({
    where: { characterId, skillId, turn },
    include: { buff: { include: { effects: true } } },
  });

  const result = rollSkill({
    character,
    skill,
    activeBuffs,
  });

  res.json(result);
});

export default router;

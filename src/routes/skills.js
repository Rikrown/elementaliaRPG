import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

//As habilidades (eu acho?)

router.post('/', async (req, res) => {
  const { name, description, baseDice, modifiers } = req.body;

//criar habilidades (aprender como fazer)

  const skill = await prisma.skill.create({
    data: {
      name,
      description,
      baseDice,
      modifiers: {
        create: modifiers,
      },
    },
    include: {
      modifiers: true,
    },
  });

  res.json(skill);
});

//buscar habilidades

router.get('/:id', async (req, res) => {
  const skill = await prisma.skill.findUnique({
    where: { id: Number(req.params.id) },
    include: { modifiers: true },
  });

  res.json(skill);
});

//listar todas as habilidades

router.get('/', async (req, res) => {
  const skills = await prisma.skill.findMany({
    include: { modifiers: true },
  });

  res.json(skills);
});


//regras especiais durante o combate

//lógica de bloqueio de dano (Bloquear)
if (blockSuccess) {
  damage = Math.max(1, damage - blockBonus);
}

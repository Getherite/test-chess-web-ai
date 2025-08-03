const board = Chessboard('board', {
  draggable: true,
  position: 'start',
  onDrop: onDrop
});

const game = new Chess();

function onDrop(source, target) {
  const move = game.move({
    from: source,
    to: target,
    promotion: 'q'
  });

  if (move === null) return 'snapback';

  updateStatus();
}

function updateStatus() {
  let status = '';

  if (game.in_checkmate()) {
    status = 'Échec et mat ! Partie terminée.';
  } else if (game.in_draw()) {
    status = 'Match nul.';
  } else {
    status = 'Au tour de ' + (game.turn() === 'w' ? 'blancs' : 'noirs');
    if (game.in_check()) {
      status += ' (échec)';
    }
  }

  document.getElementById('status').innerText = status;
}

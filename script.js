document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  const statusDisplay = document.getElementById('status');
  const resetButton = document.getElementById('reset');

  const ROWS = 6;
  const COLS = 7;
  let currentPlayer = 'red';
  let gameActive = true;
  let gameState = Array(ROWS).fill().map(() => Array(COLS).fill(''));

  // Create game board
  for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          cell.dataset.row = row;
          cell.dataset.col = col;
          board.appendChild(cell);
      }
  }

  // Handle cell click
  function handleCellClick(event) {
      if (!gameActive) return;

      const col = event.target.dataset.col;
      for (let row = ROWS - 1; row >= 0; row--) {
          if (gameState[row][col] === '') {
              gameState[row][col] = currentPlayer;
              event.target.classList.add(currentPlayer);
              if (checkWin(row, col)) {
                  gameActive = false;
                  statusDisplay.textContent = `${currentPlayer.toUpperCase()} Wins!`;
              } else if (gameState.flat().every(cell => cell !== '')) {
                  gameActive = false;
                  statusDisplay.textContent = 'Draw!';
              } else {
                  currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
                  statusDisplay.textContent = `${currentPlayer.toUpperCase()}'s Turn`;
              }
              break;
          }
      }
  }

  // Check for win
  function checkWin(row, col) {
      const directions = [
          { r: 0, c: 1 }, { r: 1, c: 0 }, { r: 1, c: 1 }, { r: 1, c: -1 }
      ];
      for (const { r, c } of directions) {
          let count = 1;
          for (let i = 1; i < 4; i++) {
              if (gameState[row + r * i]?.[col + c * i] === currentPlayer) count++;
              else break;
          }
          for (let i = 1; i < 4; i++) {
              if (gameState[row - r * i]?.[col - c * i] === currentPlayer) count++;
              else break;
          }
          if (count >= 4) return true;
      }
      return false;
  }

  // Reset game
  resetButton.addEventListener('click', () => {
      gameState = Array(ROWS).fill().map(() => Array(COLS).fill(''));
      document.querySelectorAll('.cell').forEach(cell => {
          cell.className = 'cell';
      });
      currentPlayer = 'red';
      gameActive = true;
      statusDisplay.textContent = `${currentPlayer.toUpperCase()}'s Turn`;
  });

  // Add event listeners to cells
  document.querySelectorAll('.cell').forEach(cell => {
      cell.addEventListener('click', handleCellClick);
  });

  statusDisplay.textContent = `${currentPlayer.toUpperCase()}'s Turn`;
});

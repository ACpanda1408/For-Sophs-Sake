document.addEventListener('DOMContentLoaded', () => {

  if (!localStorage.getItem('highScore')) {
    localStorage.setItem('highScore', 0);
  }

  document.getElementById('highscore').innerHTML = localStorage.getItem('highScore');
  
  const menu = document.getElementById('menu');
  const game = document.getElementById('game');
  game.style.display = 'none';

  function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  function getRandomElementFromTwo(arrayOfArrays) {
    const randomIndex = Math.floor(Math.random() * arrayOfArrays.length);
    const selectedArray = arrayOfArrays[randomIndex].list;
    const selectedArrayName = arrayOfArrays[randomIndex].name;
    
    return { array: selectedArray, arrayName: selectedArrayName };
  }

  oberons = ['static/game/o1.jpg', 'static/game/o2.jpg', 'static/game/o3.jpg', 'static/game/o4.jpg', 'static/game/o5.jpg', 'static/game/o6.jpg', 'static/game/o7.jpg', 'static/game/o8.jpg', 'static/game/o9.png', 'static/game/o10.jpg'];

  senjis = ['static/game/s1.jpg', 'static/game/s2.png', 'static/game/s3.jpg', 'static/game/s4.jpg', 'static/game/s5.jpg', 'static/game/s6.jpg', 'static/game/s7.jpg', 'static/game/s8.jpg', 'static/game/s9.jpg', 'static/game/s10.jpg'];

  emiyas = ['static/game/e1.png', 'static/game/e2.jpeg', 'static/game/e3.png', 'static/game/e4.jpg', 'static/game/e5.jpg', 'static/game/e6.jpg', 'static/game/e7.jpg', 'static/game/e8.jpg','static/game/e9.jpg', 'static/game/e10.webp'];
  
  play.addEventListener('click', startGame);
 
  function loseGame(score, message) {
    let highScore = localStorage.getItem('highScore');
    if (score > highScore) {
      localStorage.setItem('highScore', score);
      document.getElementById('highscore').innerHTML = score;
    }
    document.getElementById('gamescore').innerHTML = score;

    document.getElementById('lose-container').style.display = 'block';
    document.getElementById('lose-message').innerHTML = message;
    
    clearTimeout(timeoutId);
    
    setTimeout(() => {
      menu.style.display = 'block';
      game.style.display = 'none';
      document.getElementById('lose-container').style.display = 'none';

    }, 2000)
  }
  
  let timeoutId;
  
  function gameLoop(score) {
  
    const answer = getRandomElementFromTwo([
      { list: oberons, name:'Oberon'},
      {list: senjis, name:'Senji'},
      {list: emiyas, name:'Emiya'}
    ]);
    const link = getRandomElement(answer.array);
  
    document.getElementById('game-image').src = link;
  
    clearTimeout(timeoutId);
  
    timeoutId = setTimeout(() => {
      loseGame(score, 'Too Slow!');
    }, 3000);
  
    function handleKeyPress(event) {
      if (event.keyCode === 71 || event.keyCode === 72 || event.keyCode === 74){
        clearTimeout(timeoutId);
        if (event.keyCode === 71) {
          checkAnswer('Oberon', answer.arrayName, score);
        } else if (event.keyCode === 72) {
          checkAnswer('Senji', answer.arrayName, score);
        } else if (event.keyCode === 74) {
          checkAnswer('Emiya', answer.arrayName, score);
        } 
        document.removeEventListener('keydown', handleKeyPress);
      } else {
        document.removeEventListener('keydown', handleKeyPress);
      }
    }
  
    document.addEventListener('keydown', handleKeyPress);
  }
  
  function checkAnswer(selected, correct, score) {
    if (selected === correct) {
      score += 1;
      document.getElementById('score').innerHTML = score;
      gameLoop(score);
    } else {
      loseGame(score, 'You Lose!');
    }
  }

  function startGame() {
    document.getElementById('score').innerHTML = 0;
    document.getElementById('lose-container').style.display = 'none';
    menu.style.display = 'none';
    game.style.display = 'block';
    gameLoop(0);
  }
  
});
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

  oberons = ['https://shorturl.at/gjACP', 'https://shorturl.at/dgrsZ', 'https://shorturl.at/kmnrN', 'https://shorturl.at/uJMS6', 'https://t.ly/YNsQJ', 'https://rb.gy/5wr1i', 'https://rb.gy/51z0d', 'https://rb.gy/011az', 'https://rb.gy/d2mdh', 'https://rb.gy/fyw8a'];

  senjis = ['https://t.ly/ND6dM', 'https://t.ly/wuA7w', 'https://t.ly/EoAe7', 'https://t.ly/9fJkU', 'https://shorturl.at/jATY5', 'https://shorturl.at/kBXZ5', 'https://shorturl.at/ovJ09', 'https://shorturl.at/lyEW4', 'https://rb.gy/m86oc', 'https://rb.gy/3itdn'];

  emiyas = ['https://rb.gy/z48b9', 'https://rb.gy/ixahn', 'https://rb.gy/y9h2b', 'https://tinyurl.com/2tr3pbbf', 'https://tinyurl.com/v89kmzkn', 'https://tinyurl.com/2p99zyms', 'https://tinyurl.com/4nbryyrh', 'https://tinyurl.com/34txcxdp', 'https://tinyurl.com/yuzekcr8', 'https://tinyurl.com/bdecd62r'];
  
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
var drawElements = function() {

  var snakeParts = function(x, y) {
    ctx.fillStyle = 'black';
    ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
  }

  var apple = function(x, y) {
    ctx.fillStyle = 'red';
    ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
  }

  var score = function() {
    var scoreText = 'Score: ' + score;
    ctx.fillStyle = 'black';
    ctx.fillText(scoreText, 145, h - 5);

  }

  var drawSnake = function() {
    var lenght = 4;
    snake = [];
    for (var i = length; i >= 0; i--) {
      snake.push({x: i, y: 0});
    }
  }

  var createFood = function() {
    food = {
      x: Math.floor((Math.random() * 30) + 1),
      y: Math.floor((Math.random() * 30) + 1)
    }

    for (var i = 0; i > snake.length; i++) {
      var snakeX = snake[i].x;
      var snakeY = snake[i].y;

      if (food.x === snakeX || food.y === snakeY || food.y === snakeY && food.x === snakeX) {
        food.x = Math.floor((Math.random() * 30) + 1);
        food.y = Math.floor((Math.random() * 30) + 1);
      }
    }
  }

  var checkCollision = function(x, y, array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].x === x && array[i].y === y) {
        return true;
      }
      return false;
    }
  }

  var paint = function() {
    // btn.setArttribute('disabled', true);
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    if (direction == 'right') {
      snakeX++;
    } else if (direction == 'left') {
      snakeX--;
    } else if (direction == 'up') {
      snakeY--;
    } else if (direction == 'down') {
      snakeY++;
    }

    if (snakeX == -1 || snakeX == w / snakeSize || snakeY == -1 || snakeY == h / snakeSize || checkCollision(snakeX, snakeY, snake)) {
      btn.removeAttribute('disabled', true);

      ctx.clearRect(0, 0, w, h);
      gameloop = clearInterval(gameloop);
      return;
    }

    if (snakeX == food.x && snakeY == food.y) {
      var tail = {
        x: snakeX,
        y: snakeY
      };
      score++;
      createFood();
    } else {
      var tail = snake.pop();
      tail.x = snakeX;
      tail.y = snakeY;

    }
    snake.unshift(tail);

    for (var i = 0; i < snake.length; i++) {
      snakeParts(snake[i].x, snake[i].y);
    }

    apple(food.x, food.y);
    scoreText();

  }

  var init = function(){
      direction = 'down';
      drawSnake();
      createFood();
      gameloop = setInterval(paint, 80);
  }


    return {
      init : init
    };


}();

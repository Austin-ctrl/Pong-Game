//name of file: script.js
window.onload = function(){ 
    document.getElementById("start").addEventListener("click", start);//event listener for the start button
    document.getElementById("stop").addEventListener("click", stop);//event listener for the stop button

    /*variables for objects*/
    var ball = document.getElementById("ball");// allows constant updates for the ball to be made
    var paddleLeft = document.getElementById("paddleLeft");// allows constant updates for the left paddle to be made
    var paddleRight = document.getElementById("paddleRight");// allows constant updates for the Right paddle to be made
    var box = document.getElementById("gameArea");
    box.style.width = boxw +"px";
    box.style.height = boxh + "px";
    /*variables for objects*/
    
    /*Variable for the Display information */
    var leftScoreDisplay = document.getElementById("leftScore");// allows the score for the player on the left to be constantly updated
    var rightScoreDisplay = document.getElementById("rightScore");// allows the score for the player on the right to be constantly updated
    var hitsDisplay = document.getElementById("hits");// allows the total hits for a pair of players to be recored
    var highScoreDisplay = document.getElementById("highScore");// allows the highscore display to be updated when there is a new highscore
    var elem = document.getElementById("names");//allows data to be obtained from the forms called named (used to get the names of both players inputed by the user)
    var topPlayers = document.getElementById("namesDisplay");// allows the top player display to be updated
    /*Variable for the Display information */
    

    var scores = []; // array that holds all the scores
    var players = [];// array that holds all the pairs of players
    var leftScore = 0;// variable that holds the left player score
    var rightScore = 0;//variabel that holds the right player
    var hits =0; // variable that holds the number of hits between a 2 players for a round

    // Initial ball position and velocity
    var ballX = 1000;
    var ballY = 350;
    var ballSpeedX = 5;
    var ballSpeedY = 5;

    //box dimmensions
    var boxw = 2000;
    var boxh = 700;

    // Paddle positions
    var paddleLeftY = 160;
    var paddleRightY = 160;

    //intervals
    var myInterval;// declares interval
    var intervalClear = true; //prevents multiple intervals from stacking


    function start(){//start function
      if(intervalClear){//checks if the intervalClear variable is clear
        myInterval = setInterval(update, 15);//if it is clear, it calls the update function
        intervalClear = false;// this prevents the start button from being clicked multiple times, causing multiple intervals to stack on top of each other
      }
    }

    function stop(){//stop function
      clearInterval(myInterval);// clears interval
      intervalClear = true;//allows the start button to be clicked again.
    }
    
    

  // Controls
  document.addEventListener("keydown", function(e) { //looks for the input of a key from a keyboard. 
      if (e.key === "w") {
        paddleLeftY -= 10;// moves the left paddle down 10 px
      } else if (e.key === "s") {
        paddleLeftY += 10;// moves the left paddle up 10 px
      } else if (e.key === "ArrowUp") {
        paddleRightY -= 10;// moves the right paddle down 10 px
      } else if (e.key === "ArrowDown") {
        paddleRightY += 10;// moves the right paddle up 10 px
      }
    });

  // Update the game state
  function update() {

    // keeps the ball in motion
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Check for collision with top or bottom walls
    if (ballY <= 0 || ballY >= boxh) {
      ballSpeedY = -ballSpeedY;// inverts the direction of the ball to make it travel in the other direction after contact with a wall on the y axis
    }
    // Check for collision with left paddle
    if (ballX <= 15 && ballY >= paddleLeftY && ballY <= paddleLeftY + 80) {
      ballSpeedX = -ballSpeedX; //causes the ball to invert direction on the x axis when colliding with the left paddle
      hits++; //incraments a point to the hits variable
    }
    // Check for collision with right paddle
    if (ballX >= boxw-15 && ballY >= paddleRightY && ballY <= paddleRightY + 80) {
      ballSpeedX = -ballSpeedX;//causes the ball to invert direction on the x axis when colliding with the right paddle
      hits++;//incraments a point to the hits variable
    }
    // Check for scoring
    if (ballX <= 0) {
      rightScore++; // adds a score to right player
      
      resetBall();//calls the resetBall function
      
    } else if (ballX >= boxw) {
      leftScore++;// adds a score to left player
      
      resetBall();
      
    }
    // Update paddle positions
    paddleLeft.style.top = paddleLeftY + "px";
    paddleRight.style.top = paddleRightY + "px";
    // Update ball position
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";

    // Update scores
    leftScoreDisplay.innerHTML = leftScore;
    rightScoreDisplay.innerHTML = rightScore;
    //updates hits display
    hitsDisplay.innerHTML = hits;
    //updates highscore display
    highScoreDisplay.innerHTML = findHighestScore(scores);
  }

  // Reset ball position, saves the score of the 2 players in and array, and saves the name of both players
  function resetBall() {
    scores.push(hits); //places the number of hits in a round into the scores array
    players.push(getName()); // places the two names in the players array in the same order as the scores array
    hits = 0; //resets the hits variable to 0

    //sets the ball to the center of the box
    ballX = boxw/2;
    ballY = boxh/2;
    //sets the ball to the center of the box
    ballSpeedX = -ballSpeedX;// Change ball direction on x axis after scoring
    ballSpeedY = -ballSpeedY; // Change ball direction on y axis after scoring
  }
  //returns both players as one string
  function getName(){
    var a = elem.elements.namedItem("p1").value;//Grabs the input from the forms in html for the p1 name and allows it to be set to the variable a
    var b = elem.elements.namedItem("p2").value;//Grabs the input from the forms in html for the p2 name and allows it to be set to the variable b
    return a+" and "+ b; 
  
  }
  function findHighestScore(arr){ //returns the index of the highest players
    //sequencing - executes the code in order
    var temp = arr[0];//creates a temp varible to hold as the 0th index in the list. 

    //iterates through arr
    for(var i =1; i<arr.length;i++){//goes through the entire array inputed from the paramter and checks for the largest value
      if(temp < arr[i]){//selection that finds the maximum value
        temp = arr[i];//sets temp to the highest value in the array
        topPlayers.innerHTML = players[i];// uploads the display to show the top 2 players. 
      }
    }
    return temp;
  }

}


  
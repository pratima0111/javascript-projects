document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div')); 
      //array.form coverts all divs into an array, all divs have an index
    const scoreDisplay = document.querySelector("#score");
    const stratbtn = document.querySelector("#start-button");
    const GRID_WIDTH = 10;

    let nextRandom = 0;
    let timerId 
    let score =0;

    const colors = [
        'orange', 
        'red', 
        'white',
        'blue',
        'pink'
    ]

    //The Tetriminoes
    //L-Tetrimino
    const lTetromino = [
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 2],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 2],
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2],
        [GRID_WIDTH, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2]
      
    ]
    
  const zTetromino = [
    [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
    [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1]
  ]

  const tTetromino = [
    [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2],
    [1, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
    [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1]
  ]

  const oTetromino = [
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1]
  ]

  const iTetromino = [
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3]
  ]
  const theTetrominos = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]
  //now we will define where we want our tetrominoes to start
  let currentPosition = 4;
  let currentRotation = 0;

  //randomly select a tetromino and it's first rotation
  let random = Math.floor(Math.random()*theTetrominos.length) //.random gives any random number between 0 and 1 



  let current = theTetrominos[random][currentRotation];       //we are passing a number between 0 to 4 randomly this will give us any of the shapes randomly

  
  //draw tetromino
  function draw(){
      current.forEach(index =>{
        squares[currentPosition + index].classList.add("tetromino");
        squares[currentPosition+index].style.backgroundColor =colors[random];        //for e.g if we are making a ltetromino, then it will always be orange(0-index)
        
    })
  }

  
  //to undraw the Tetromino
  function undraw(){
      current.forEach(index=>{
          squares[currentPosition + index].classList.remove('tetromino');
          squares[currentPosition+index].style.backgroundColor = 'black';
      })
  }

  //make the tetromino move down every second
//   timerId = setInterval(moveDown, 1000)

  //assign function to keyCode
  function control(e){
      if(e.keyCode===37){
          moveLeft();
      }else if(e.keyCode===38){
          rotate();
      } else if(e.keyCode===39){
          moveRight();
      } else if (e.keyCode===40){
          moveDown();
      }

  }
  document.addEventListener('keyup', control);

  //this function will move tetromino down
  function moveDown(){
      undraw();
      currentPosition+=GRID_WIDTH;
      
      draw();
      freeze();
  }

  //freeze function --it will stop the shapes form going below the grid bottom
  function freeze(){
      if (  current.some(index=> squares[currentPosition+index+ GRID_WIDTH].classList.contains('taken'))){
          current.forEach(index=> squares[currentPosition + index].classList.add('taken'));

          //start a new tetormino falling
          random = nextRandom;
          nextRandom = Math.floor(Math.random()*theTetrominos.length)
          current = theTetrominos[random][currentRotation]
          currentPosition=4;
          draw();
          displayShape();
          addScore();
          gameOver();
      }
  }

  //move the tetromino left, unless it is at the edge or there is a blockage
  function moveLeft(){
      undraw();
      const isAtLeftEdge = current.some(index=> (currentPosition + index)% GRID_WIDTH === 0) //true for index0, 10, 20, 30, 40... 


      if (!isAtLeftEdge) currentPosition-=1;

      if(current.some(index => squares[currentPosition+index].classList.contains('taken'))){
          currentPosition+=1;
      }
      draw();

  }

  //move the tetromino right, unless is at the edge or there is a blockage
  function moveRight(){
    undraw();
    const isAtRightEdge = current.some(index => (currentPosition + index)% GRID_WIDTH === GRID_WIDTH - 1) 

    if (!isAtRightEdge) currentPosition+=1;

    if(current.some(index => squares[currentPosition+index].classList.contains('taken'))){
        currentPosition-=1;
    }
    draw();

  }
  //rotate the tetromino
  function rotate(){
      undraw();
      currentRotation++; //to move to the next rotation of array i.e. to move to next array of any one tetromino
      if(currentRotation===current.length){     //if the current rotation gets to 4, make it go back to 0
          currentRotation =0;
      }
      current = theTetrominos[random][currentRotation];
      draw();
  }

  //show-up the next Tetromino
  const displaySquares  = document.querySelectorAll('.mini-grid div');
  const displayWidth = 4;
  const displayIndex = 0;
  
  //the Tetrominos without rotation
  const upNextTetrominos = [
      [1, displayWidth+1, displayWidth*2+1, 2],      //lTetromino
      [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
      [1, displayWidth, displayWidth+1, displayWidth+2],    //tTetromino
      [0, 1, displayWidth, displayWidth+1],      //oTetromino
      [1, displayWidth+1, displayWidth*2 +1, displayWidth*3+1]      //iTetromino
  ]

  //display the width in mini-grid display
  function displayShape(){
      //remove any trace of a tetromino from the entries grid
      displaySquares.forEach(square=>{
          square.classList.remove('tetromino');
          square.style.backgroundColor="black";
      })
      upNextTetrominos[nextRandom].forEach(index => {
          displaySquares[displayIndex + index].classList.add('tetromino');
          displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom];
      })
  }

  stratbtn.addEventListener('click', ()=>{
      if (timerId){
          clearInterval(timerId);
          timerId = null;

      }else{
          draw();
          timerId = setInterval(moveDown, 1000);
          nextRandom = Math.floor(Math.random()*theTetrominos.length);
          displayShape();
      }
    
  })

  //add Score function
  function addScore(){
      for (let i=0; i<200; i+= GRID_WIDTH){
          const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];

          if(row.every(index => squares[index].classList.contains('taken'))){
              score+=10;
              scoreDisplay.innerHTML = score;
              row.forEach(index=>{
                  squares[index].classList.remove('taken');
                  squares[index].classList.remove('tetromino');
                  squares[index].style.backgroundColor = "black";
              })
              const squaresRemoved = squares.splice(i, GRID_WIDTH);
              squares = squaresRemoved.concat(squares);
              squares.forEach(cell => grid.appendChild(cell));
          }
      }
  }

  //game-over
  function gameOver(){
      if(current.some(index=> squares[currentPosition+index].classList.contains('taken'))){
          scoreDisplay.innerHTML='end';
          clearInterval(timerId)    //so that moveDown function stops

      }
  }



})
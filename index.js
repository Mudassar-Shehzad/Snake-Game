


const foodSound = new Audio('music/food.mp3');
const moveSound = new Audio('music/move.mp3')
const gameOverSound = new Audio('music/gameover.mp3')
const backgroundMusic = new Audio('music/music.mp3')
let inputDirection = { x: 0, y: 0 }
let speed = 4;
let lastPaintTime = 0;
let snakeArr = [
    { x: 3, y: 3 }
]
let snakeBodyArr = [
    { x: 2, y: 2 }
]
let score = 0;
let hiScore = localStorage.getItem('hiscore') || 0;
if(hiScore){
    let highscore = JSON.parse(hiScore)
    document.getElementById('highScore').innerHTML = highscore
}


let food = { x: 4, y: 5 }

let board = document.getElementById('canvas')





//game functions

function main(currentTime) {


    window.requestAnimationFrame(main)
    if ((currentTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = currentTime;
 
    gameEngine()
    
    
}



function isCollide(sarr) {
    if (sarr[0].x >= 18 || sarr[0].x <= 0 || sarr[0].y >= 18 || sarr[0].y <= 0) {
        return true;
    }
    
    for (let i = 1; i < sarr.length; i++) {
        if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) {
            return true;
        }
    }
    return false;
    
    
    
}
function gameEngine() {
   
    backgroundMusic.play()
    if (isCollide(snakeArr)) {
        gameOverSound.play()
        backgroundMusic.pause()
        alert('gameOver')
        if(score > hiScore){
            localStorage.setItem('hiscore', score)
            hiScore = score;
            document.getElementById('highScore').innerHTML = hiScore
 
         }
        score = 0;
        document.getElementById('score').innerHTML =  score;
        inputDirection = { x: 0, y: 0 }
        speed = 4;
        snakeArr = [
            { x: 2, y: 2 }
        ]

    
    }

    //after the food is eaten

    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        score += 1;
        document.getElementById('score').innerHTML = score;
       
        foodSound.play()
        snakeArr.unshift({ x: snakeArr[0].x + inputDirection.x, y: snakeArr[0].y + inputDirection.y })
        speed += 1;
        let a = 2;
        let b = 17;

        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };

    }

    //moving the snake


    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] }

    }
    snakeArr[0].x += inputDirection.x;
    snakeArr[0].y += inputDirection.y
    //snake
    board.innerHTML = ''
    snakeArr.forEach((item, index) => {
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = item.y;
        snakeElement.style.gridColumnStart = item.x;
        if (index === 0) {
            snakeElement.classList.add('head')
        } else {
            snakeElement.classList.add('snake')

        }
        board.appendChild(snakeElement)

    })
  


    //food
    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement)
}









//main 
window.requestAnimationFrame(main)
window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (inputDirection.y !== 1) {
                inputDirection = { x: 0, y: -1 }
                moveSound.play()
                break;
            };
        case 'ArrowDown':
            if (inputDirection.y !== -1) {
                inputDirection = { x: 0, y: 1 };
                moveSound.play()
            }
            break;
        case 'ArrowLeft':
            if (inputDirection.x !== 1) {
                inputDirection = { x: -1, y: 0 };
                moveSound.play()
            }
            break;
        case 'ArrowRight':
            if (inputDirection.x !== -1) {
                inputDirection = { x: 1, y: 0 };
                moveSound.play()
            }
            break;
    }
});






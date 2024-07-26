const foodSound = new Audio('music/food.mp3');
const moveSound = new Audio('music/move.mp3')
const gameOverSound = new Audio('music/losegame.mp3')
const backgroundMusic = new Audio('music/music.mp3')
// const hiss = new Audio('music/hiss3.mp3')
const success = new Audio('music/success.mp3')
let range = document.getElementById('range')
let levelSelect = document.getElementById('levelSelect')
let pauseGame = document.getElementById('pauseGame')
let continueGame = document.getElementById('continueGame')
let newGame = document.getElementById('newGame')
let gameOver = false;
let speed = 4;
let lastPaintTime = 0;
let inputDirection = { x: 0, y: 0 }
let snakeArr = [
    { x: 11, y: 11 },
    { x: 11, y: 12 }
]
let L1blocks = [
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 6, y: 0 },
    { x: 7, y: 0 },
    { x: 8, y: 0 },
    { x: 9, y: 0 },
    { x: 10, y: 0 },
    { x: 11, y: 0 },
    { x: 12, y: 0 },
    { x: 13, y: 0 },
    { x: 14, y: 0 },
    { x: 15, y: 0 },
    { x: 16, y: 0 },
    { x: 17, y: 0 },
    { x: 18, y: 0 },
    { x: 0, y: 18 },
    { x: 1, y: 18 },
    { x: 2, y: 18 },
    { x: 3, y: 18 },
    { x: 4, y: 18 },
    { x: 5, y: 18 },
    { x: 6, y: 18 },
    { x: 7, y: 18 },
    { x: 8, y: 18 },
    { x: 9, y: 18 },
    { x: 10, y: 18 },
    { x: 11, y: 18 },
    { x: 12, y: 18 },
    { x: 13, y: 18 },
    { x: 14, y: 18 },
    { x: 15, y: 18 },
    { x: 16, y: 18 },
    { x: 17, y: 18 },
]
let L2blocks = [
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 6, y: 0 },
    { x: 7, y: 0 },
    { x: 8, y: 0 },
    { x: 9, y: 0 },
    { x: 10, y: 0 },
    { x: 11, y: 0 },
    { x: 12, y: 0 },
    { x: 13, y: 0 },
    { x: 14, y: 0 },
    { x: 15, y: 0 },
    { x: 16, y: 0 },
    { x: 17, y: 0 },
    { x: 18, y: 0 },
    { x: 0, y: 18 },
    { x: 1, y: 18 },
    { x: 2, y: 18 },
    { x: 3, y: 18 },
    { x: 4, y: 18 },
    { x: 5, y: 18 },
    { x: 6, y: 18 },
    { x: 7, y: 18 },
    { x: 8, y: 18 },
    { x: 9, y: 18 },
    { x: 10, y: 18 },
    { x: 11, y: 18 },
    { x: 12, y: 18 },
    { x: 13, y: 18 },
    { x: 14, y: 18 },
    { x: 15, y: 18 },
    { x: 16, y: 18 },
    { x: 17, y: 18 },
    { x: 1, y: 2 },
    { x: 1, y: 3 },
    { x: 1, y: 4 },
    { x: 1, y: 5 },
    { x: 1, y: 6 },
    { x: 1, y: 7 },
    { x: 1, y: 8 },
    { x: 1, y: 9 },
    { x: 1, y: 10 },
    { x: 1, y: 11 },
    { x: 1, y: 12 },
    { x: 1, y: 13 },
    { x: 1, y: 14 },
    { x: 1, y: 15 },
    { x: 1, y: 16 },
    { x: 1, y: 17 },
    { x: 1, y: 18 },
    { x: 18, y: 1 },
    { x: 18, y: 2 },
    { x: 18, y: 3 },
    { x: 18, y: 4 },
    { x: 18, y: 5 },
    { x: 18, y: 6 },
    { x: 18, y: 7 },
    { x: 18, y: 8 },
    { x: 18, y: 9 },
    { x: 18, y: 10 },
    { x: 18, y: 11 },
    { x: 18, y: 12 },
    { x: 18, y: 13 },
    { x: 18, y: 14 },
    { x: 18, y: 15 },
    { x: 18, y: 16 },
    { x: 18, y: 17 },
    { x: 18, y: 18 },
]
let food = { x: 4, y: 5 }
let bigFood = { x: null, y: null }
let score = 0;
let eatenFood = 0;
let hiScore = localStorage.getItem('hiscore') || 0;
if (hiScore) {
    let highscore = JSON.parse(hiScore)
    document.getElementById('highScore').innerHTML = highscore
}
let board = document.getElementById('canvas')
//game functions
window.requestAnimationFrame(main)
function main(currentTime) {
    window.requestAnimationFrame(main)
    if ((currentTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = currentTime;
    gameEngine()
}
function level(lev) {
    if (lev === 'level1') {
        return 'level1';
    } else if (lev === 'level2') {
        return 'level2';
    } else if (lev === 'level3') {
        return 'level3';
    }

    return false;

}
function handleGameOver(){
    gameOver = false;
    speed = 0;
    setTimeout(() => {
        gameOver=true;
        speed = 4;
        inputDirection = { x: 0, y: 0 }
        snakeArr = [
            { x: 11, y: 11 },
            { x: 11, y: 12 }
        ]


    }, 500)
}
function collisionL2(sarr){
    if (sarr[0].y === 2 || sarr[0].y === 17) {
     handleGameOver()
    }

}
function collisionL3(sarr){
    if (sarr[0].y === 1 || sarr[0].y === 18 || sarr[0].x === 1 || sarr[0].x === 18) {
        handleGameOver()
    }
}
function gameEngine() {
    backgroundMusic.play()

    if (gameOver) {
        board.classList.add('collide')
    

    }
    pauseGame.addEventListener('click', () => {
        speed = 0;
    })
    continueGame.addEventListener('click', () => {
        speed = range.value;
    })
    newGame.addEventListener('click', () => {
        snakeArr = [
            { x: 11, y: 11 },
            { x: 11, y: 12 }
        ]
        inputDirection = { x: 0, y: 0 }

    })

    // if (level(levelSelect.value) === 'level2') {
    if (snakeArr[0].x >= 18) {
        snakeArr[0].x = 1
    }
    if (snakeArr[0].x < 0) {
        snakeArr[0].x = 17
    }
    if (snakeArr[0].y >= 18) {
        snakeArr[0].y = 1

    }
    if (snakeArr[0].y < 0) {
        snakeArr[0].y = 17

    }
    if (score > hiScore) {
        localStorage.setItem('hiscore', score)
        hiScore = score;
        document.getElementById('highScore').innerHTML = hiScore
    }
    document.getElementById('score').innerHTML = score;

    range.addEventListener('change', () => {
        speed = range.value
    })

    //Whenever the food is eaten, the new food is generated
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        score += 1;
        document.getElementById('score').innerHTML = score;
        foodSound.play()
        snakeArr.unshift({ x: snakeArr[0].x + inputDirection.x, y: snakeArr[0].y + inputDirection.y })
        // generating food in random place
        let a = 3;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
        eatenFood += 1;
    }

    if (bigFood.x !== null && snakeArr[0].y === bigFood.y && snakeArr[0].x === bigFood.x) {
        score += 5;
        document.getElementById('score').innerHTML = score;
        success.play()
        snakeArr.unshift({ x: snakeArr[0].x + inputDirection.x, y: snakeArr[0].y + inputDirection.y });
        bigFood = { x: null, y: null };
    }

    if (eatenFood === 5) {
        eatenFood = 0;

        document.getElementById('score').innerHTML = score;
        let a = 2;
        let b = 17;
        bigFood = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
        setTimeout(() => {
            bigFood = { x: null, y: null };
        }, 5000);
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
        for (let i = 1; i < snakeArr.length; i++) {
            if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
                // hiss.play()
                if (index === 0) {
                    snakeElement.classList.add('foodySnakeFace')
                } else {
                    snakeElement.classList.add('foodySnakeBody')
                }
            }
        }
        if (index === 0) {
            snakeElement.classList.add('head')
        } else {
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement)

    })

    if (level(levelSelect.value) === 'level2') {

        L1blocks.forEach(item => {
            blockElement = document.createElement('div');
            blockElement.style.gridRowStart = item.y;
            blockElement.style.gridColumnStart = item.x;
            blockElement.classList.add('L1blocks');
            board.appendChild(blockElement);
            speed = range.value;
        });
    
        collisionL2(snakeArr);
 

    }
    if (level(levelSelect.value) === 'level3') {
        L2blocks.forEach(item => {
            blockElement = document.createElement('div');
            blockElement.style.gridRowStart = item.y;
            blockElement.style.gridColumnStart = item.x;
            blockElement.classList.add('L2blocks');
            board.appendChild(blockElement);
        });
        
        collisionL3(snakeArr);

  
    }

    //food
    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement)
    if (bigFood.x !== null) {
        let bigFoodElement = document.createElement('div');
        bigFoodElement.style.gridRowStart = bigFood.y;
        bigFoodElement.style.gridColumnStart = bigFood.x;
        bigFoodElement.classList.add('food2');
        board.appendChild(bigFoodElement);
    }


}


// }
//main 
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





// function isCollide(sarr) {
//     // Collision with walls
//     if (sarr[0].x >= 18 || sarr[0].x <= 0 || sarr[0].y >= 18 || sarr[0].y <= 0) {
//         return true;
//     }

//     return false;
// }
// function collideItself(sarr) {
//     // collision with the snake itself
//     for (let i = 1; i < sarr.length; i++) {
//         if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) {
//             return true;
//         }
//     }
//     return false
// } 
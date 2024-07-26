const foodSound = new Audio('music/food.mp3');
const moveSound = new Audio('music/move.mp3')
const gameOverSound = new Audio('music/losegame.mp3')
const backgroundMusic = new Audio('music/music.mp3')
const hiss = new Audio('music/hiss3.mp3')
const success = new Audio('music/success.mp3')
let range = document.getElementById('range')

let inputDirection = { x: 0, y: 0 }
let speed = 1;
let lastPaintTime = 0;
let snakeArr = [
    { x: 11, y: 11 },
    { x: 11, y: 12 }
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
function gameEngine() {
    console.log(range.value)
    backgroundMusic.play()
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
        // speed += 0.5;
        // generating food in random place
        let a = 2;
        let b = 17;
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
                hiss.play()
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





function isCollide(sarr) {
    // Collision with walls
    if (sarr[0].x >= 18 || sarr[0].x <= 0 || sarr[0].y >= 18 || sarr[0].y <= 0) {
        return true;
    }

    return false;
}
function collideItself(sarr) {
    // collision with the snake itself
    for (let i = 1; i < sarr.length; i++) {
        if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) {
            return true;
        }
    }
    return false
} // if (isCollide(snakeArr)) {
//     // gameOverSound.play()
//     // backgroundMusic.pause()
//     // alert('gameOver')

//     if (score > hiScore) {
//         localStorage.setItem('hiscore', score)
//         hiScore = score;
//         document.getElementById('highScore').innerHTML = hiScore
//     }
//     score = 0;
//     document.getElementById('score').innerHTML = score;

//     // inputDirection = { x: 0, y: 0 }
//     speed = 4;


//     // snakeArr = [
//     //     { x: 2, y: 2 }
//     // ]
// }
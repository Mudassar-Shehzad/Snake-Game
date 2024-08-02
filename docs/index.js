//All contants
const foodSound = new Audio('music/food.mp3');
const moveSound = new Audio('music/move.mp3')
const gameOverSound = new Audio('music/losegame.mp3')
const backgroundMusic = new Audio('music/music.mp3')
const success = new Audio('music/success.mp3')

//Variables
let moveUp = document.getElementById('moveUp')
let moveDown = document.getElementById('moveDown')
let moveLeft = document.getElementById('moveLeft')
let moveRight = document.getElementById('moveRight')
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
let eatenFood = 0;
let scoreL1 = 0;
let scoreL2 = 0;
let scoreL3 = 0;
let hiScoreL1 = localStorage.getItem('hiscoreL1') || 0;
let hiScoreL2 = localStorage.getItem('hiscoreL2') || 0;
let hiScoreL3 = localStorage.getItem('hiscoreL3') || 0;

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
//Checking which level is selected
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
//WhenEver Snake collides with walls (only in level 1 or level 2)
function handleGameOver() {
    gameOver = false;
    speed = 0;
    setTimeout(() => {
        gameOver = true;
        speed = 4;
        inputDirection = { x: 0, y: 0 }
        snakeArr = [
            { x: 11, y: 11 },
            { x: 11, y: 12 }
        ]


    }, 500)
}

//Function Collision in level 2
function collisionL2(sarr) {
    if (sarr[0].y === 2 || sarr[0].y === 17) {
        scoreL2 = 0;
        handleGameOver()
    }

}
//Function Collision in level 3
function collisionL3(sarr) {
    if (sarr[0].y === 2 || sarr[0].y === 17 || sarr[0].x === 2 || sarr[0].x === 17) {
        scoreL3 = 0;
        handleGameOver()
    }
}

levelSelect.addEventListener('click', () => {
    setTimeout(() => {

        inputDirection = { x: 0, y: 0 }
        snakeArr = [
            { x: 11, y: 11 },
            { x: 11, y: 12 }
        ]

    }, 1000);
    speed = range.value
    if (levelSelect.value === 'level1') {
        document.getElementById('highScore').innerHTML = `HighScore:${hiScoreL1}`;
    } else if (levelSelect.value === 'level2') {
        document.getElementById('highScore').innerHTML = `HighScore:${hiScoreL2}`;
    }
    else if (levelSelect.value === 'level3') {
        document.getElementById('highScore').innerHTML = `HighScore:${hiScoreL3}`;
    }
})

if (
    inputDirection.x === 0 && inputDirection.y === 0 &&
    snakeArr.length === 2 &&
    snakeArr[0].x === 11 && snakeArr[0].y === 11 &&
    snakeArr[1].x === 11 && snakeArr[1].y === 12
) {
    if (levelSelect.value === 'level1') {
        document.getElementById('highScore').innerHTML = `HighScore:${hiScoreL1}`;
    } else if (levelSelect.value === 'level2') {
        document.getElementById('highScore').innerHTML = `HighScore:${hiScoreL2}`;
    }
    else if (levelSelect.value === 'level3') {
        document.getElementById('highScore').innerHTML = `HighScore:${hiScoreL3}`;
    }

}





//main function
function gameEngine() {
    backgroundMusic.play()
    //Adding animation on game over
    if (gameOver) {
        board.classList.add('collide')
    }
    //Handling pause and continue the Game
    pauseGame.addEventListener('click', () => {
        backgroundMusic.pause()
        speed = 0;
    })
    continueGame.addEventListener('click', () => {
        backgroundMusic.play()
        speed = range.value;
    })
    //New Game
    newGame.addEventListener('click', () => {
        
        snakeArr = [
            { x: 11, y: 11 },
            { x: 11, y: 12 }
        ]
        inputDirection = { x: 0, y: 0 }

    })

    //Handling Out AND In 
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

    if (levelSelect.value === 'level1') {
        if (scoreL1 > hiScoreL1) {
            localStorage.setItem('hiscoreL1', scoreL1)
            hiScoreL1 = scoreL1;
        }
        document.getElementById('score').innerHTML = `Score:${scoreL1}`;

    } else if (levelSelect.value === 'level2') {
        if (scoreL2 > hiScoreL2) {
            localStorage.setItem('hiscoreL2', scoreL2)
            hiScoreL1 = scoreL2;
        }
        document.getElementById('score').innerHTML = `Score:${scoreL2}`;
    }
    else if (levelSelect.value === 'level3') {
        if (scoreL3 > hiScoreL3) {
            localStorage.setItem('hiscoreL3', scoreL3)
            hiScoreL3 = scoreL3;
        }
        document.getElementById('score').innerHTML = `Score:${scoreL3}`;
    }


    // Setting speed according to user via range input
    range.addEventListener('change', () => {
        speed = range.value
    })


    //Whenever the food is eaten, the new food is generated
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        if (levelSelect.value === 'level1') {
            scoreL1 += 1;
            document.getElementById('score').innerHTML = `Score:${scoreL1}`;
            if (scoreL1 > hiScoreL1) {
                document.getElementById('highScore').innerHTML = `HighScore:${scoreL1}`;
            }

        } else if (levelSelect.value === 'level2') {
            scoreL2 += 1;
            document.getElementById('score').innerHTML = `Score:${scoreL2}`;
            if (scoreL2 > hiScoreL2) {
                document.getElementById('highScore').innerHTML = `HighScore:${scoreL2}`;
            }

        }
        else if (levelSelect.value === 'level3') {
            scoreL3 += 1;
            document.getElementById('score').innerHTML = `Score:${scoreL3}`;
            if (scoreL2 > hiScoreL2) {
                document.getElementById('highScore').innerHTML = `Score:${scoreL3}`;;
            }

        }
        document.getElementById('score').innerHTML = levelSelect.value === 'level1' ? `Score:${scoreL1}` : levelSelect.value === 'level2' ? `Score:${scoreL2}` : `Score:${scoreL3}`;
        foodSound.play()
        snakeArr.unshift({ x: snakeArr[0].x + inputDirection.x, y: snakeArr[0].y + inputDirection.y })
        // generating food in random place
        let a = 3;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
        eatenFood += 1;
    }
    //Cheking if the Big Food is eaten
    if (bigFood.x !== null && snakeArr[0].y === bigFood.y && snakeArr[0].x === bigFood.x) {

        if (levelSelect.value === 'level1') {
            scoreL1 += 5;

        } else if (levelSelect.value === 'level2') {
            scoreL2 += 5;

        }
        else if (levelSelect.value === 'level3') {
            scoreL3 += 5;

        }
        success.play()
        snakeArr.unshift({ x: snakeArr[0].x + inputDirection.x, y: snakeArr[0].y + inputDirection.y });
        bigFood = { x: null, y: null };
    }
    document.getElementById('score').innerHTML = levelSelect.value === 'level1' ? `Score:${scoreL1}` : levelSelect.value === 'level2' ? `Score:${scoreL2}` : `Score:${scoreL3}`;

    //Generating New Big Food by checking the eaten food value
    if (eatenFood === 5) {
        eatenFood = 0;
        if (levelSelect.value === 'level1') {
            document.getElementById('score').innerHTML = `Score:${scoreL1}`;;
        } else if (levelSelect.value === 'level2') {
            document.getElementById('score').innerHTML = `Score:${scoreL2}`;;
        }
        else if (levelSelect.value === 'level3') {
            document.getElementById('score').innerHTML = `Score:${scoreL3}`;;
        }
        let a = 2;
        let b = 17;
        bigFood = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
        setTimeout(() => {

        }, 3000);

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



    //Displaying Snake
    board.innerHTML = ''
    snakeArr.forEach((item, index) => {
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = item.y;
        snakeElement.style.gridColumnStart = item.x;
        //Changing the snake color if the snake collides itself
        for (let i = 1; i < snakeArr.length; i++) {
            if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {

                if (scoreL1 > 1) {
                    if (index === 0) {
                        snakeElement.classList.add('foodySnakeFace')
                    } else {
                        snakeElement.classList.add('foodySnakeBody')
                    }
                    scoreL1 = 0
                    setTimeout(() => {
                        snakeArr = [
                            { x: 11, y: 11 },
                            { x: 11, y: 12 }
                        ]
                        inputDirection = { x: 0, y: 0 }
                        
                    }, 100);
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
    //Changing the board to level 2

    if (level(levelSelect.value) === 'level2') {
        L1blocks.forEach(item => {

            blockElement = document.createElement('div');
            blockElement.style.gridRowStart = item.y;
            blockElement.style.gridColumnStart = item.x;
            blockElement.classList.add('L1blocks');
            board.appendChild(blockElement);


        });
        // Function defined on the top
        collisionL2(snakeArr);


    }
    //Changing the board to level 3
    if (level(levelSelect.value) === 'level3') {
        L2blocks.forEach(item => {
            blockElement = document.createElement('div');
            blockElement.style.gridRowStart = item.y;
            blockElement.style.gridColumnStart = item.x;
            blockElement.classList.add('L2blocks');
            board.appendChild(blockElement);
            // inputDirection = { x: 0, y: 0 }
            // snakeArr = [
            //     { x: 11, y: 11 },
            //     { x: 11, y: 12 }
            // ]
        });
        // Function defined on the top
        collisionL3(snakeArr);


    }

    //Displaying Food
    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement)
    //Displaying Big food
    if (bigFood.x !== null) {
        let bigFoodElement = document.createElement('div');
        bigFoodElement.style.gridRowStart = bigFood.y;
        bigFoodElement.style.gridColumnStart = bigFood.x;
        bigFoodElement.classList.add('food2');
        board.appendChild(bigFoodElement);

    }


}


//Adding eventlistener to the arrow keys

moveUp.addEventListener('click', () => {
    if (inputDirection.y !== 1) {
        inputDirection = { x: 0, y: -1 }
        moveSound.play()
    };
})
moveDown.addEventListener('click', () => {
    if (inputDirection.y !== -1) {
        inputDirection = { x: 0, y: 1 };
        moveSound.play()
    }
})
moveLeft.addEventListener('click', () => {
    if (inputDirection.x !== 1) {
        inputDirection = { x: -1, y: 0 };
        moveSound.play()
    }
})
moveRight.addEventListener('click', () => {
    if (inputDirection.x !== -1) {
        inputDirection = { x: 1, y: 0 };
        moveSound.play()
    }
})
window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (inputDirection.y !== 1) {
                inputDirection = { x: 0, y: -1 }
                moveSound.play()
            };
            break;
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






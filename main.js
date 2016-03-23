var COB = {
    canvas: '',
    context: '',
    height: 540,
    width: 910,
    keysDown: {},
    keys: {
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39
    },
    background: {
        url: 'images/battlefield-2b.jpg',
        image: null,
        ready: 0
    },
    player: {
        x: 0,
        y: 0,
        url: 'images/animals-2.png',
        image: '',
        ready: 0,
        positions: {
            DOWN: {
                width: 25,
                height: 40,
                x: [10, 60, 105],
                currentX: 0,
                lastX: 0,
                y: [0, 190],
                total_width: 145
            },
            LEFT: {
                width: 40,
                height: 25,
                x: [5, 50, 100],
                currentX: 0,
                lastX: 0,
                y: [60, 250],
                total_width: 145
            },
            RIGHT: {
                width: 40,
                height: 25,
                x: [0, 50, 100],
                currentX: 0,
                lastX: 0,
                y: [110, 300],
                total_width: 145
            },
            UP: {
                width: 25,
                height: 30,
                x: [10, 60, 105],
                currentX: 0,
                lastX: 0,
                y: [155, 340],
                total_width: 145
            }
        },
        position: '',
        imageColumn: 0,
        imageRow: 0,
        imageX: 0,
        imageY: 0
    },
    ball: {
        x: 0,
        y: 0,
        url: 'images/ball.png',
        width: 32,
        height: 32,
        image: '',
        ready: 0
    },
    ballsCaught: 0,
    requestAnimationFrame: window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame,
    speed: 3,
    init: function() {
        COB.canvas = document.createElement("canvas");
        COB.context = COB.canvas.getContext("2d");
        COB.canvas.width = COB.width;
        COB.canvas.height = COB.height;
        document.body.appendChild(COB.canvas);
        
        COB.background.image = new Image();
        COB.background.image.src = COB.background.url;
        COB.background.image.onload = COB.imageLoaded(COB.background);

        COB.player.image = new Image();
        COB.player.image.src = COB.player.url;
        COB.player.imageColumn = COB.getRandom(0, 3);
        COB.player.imageRow = COB.getRandom(0, 1);
        COB.player.x = COB.getRandom(100, COB.canvas.width * 0.8);
        COB.player.y = COB.getRandom(50, COB.canvas.height * 0.6);
        COB.player.position = COB.player.positions.DOWN;
        COB.player.image.onload = COB.imageLoaded(COB.player);

        COB.ball.image = new Image();
        COB.ball.image.src = COB.ball.url;
        COB.ball.x = COB.getRandom(100, COB.canvas.width * 0.8);
        COB.ball.y = COB.getRandom(50, COB.canvas.height * 0.6);
        COB.ball.image.onload = COB.imageLoaded(COB.ball);
        
        document.addEventListener('keydown', COB.keydown, false);
        document.addEventListener('keyup', COB.keyup, false);

        COB.update();
    },
    reset: function() {
        COB.ball.x = COB.getRandom(100, COB.canvas.width * 0.8);
        COB.ball.y = COB.getRandom(50, COB.canvas.height * 0.6);
    },
    imageLoaded: function(image) {
        image.ready = 1;
    },
    getRandom: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    keydown: function(e) {
        COB.keysDown[e.keyCode] = '';
    },
    keyup: function(e) {
        delete COB.keysDown[e.keyCode];
    },
    update: function() {
        if (COB.keys.UP in COB.keysDown) {
            if (COB.player.y - COB.speed >= 0) {
                COB.player.y -= COB.speed;
            }
            COB.player.position = COB.player.positions.UP;
        }
        if (COB.keys.DOWN in COB.keysDown) {
            if (COB.player.y + COB.player.positions.DOWN.height + COB.speed <= COB.height) {
                if (COB.player.y + COB.player.positions.DOWN.height <= 360) {
                    COB.player.y += COB.speed;
                }
            }
            COB.player.position = COB.player.positions.DOWN;
        }
        if (COB.keys.LEFT in COB.keysDown) {
            if (COB.player.x - COB.speed >= 0) {
                COB.player.x -= COB.speed;
            }
            COB.player.position = COB.player.positions.LEFT;
        }
        if (COB.keys.RIGHT in COB.keysDown) {
            if (COB.player.x + COB.player.positions.RIGHT.width + COB.speed <= COB.width) {
                COB.player.x += COB.speed;
            }
            COB.player.position = COB.player.positions.RIGHT;
        }

        if (COB.player.x <= (COB.ball.x + COB.ball.width) && COB.ball.x <= (COB.player.x + COB.ball.width) && COB.player.y <= (COB.ball.y + COB.ball.height) && COB.ball.y <= (COB.player.y + COB.ball.height)) {
            ++COB.ballsCaught;
            COB.reset();
        }

        COB.draw();
        COB.requestAnimationFrame.call(window, COB.update);
    },
    draw: function() {
        if (COB.background.ready) {
            COB.context.drawImage(COB.background.image, 0, 0, COB.background.image.width, COB.background.image.height, 0, 0, COB.width, COB.height);
        }
        if (COB.player.ready) {
            COB.player.imageX = COB.player.position.x[0] + COB.player.position.total_width * COB.player.imageColumn;
            COB.player.imageY = COB.player.position.y[COB.player.imageRow];
            COB.context.drawImage(COB.player.image, COB.player.imageX, COB.player.imageY, COB.player.position.width, COB.player.position.height, COB.player.x, COB.player.y, COB.player.position.width, COB.player.position.height);

            if (COB.player.position.currentX === 0) {
                COB.player.position.currentX = 1;
                COB.player.position.lastX = 0;
            } else if (COB.player.position.currentX === 1) {
                COB.player.position.currentX = COB.player.position.lastX === 0 ? 2 : 0;
                COB.player.position.lastX = 1;
            } else {
                COB.player.position.currentX = 1;
                COB.player.position.lastX = 2;
            }
        }
        if (COB.ball.ready) {
            COB.context.drawImage(COB.ball.image, COB.ball.x, COB.ball.y);
        }

        COB.context.fillStyle = "rgb(250, 250, 250)";
        COB.context.font = "20px Arial";
        COB.context.textAlign = "left";
        COB.context.textBaseline = "top";
        COB.context.fillText("Balls caught: " + COB.ballsCaught, 10, 10);
    }
};
COB.init();
let scoreElement = document.getElementById("scoreNumb");
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const square = 30 //width of a square
const empty = 'white';
const col = 10;
const row = 20;

window.onkeydown = movePiece;
//draw square function
function drawsquare(x, y, color) {

    ctx.fillStyle = color;
    ctx.fillRect(x * square, y * square, square, square);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(x * square, y * square, square, square);
}

//2D array 10 col * 20 rows 
let board = [];
for (let r = 0; r < row; r++) {
    board[r] = [];
    for (let c = 0; c < col; c++) {
        board[r][c] = empty;
    }
}

function drawBoard() {
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
            drawsquare(c, r, board[r][c])
        }
    }

}
drawBoard();

//where 0=false and 1=true in the 3*3 shapes
const L = [
    [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
    [[0, 1, 0], [0, 1, 0], [0, 1, 1]],
    [[0, 0, 0], [1, 1, 1], [1, 0, 0]],
    [[1, 1, 0], [0, 1, 0], [0, 1, 0]]]

const Z = [
    [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
    [[0, 0, 1], [0, 1, 1], [0, 1, 0]],
    [[0, 0, 0], [1, 1, 0], [0, 1, 1]],
    [[0, 1, 0], [1, 1, 0], [1, 0, 0]]]


const J = [
    [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
    [[0, 1, 1], [0, 1, 0], [0, 1, 0]],
    [[0, 0, 0], [1, 1, 1], [0, 0, 1]],
    [[0, 1, 0], [0, 1, 0], [1, 1, 0]]]

const S = [
    [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
    [[0, 1, 0], [0, 1, 1], [0, 0, 1]],
    [[0, 0, 0], [0, 1, 1], [1, 1, 0]],
    [[1, 0, 0], [1, 1, 0], [0, 1, 0]]]

const T = [
    [[0, 0, 0], [1, 1, 1], [0, 1, 0]],
    [[0, 1, 0], [1, 1, 0], [0, 1, 0]],
    [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
    [[0, 1, 0], [0, 1, 1], [0, 1, 0]]]
const O = [
    [[1, 1, 0], [1, 1, 0], [0, 0, 0]],
    [[1, 1, 0], [1, 1, 0], [0, 0, 0]],
    [[1, 1, 0], [1, 1, 0], [0, 0, 0]],
    [[1, 1, 0], [1, 1, 0], [0, 0, 0]]]

const I = [
    [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]],
    [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]],
    [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]],
    [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]]]

///fill the 1s function
Piece.prototype.fill = function (color) {
    for (let r = 0; r < this.activePiece.length; r++) {
        for (let c = 0; c < this.activePiece.length; c++) {
            if (this.activePiece[r][c]) {
                drawsquare(this.x + c, this.y + r, color);
            }
        }
    }
}
///piece object 
function Piece(piece, color) {
    this.color = color;
    this.piece = piece;
    // the active piece properties
    this.pieceNum = 0;
    this.activePiece = this.piece[this.pieceNum];
    this.x = 3;
    this.y = -1;
}
///get random pieces 
const pieces = [
    [Z, "cyan"],
    [S, "green"],
    [T, "yellow"],
    [O, "red"],
    [L, "purple"],
    [I, "orange"],
    [J, "blue"]
];

function createRandomPiece() {
    let randomNo = Math.floor(Math.random() * (pieces.length));
    return new Piece(pieces[randomNo][0], pieces[randomNo][1]);
}
var newPiece = createRandomPiece();

///adding functions to the constructor
Piece.prototype.draw = function () {
    this.fill(this.color);
}

Piece.prototype.unDraw = function () {
    this.fill(empty);
}

// arrows functions
Piece.prototype.moveDown = function () {
    if (!this.collision(this.activePiece, 0, 1)) {
        this.unDraw();
        this.y++;
        this.draw();
    }
    else {
        this.lock();
        newPiece = createRandomPiece();
    }
}

Piece.prototype.moveRight = function () {
    if (!this.collision(this.activePiece, 1, 0)) {
        this.unDraw();
        this.x++;
        this.draw();
    }
}

Piece.prototype.moveLeft = function () {
    if (!this.collision(this.activePiece, -1, 0)) {
        this.unDraw();
        this.x--;
        this.draw();
    }
}

Piece.prototype.rotate = function () {
    this.pieceNum = (this.pieceNum + 1) % this.piece.length;
    let nextPiece = this.piece[this.pieceNum];
    if (!this.collision(nextPiece, 0, 0)) {
        this.unDraw();
        this.activePiece = this.piece[this.pieceNum];
        this.draw();
    }
}
window.addEventListener("keydown", movePiece);

///collision detection 
Piece.prototype.collision = function (nextPiece, x, y) {
    for (let r = 0; r < nextPiece.length; r++) {
        for (let c = 0; c < nextPiece.length; c++) {
            if (!nextPiece[r][c]) { continue }
            let futureX = this.x + c + x;
            let futureY = this.y + r + y;
            if (futureX < 0 || futureX >= col || futureY >= row) {
                return true;
            }
            if (futureY < 0) {
                continue;
            }
            if (board[futureY][futureX] != empty) { return true; }
        }
    } return false;
}
// pieces to lock when it touches the  top where the game is over
var totalScore = 0;
let gameOver = false;
Piece.prototype.lock = function () {
    for (r = 0; r < this.activePiece.length; r++) {
        for (c = 0; c < this.activePiece.length; c++) {
            if (!this.activePiece[r][c]) {
                continue;
            }
            if (this.y + r < 0) {
                msg.style.display = 'block'
                gameOver = true;
                msg.innerHTML = '<div>GAME OVER</div>';
                break;
            }
            board[this.y + r][this.x + c] = this.color;
        }
    }
    // remove full rows
    for (r = 0; r < row; r++) {
        let rowFull = true;
        for (c = 0; c < col; c++) {
            rowFull = rowFull && (board[r][c] != empty);
        }
        if (rowFull) {

            for (y = r; y > 1; y--) {
                for (c = 0; c < col; c++) {
                    board[y][c] = board[y - 1][c];
                }
            }
            for (c = 0; c < col; c++) {
                board[0][c] = empty;
            }
            const audio1 = new Audio("../Resources/removeFullRow.ogg");

            audio1.play();
            totalScore += 10;
            /// levelup 
            let soundHasPlayed = false;
            if (totalScore >= 10 && totalScore < 100 && !soundHasPlayed) {
                document.getElementById('levelNumb').innerText = 2
                const audio2 = new Audio("../Resources/SFX_LevelUp.ogg");
                audio2.play();
                soundHasPlayed = true;
                Piece.prototype.timer = setInterval(function () {
                    if (!gameOver) {
                        newPiece.moveDown();
                    }
                }, 500);
                audio2.pause();
            }
            else if (totalScore >= 100) {
                document.getElementById('levelNumb').innerText = 3
                Piece.prototype.timer = setInterval(function () {
                    if (!gameOver) {
                        newPiece.moveDown();
                    }
                }, 350);
            }
            drawBoard();
            scoreElement.innerText = totalScore;
        }
    }
}

///keys pressed
function movePiece() {
    if (event.keyCode == 37) {
        newPiece.moveLeft();
        event.stopImmediatePropagation();
    } else if (event.keyCode == 38) {
        newPiece.rotate();
        event.stopImmediatePropagation();
    }
    else if (event.keyCode == 39) {
        newPiece.moveRight();
        event.stopImmediatePropagation();
    } else if (event.keyCode == 40) {
        const audio3 = new Audio("../Resources/SFX_PieceLockdown.ogg");
        audio3.play();
        newPiece.moveDown();
    }
}

// set the falling piece interval 
Piece.prototype.timer = setInterval(function () {
    if (!gameOver) {
        newPiece.moveDown();
    }
}, 1000);


// Screen one variables:
var mainMenu = document.getElementById('mainmenu');
var logo = document.getElementById('logo');
var play = document.getElementById('play');
var team = document.getElementById('team');

// Team screen variables:
var team_screen = document.getElementById('team_screen');
var aya = document.getElementById('aya');
var fatma = document.getElementById('fatma');
var hadeer = document.getElementById('hadeer');
var nourhan = document.getElementById('nourhan');
var ahmed = document.getElementById('ahmed');
var menu = document.getElementById('menu');

// Game screen variables:

var game_screen = document.getElementById('game_screen');
var canvas_container = document.getElementById('canvas_container');
var side_menu = document.getElementById('side_menu');
var innerlogo = document.getElementById('innerlogo');
var score = document.getElementById('score');
var pause = document.getElementById('pause');
var msg = document.getElementById('msg');
var level = document.getElementById('level');
var exit = document.getElementById('exit');
// Animate main menu:
function animateMainMenu() {
    logo.style.top = '100px';
    logo.style.opacity = '1';
    play.style.left = '150px';
    play.style.opacity = '1';
    team.style.left = '305px';
    team.style.opacity = '1';
};

// Animate team screen: 
function animateTeam() {
    team_screen.style.zIndex = '1';
    aya.style.top = '120px';
    aya.style.opacity = '1';
    fatma.style.top = '180px';
    fatma.style.opacity = '1';
    hadeer.style.top = '240px';
    hadeer.style.opacity = '1';
    nourhan.style.top = '300px';
    nourhan.style.opacity = '1';
    ahmed.style.top = '360px';
    ahmed.style.opacity = '1';
    menu.style.top = '450px';
    menu.style.opacity = '1';
};

// Animate game screen:
function animateGameScreen() {
    canvas_container.style.opacity = '1';
    canvas_container.style.left = '349px';
    side_menu.style.opacity = '1';
    side_menu.style.left = '690px';
    innerlogo.style.opacity = '1';
    innerlogo.style.top = '0px';
    score.style.opacity = '1'
    score.style.top = '245px'
    pause.style.opacity = '1';
    pause.style.top = '467px';
    level.style.opacity = '1';
    level.style.top = '355px';
    exit.style.opacity = '1';
    exit.style.top = '525px';
};

// Loading:
window.addEventListener('load', function () {
    animateMainMenu();
});

// Team button:
team.addEventListener('click', function () {
    mainMenu.style.display = 'none';
    team_screen.style.display = 'block';
    animateTeam();
});

// Menu button:
menu.addEventListener('click', function () {
    window.location.reload();
});

// Play button:
play.addEventListener('click', start)
function start() {
    screen_1.style.display = 'none';
    game_screen.style.zIndex = '1';
    game_screen.style.display = 'block';
    animateGameScreen();
}
// Exit button:
exit.addEventListener('click', function () {
    window.location.reload();
});

pause.addEventListener('click', function () {
    if (!gameOver) {
        msg.style.display = 'block'
        msg.innerHTML = "<div>PAUSED</div>"
        gameOver = true
    } else {
        msg.style.display = 'none'
        gameOver = false;
    }
});

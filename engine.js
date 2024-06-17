/* Criação da tela do jogo com base em um canvas 16:9

    Faz os cálculos da área disponível, dependendo da proporção da tela.

    Monta e tela de jogo de acordo manténdo a proporção de 16:9

    Deixa black bars se necessário (body > background-color: black).

*/

let canvas;
let engine;
let screenId;

let gameScreen = {
    width: 640,
    height: 360
};

function CreateGameScreen() {

    // Cria os elementos no HTML
    // Importante deixar o body com padding e margins em 0 e ocupando todo o espaço visivel do documento.
    document.body.style = "margin: 0; padding: 0; background-color: black; width: 100vw; height: 100vh; overflow-x: hidden; overflow-y: hidden; scroll: none;"
    canvas = document.createElement("canvas");
    document.body.appendChild(canvas);

    // Inicia o motor gráfico do javascript;

    engine = canvas.getContext("2d");
    window.requestAnimationFrame(gameLoop);

    // Observa por redimensionamento da janela
    
    window.addEventListener("resize", (event) => {
        UpdateGameScreen();
    });

    console.log("[engine] criando canvas...");
}

function UpdateGameScreen() {

    // Detecta proporção, se a largura for maior, utilizar a altura como base.
    if(document.body.clientWidth > document.body.clientHeight) {
        gameScreen.height = document.body.clientHeight;
        gameScreen.width = Math.round(document.body.clientHeight * 16 / 9);
    }
    // Se a altura for maior, utilizar a largura como base.
    else {
        gameScreen.width = document.body.clientWidth;
        gameScreen.height = Math.round(document.body.clientWidth * 9 / 16);
    }

    canvas.width = gameScreen.width;
    canvas.height = gameScreen.height;
    canvas.style.width = gameScreen.width + "px";
    canvas.style.height = gameScreen.height + "px";

    console.log("[engine] atualizando canvas: " + gameScreen.width + "x" + gameScreen.height + " px.");
}

function gameLoop()
{
    if(screenId == 1){
        renderSplashScreen();
    }

    window.requestAnimationFrame(gameLoop);
}

// ANIMAÇÃO DA SPLASH SCREEN screenId=1;

let splash_screen = {
    start_time: 0,
    end_time: 0,
    duration: 6000,
    currentTime: 0,
    opacity: 1,
    startZoom: 0.8,
    endZoom: 1.2,
    fadeIn: 1000, // Duração de FadeIn
    fadeOut: 1000, // Duração de Fadeout
    blackout: 1000, // Duração de blackout
}

function StartSplashScreen(imageSrc,audioSrc) {
    splash_screen.start_time = new Date().getTime();
    splash_screen.end_time = splash_screen.start_time + splash_screen.duration;
    splash_screen.fadeOutStart = splash_screen.duration - splash_screen.fadeIn - splash_screen.blackout;
    splash_screen.blackoutStart = splash_screen.duration - splash_screen.blackout;  
    screenId = 1;
}

function renderSplashScreen() {
    splash_screen.currentTime = new Date().getTime() - splash_screen.start_time;

    // Evento para quando finalizar de renderizar a splash screen.
    if(splash_screen.currentTime >= splash_screen.duration){

        screenId = 0;
        EVENT_OnSplashScreenEnd();
    }

    // Calculo de ZOOM e opacidade.

    // Calculo de função de ZOOM, é um aumento fixo.
    splash_screen.zoom = splash_screen.startZoom + (splash_screen.endZoom - splash_screen.startZoom) * splash_screen.currentTime / splash_screen.duration;

    // opacidade começa em 0 e vai até 1 em 1 segundo em uma função quadratica
    // depois mantém em 1 por 2 segundos, e no final faz a função quadratica inversa por 1s, o ultimo segundo é tela preta.
    
    if(splash_screen.currentTime < splash_screen.fadeIn) {
        // Rampa de inicio
        splash_screen.opacity = Math.pow(splash_screen.currentTime/splash_screen.fadeIn,2);
    }
    else if(splash_screen.currentTime >= splash_screen.fadeOutStart && splash_screen.currentTime < splash_screen.blackoutStart)
    {
        // Tempo de fadeOut
        splash_screen.opacity = 1 - Math.pow((splash_screen.currentTime - splash_screen.fadeOutStart)/1000,2);
    }
    else if(splash_screen.currentTime > splash_screen.blackoutStart) {
        // Tempo com opacidade 0
        splash_screen.opacity = 0;
    }
    else
    {
        splash_screen.opacity = 1;
    }

    // Renderiza

    engine.fillStyle = "green";
    engine.fillRect(0,0,gameScreen.width,gameScreen.height);
    engine.fillStyle = "rgba(255,0,0," + splash_screen.opacity +")";
    engine.fillRect(0.4*gameScreen.width,0.4*gameScreen.height,0.2*gameScreen.width,0.2*gameScreen.height);
}
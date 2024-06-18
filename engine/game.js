function StartEngine() 
{
    CreateGameScreen();
    StartSplashScreen("assets/img/splash/splash.png","assets/audio/splash/intro.mp3");
}

function EVENT_OnSplashScreenEnd(){
    console.log("fim do evento de splash screen");
}
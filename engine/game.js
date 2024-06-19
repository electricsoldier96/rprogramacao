function StartEngine() 
{
    CreateGameScreen();
    StartSplashScreen("assets/img/splash/splash.png");
}

function EVENT_OnSplashScreenEnd(){
    console.log("fim do evento de splash screen");
}

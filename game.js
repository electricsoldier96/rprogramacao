function StartEngine() 
{
    CreateGameScreen();
    UpdateGameScreen();
    StartSplashScreen();
}

function EVENT_OnSplashScreenEnd(){
    console.log("fim do evento de splash screen");
}
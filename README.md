Olá!

Esse jogo é programado com ideias colaborativas da comunidade /r/programacao do reddit!

Você pode acessa-lo aqui: https://electricsoldier96.github.io/rprogramacao_game/

A cada dia, um novo post é criado na comunidade, e o comentário mais bem votado é programado no jogo para o próximo dia, é claro que isso depende da viabilidade de tempo.

O jogo é feito em JS com canvas, em 2D.

=============================

v0.0 - 19/06/2024

- Criada engine básica (resolução do canvas se adapta a tela em resolução 16:9, podendo adicionar black bars se necessário).
- Splash Screen rápida de uns 5 segundos com logo do /r/programacao em fade-in e fade-out.

```JavaScript
// Inicia o motor gráfico quando a página HTML carrega, é chamada no evento de carregamento do elemento body.
function StartEngine() : void

// Cria a tela do Jogo com canvas, resolução adpatativa, atualiza as dimensões de acordo com a tela.
function CreateGameScreen() : void

// Mostra o splash screen, que é uma tela inicial com logo em fade-in e fade-out
function StartSplashScreen(imageSrc) : void
```

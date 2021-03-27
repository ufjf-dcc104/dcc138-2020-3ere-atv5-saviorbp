import AssetManager from "./AssetManager.js";
import Mixer from "./Mixer.js";
import InputManager from "./InputManager.js";
import Game from "./Game.js";
import CenaJogo from "./CenaJogo.js";
import CenaCarregando from "./CenaCarregando.js";
import CenaFim from "./CenaFim.js";

const input = new InputManager();
const mixer = new Mixer(10);
const assets = new AssetManager(mixer);

assets.carregaImagem("textura", "assets/textura.png");
assets.carregaAudio("bate", "assets/coin.wav");
assets.carregaAudio("boom", "assets/boom.wav");


const canvas = document.querySelector("canvas");
canvas.width = 20 * 32;
canvas.height = 20 * 32;

input.configurarTeclado({
  ArrowLeft: "MOVE_ESQUERDA",
  ArrowRight: "MOVE_DIREITA",
  ArrowUp: "MOVE_CIMA",
  ArrowDown: "MOVE_BAIXO",
  " ": "PROXIMA_CENA",
});

const game = new Game(canvas, assets, input);

const cena0 = new CenaCarregando();
const cena1 = new CenaJogo();
const cena2 = new CenaFim();
game.adicionarCena("carregando",cena0);
game.adicionarCena("jogo",cena1);
game.adicionarCena("fim",cena2);

game.iniciar();

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "s":
      game.iniciar();
      break;
      case "S":
      game.parar();
      break;
      case "c":
      assets.play("boom");
      break;
  
    default:
      break;
  }
})
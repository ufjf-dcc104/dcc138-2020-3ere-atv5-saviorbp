import AssetManager from "./AssetManager.js";
import Cena from "./Cena.js";
import Sprite from "./Sprites.js";
import Mapa from "./mapa.js";
import Mixer from "./Mixer.js";
import modeloMapa1 from "../maps/mapa1.js";
import InputManager from "./InputManager.js";

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
  "ArrowLeft": "MOVE_ESQUERDA",
  "ArrowRight": "MOVE_DIREITA",
  });

const cena1 = new Cena(canvas, assets);

const mapa1 = new Mapa(20, 20, 32);
mapa1.carregaMapa(modeloMapa1);
cena1.configuraMapa(mapa1);

cena1.iniciar();

import Cena from "./Cena.js";
import Sprite from "./Sprites.js";
import AssetManager from "./AssetManager.js";
import Mixer from "./Mixer.js";
import Mapa from "./mapa.js";
import modeloMapa1 from "../maps/mapa1.js";

const mixer = new Mixer(10);
const assets = new AssetManager(mixer);

assets.carregaImagem("garota", "assets/garota.png");
assets.carregaImagem("esqueleto", "assets/skelly.png");
assets.carregaImagem("orc", "assets/orc.png");
assets.carregaAudio("moeda", "assets/coin.wav");
assets.carregaAudio("boom", "assets/boom.wav");


const canvas = document.querySelector("canvas");
canvas.width = 20 * 32;
canvas.height = 20 * 32;
const cena1 = new Cena(canvas, assets);

const mapa1 = new Mapa(20, 20, 32);
mapa1.carregaMapa(modeloMapa1);
cena1.configuraMapa(mapa1);

cena1.criarDesenho = function () {
  let nmy = Math.floor(Math.random() * (this.mapa.tiles.length - 2)) + 1;
  let nmx = Math.floor(Math.random() * (this.mapa.tiles[0].length - 2)) + 1;
  while (this.mapa.tiles[nmy][nmx] != 0) {
    nmy = Math.floor(Math.random() * (this.mapa.tiles.length - 2)) + 1;
    nmx = Math.floor(Math.random() * (this.mapa.tiles[0].length - 2)) + 1;
    this.adicionar(new Sprite({
      x: nmx * this.mapa.SIZE + this.mapa.SIZE / 2,
      y: nmy * this.mapa.SIZE + this.mapa.SIZE / 2,
      color: "red"
    }));
  }
}
  cena1.iniciar();

  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "s":
        cena1.iniciar();
        break;
      case "S":
        cena1.parar();
        break;
      case "c":
        assets.play("moeda");
        break;
      case "b":
        assets.play("boom");
        break;
    }
  });
import Sprite from "./Sprites.js";

export default class Cena {
  
  constructor(canvas = null, assets = null) {
    this.canvas = canvas;
    this.ctx = canvas?.getContext("2d");
    this.assets = assets;
    this.game = null;
    this.preparar();
  }
  desenhar() {
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.mapa?.desenhar(this.ctx);

    if (this.assets.acabou()) {
      for (let s = 0; s < this.sprites.length; s++) {
        const sprite = this.sprites[s];
        sprite.desenhar(this.ctx);
        sprite.aplicaRestricoes();
      }
    }
    this.ctx.fillStyle = "yellow";
    this.ctx.fillText(this.assets?.progresso(), 10, 20);
  }
  adicionar(sprite) {
    sprite.cena = this;
    this.sprites.push(sprite);
  }

  passo(dt) {
    if (this.assets.acabou()) {
      for (const sprite of this.sprites) {
        sprite.passo(dt);
      }
    }
  }

  MudaEstado() {
    for (const sprite of this.sprites) {
      sprite.reposicionar();
    }
    this.criaSprite();
  }
  criaSprite() {
    let Invalido = 1;
    let xa, ya;
    while (Invalido == 1) {
      xa = Math.floor(Math.random() * 11 * 32) + 64;
      let mx = Math.floor(xa / this.mapa.SIZE);
      ya = Math.floor(Math.random() * 11 * 32) + 64;
      let my = Math.floor(ya / this.mapa.SIZE);

      if (mx < 20 && my < 20) {
        if (this.mapa.tiles[my][mx] != 1) {
          Invalido = 0;
        }
      }
    }
    let vxa = Math.floor(Math.random() * 11);
    let positivoOuNegativo = Math.floor(Math.random() * 10) + 1;
    vxa = vxa * Math.pow(-1, positivoOuNegativo);
    let vya = Math.floor(Math.random() * 11);
    positivoOuNegativo = Math.floor(Math.random() * 10) + 1;
    vya = vya * Math.pow(-1, positivoOuNegativo);
    const en1 = new Sprite({ x: xa, y: ya, w: 20, h: 20, vx: vxa, vy: vya, color: "red" });
    this.adicionar(en1);
  }

  quadro(t) {
    this.t0 = this.t0 ?? t;
    this.dt = (t - this.t0) / 1000;
    this.criar = this.dt + this.criar;
    if (this.criar > 4) {
      this.MudaEstado();
      this.criar = 0;
    }
    this.passo(this.dt);
    this.desenhar();
    this.checaColisao();
    this.removerSprites();

    if (this.rodando) {
      this.iniciar()
    };
    this.t0 = t;
  }

  iniciar() {
    this.rodando = true;
    this.idAnim = requestAnimationFrame((t) => {
      this.quadro(t);
    });
  }
  parar() {
    this.rodando = false;
    cancelAnimationFrame(this.idAnim);
    this.t0 = null;
    this.dt = 0;
  }
  checaColisao() {
    for (let a = 0; a < this.sprites.length - 1; a++) {
      const spriteA = this.sprites[a];
      for (let b = a + 1; b < this.sprites.length; b++) {
        const spriteB = this.sprites[b];
        if (spriteA.colidiuCom(spriteB)) {
          this.quandoColidir(spriteA, spriteB);
        }
      }
    }
  }
  quandoColidir(a, b) {
    if (!this.aRemover.includes(a)) {
      this.aRemover.push(a);
    }
    if (!this.aRemover.includes(b)) {
      this.aRemover.push(b);
    }
  }
  removerSprites() {
    for (let i = 0; i < this.aRemover.length; i++) {
      const alvo = this.aRemover[i];
      const idx = this.sprites.indexOf(alvo);
      if (idx >= 0) {
        this.sprites.splice(idx, 1);
      }
    }
    this.aRemover = [];
  }

  configuraMapa(mapa) {
    this.mapa = mapa;
    this.mapa.cena = this;
  }

  preparar() {
    this.sprites = [];
    this.aRemover = [];
    this.t0 = null;
    this.dt = 0;
    this.idAnim = null;
    this.mapa = null;
    this.criar = 0;
    this.rodando = true;
  }
}
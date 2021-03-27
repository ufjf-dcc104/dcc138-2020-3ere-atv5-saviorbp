export default class Sprite {

  constructor({
    x = 100,
    y = 100,
    vx = 0,
    vy = 0,
    w = 20,
    h = 20,
    color = "black",
    controlar = ()=>{},
    tags = [],
  } = {}) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.w = w;
    this.h = h;
    this.color = color;
    this.cena = null;
    this.mx = 0;
    this.my = 0;
    this.controlar = controlar;
    this.tags = new Set();
    tags.forEach((tag) => {
      this.tags.add(tags);
    });
  }
  desenhar(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    ctx.strokeStyle = this.color;
    ctx.strokeRect(
      this.mx * this.cena.mapa.SIZE,
      this.my * this.cena.mapa.SIZE,
      this.cena.mapa.SIZE,
      this.cena.mapa.SIZE
    );
  }

  controlar(dt){

  }

  mover(dt){
    this.x = this.x + this.vx * dt;
    this.y = this.y + this.vy * dt;
    this.mx = Math.floor(this.x / this.cena.mapa.SIZE);
    this.my = Math.floor(this.y / this.cena.mapa.SIZE);
  }
  passo(dt) {
    this.controlar(dt);
    this.mover(dt);
  }

  colidiuCom(outro) {
    return !(
      this.x - this.w / 2 > outro.x + outro.w / 2 ||
      this.x + this.w / 2 < outro.x - outro.w / 2 ||
      this.y - this.h / 2 > outro.y + outro.h / 2 ||
      this.y + this.h / 2 < outro.y - outro.h / 2
    );
  }
  aplicaRestricoes(dt) {
    this.aplicaRestricoesDireita(this.mx + 1, this.my - 1);
    this.aplicaRestricoesDireita(this.mx + 1, this.my);
    this.aplicaRestricoesDireita(this.mx + 1, this.my + 1);

    this.aplicaRestricoesEsquerda(this.mx - 1, this.my - 1);
    this.aplicaRestricoesEsquerda(this.mx - 1, this.my);
    this.aplicaRestricoesEsquerda(this.mx - 1, this.my + 1);

    this.aplicaRestricoesBaixo(this.mx + 1, this.my + 1);
    this.aplicaRestricoesBaixo(this.mx, this.my + 1);
    this.aplicaRestricoesBaixo(this.mx - 1, this.my + 1);

    this.aplicaRestricoesCima(this.mx + 1, this.my - 1);
    this.aplicaRestricoesCima(this.mx, this.my - 1);
    this.aplicaRestricoesCima(this.mx - 1, this.my - 1);
  }
  aplicaRestricoesDireita(pmx, pmy) {
    const SIZE = this.cena.mapa.SIZE;
    if (this.vx > 0) {
      if (this.cena.mapa.tiles[pmy][pmx] != 0) {
        const tile = {
          x: pmx * SIZE + SIZE / 2,
          y: pmy * SIZE + SIZE / 2,
          w: SIZE,
          h: SIZE
        };
        this.cena.ctx.strokeStyle = "white";
        this.cena.ctx.strokeRect(tile.x - SIZE / 2, tile.y - SIZE / 2, SIZE, SIZE)
        if (this.colidiuCom(tile)) {
          this.vx = 0;
          this.x = tile.x - tile.w / 2 - this.w / 2 - 1;
          this.cena.assets.play("bate");
        }
      }
    }
  }
  aplicaRestricoesEsquerda(pmx, pmy) {
    const SIZE = this.cena.mapa.SIZE;
    if (this.vx < 0) {
      if (this.cena.mapa.tiles[pmy][pmx] != 0) {
        const tile = {
          x: pmx * SIZE + SIZE / 2,
          y: pmy * SIZE + SIZE / 2,
          w: SIZE,
          h: SIZE
        };
        this.cena.ctx.strokeStyle = "white";
        this.cena.ctx.strokeRect(tile.x - SIZE / 2, tile.y - SIZE / 2, SIZE, SIZE)
        if (this.colidiuCom(tile)) {
          this.vx = 0;
          this.x = tile.x + tile.w / 2 + this.w / 2 + 1;
          this.cena.assets.play("bate");
        }
      }
    }
  }

  aplicaRestricoesBaixo(pmx, pmy) {
    const SIZE = this.cena.mapa.SIZE;
    if (this.vy > 0) {
      if (this.cena.mapa.tiles[pmy][pmx] != 0) {
        const tile = {
          x: pmx * SIZE + SIZE / 2,
          y: pmy * SIZE + SIZE / 2,
          w: SIZE,
          h: SIZE
        };
        this.cena.ctx.strokeStyle = "white";
        this.cena.ctx.strokeRect(tile.x - SIZE / 2, tile.y - SIZE / 2, SIZE, SIZE)
        if (this.colidiuCom(tile)) {
          this.vy = 0;
          this.y = tile.y - tile.h / 2 - this.h / 2 - 1;
          this.cena.assets.play("bate");
        }
      }
    }
  }
  aplicaRestricoesCima(pmx, pmy) {
    const SIZE = this.cena.mapa.SIZE;
    if (this.vy < 0) {
      if (this.cena.mapa.tiles[pmy][pmx] != 0) {
        const tile = {
          x: pmx * SIZE + SIZE / 2,
          y: pmy * SIZE + SIZE / 2,
          w: SIZE,
          h: SIZE
        };
        this.cena.ctx.strokeStyle = "white";
        this.cena.ctx.strokeRect(tile.x - SIZE / 2, tile.y - SIZE / 2, SIZE, SIZE)
        if (this.colidiuCom(tile)) {
          this.vy = 0;
          this.y = tile.y + tile.h / 2 + this.h / 2 + 1;
          this.cena.assets.play("bate");
        }
      }
    }
  }
  reposicionar() {
  
    let Invalido = 1;
    let xa, ya;
    while (Invalido === 1) {
      xa = Math.floor(Math.random() * 11 * 32) + 64;
      let mx = Math.floor(xa / this.cena.mapa.SIZE);
      ya = Math.floor(Math.random() * 11 * 32) + 64;
      let my = Math.floor(ya / this.cena.mapa.SIZE);
      if (mx < 15 && my < 15) {
        if (this.cena.mapa.tiles[my][mx] != 1) {
          Invalido = 0;
        }
      }
    }
    this.x = xa;
    this.y = ya;

    let vxa = Math.floor(Math.random() * 11);
    let positivoOuNegativo = Math.floor(Math.random() * 10) + 1;
    vxa = vxa * Math.pow(-1, positivoOuNegativo);
    let vya = Math.floor(Math.random() * 11);
    positivoOuNegativo = Math.floor(Math.random() * 10) + 1;
    vya = vya * Math.pow(-1, positivoOuNegativo);
    this.vx = vxa;
    this.vy = vya;
  }
}

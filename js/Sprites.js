export default class Sprite {

  constructor({
    x = 100,
    y = 100,
    vx = 0,
    vy = 0,
    w = 20,
    h = 20,
    color = "white",
    controlar = ()=>{},
    tags = [],
    assets = null,
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
    this.assets = assets;
    this.controlar = controlar;
    this.tags = new Set();
    tags.forEach((tag) => {
      this.tags.add(tag);
    });
  }
  desenhar(ctx) {
    if (this.tags.has("pc")) 
        {
            ctx.drawImage(this.assets.img("garota"), 0, 0, 50, 37, this.x - this.w / 2, this.y - this.h / 2, 50, 37);
        }
        else if (this.tags.has("enemy"))
        {
            ctx.drawImage(this.assets.img("skelly"), 0, 0, 30, 30, this.x - this.w / 2, this.y - this.h / 2, 30, 30);
        }
        else if (this.tags.has("estrela"))
        {
            ctx.drawImage(this.assets.img("estrela"), 0, 0, 30, 30, this.x - this.w / 2, this.y - this.h / 2, 30, 30);
        }
        else if (this.tags.has("bau"))
        {
            ctx.drawImage(this.assets.img("bau"), 0, 0, 30, 51, this.x - this.w / 2, this.y - this.h / 2, 30, 51);
        }
    //ctx.fillStyle = this.color;
    //ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
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
  aplicaRestrições(dt) {
    this.aplicaRestriçõesDireita(this.mx + 1, this.my);
    this.aplicaRestriçõesBaixo(this.mx, this.my + 1);
    this.aplicaRestriçõesEsquerda(this.mx - 1, this.my);
    this.aplicaRestriçõesCima(this.mx, this.my - 1);

    this.aplicaRestriçõesDireita(this.mx + 1, this.my - 1);
    this.aplicaRestriçõesDireita(this.mx + 1, this.my + 1);

    this.aplicaRestriçõesEsquerda(this.mx - 1, this.my - 1);
    this.aplicaRestriçõesEsquerda(this.mx - 1, this.my + 1);

    this.aplicaRestriçõesBaixo(this.mx + 1, this.my + 1);
    this.aplicaRestriçõesBaixo(this.mx - 1, this.my + 1);

    this.aplicaRestriçõesCima(this.mx + 1, this.my - 1);
    this.aplicaRestriçõesCima(this.mx - 1, this.my - 1);
  }
  aplicaRestriçõesDireita(pmx, pmy) {
    const SIZE = this.cena.mapa.SIZE;
    if (this.vx > 0) {
      if (this.cena.mapa.tiles[pmy][pmx] != 0) {
        const tile = {
          x: pmx * SIZE + SIZE / 2,
          y: pmy * SIZE + SIZE / 2,
          w: SIZE,
          h: SIZE
        };
        this.cena.ctx.strokeStyle = this.color;
        this.cena.ctx.strokeRect(tile.x - SIZE / 2, tile.y - SIZE / 2, SIZE, SIZE)
        if (this.colidiuCom(tile)) {
          this.vx = 0;
          this.x = tile.x - tile.w / 2 - this.w / 2 - 1;
        }
      }
      else {
        if (this.tags.has("pc")) {
            if (this.cena.mapa.tiles[pmy][pmx] == 2) {
                const tile = {
                    x: (pmx * SIZE) + (SIZE / 2),
                    y: (pmy * SIZE) + (SIZE / 2),
                    w: SIZE,
                    h: SIZE
                }
                if (this.colidiuCom(tile)) {
                    this.cena.mapa.tiles[pmy][pmx] = 0;
                    this.cena.game.ponto++;
                    this.cena.game.bau++;
                }
            }
        }
        if (this.cena.mapa.tiles[pmy][pmx] == 3) {
            const tile = {
                x: (pmx * SIZE) + (SIZE / 2),
                y: (pmy * SIZE) + (SIZE / 2),
                w: SIZE,
                h: SIZE
            }
            if (this.colidiuCom(tile)) {
                this.cena.game.ponto = this.cena.game.ponto + 2;
                this.cena.game.moeda++;
                this.cena.game.selecionaCena("jogo2");
            }
        }
    }
    }
  }
  aplicaRestriçõesEsquerda(pmx, pmy) {
    const SIZE = this.cena.mapa.SIZE;
    if (this.vx < 0) {
      if (this.cena.mapa.tiles[pmy][pmx] != 0) {
        const tile = {
          x: pmx * SIZE + SIZE / 2,
          y: pmy * SIZE + SIZE / 2,
          w: SIZE,
          h: SIZE
        };
        this.cena.ctx.strokeStyle = this.color;
        this.cena.ctx.strokeRect(tile.x - SIZE / 2, tile.y - SIZE / 2, SIZE, SIZE)
        if (this.colidiuCom(tile)) {
          this.vx = 0;
          this.x = tile.x + tile.w / 2 + this.w / 2 + 1;
        }
      }
      else {
        if (this.tags.has("pc")) {
            if (this.cena.mapa.tiles[pmy][pmx] == 2) {
                const tile = {
                    x: (pmx * SIZE) + (SIZE / 2),
                    y: (pmy * SIZE) + (SIZE / 2),
                    w: SIZE,
                    h: SIZE
                }
                if (this.colidiuCom(tile)) {
                    this.cena.mapa.tiles[pmy][pmx] = 0;
                    this.cena.game.ponto++;
                    this.cena.game.bau++;
                }
            }
        }
        if (this.cena.mapa.tiles[pmy][pmx] == 3) {
            const tile = {
                x: (pmx * SIZE) + (SIZE / 2),
                y: (pmy * SIZE) + (SIZE / 2),
                w: SIZE,
                h: SIZE
            }
            if (this.colidiuCom(tile)) {
                this.cena.game.ponto = this.cena.game.ponto + 2;
                this.cena.game.moeda++;
                this.cena.game.selecionaCena("jogo2");
            }
        }
    }
    }
  }

  aplicaRestriçõesBaixo(pmx, pmy) {
    const SIZE = this.cena.mapa.SIZE;
    if (this.vy > 0) {
      if (this.cena.mapa.tiles[pmy][pmx] != 0) {
        const tile = {
          x: pmx * SIZE + SIZE / 2,
          y: pmy * SIZE + SIZE / 2,
          w: SIZE,
          h: SIZE
        };
        this.cena.ctx.strokeStyle = this.color;
        this.cena.ctx.strokeRect(tile.x - SIZE / 2, tile.y - SIZE / 2, SIZE, SIZE)
        if (this.colidiuCom(tile)) {
          this.vy = 0;
          this.y = tile.y - tile.h / 2 - this.h / 2 - 1;
        }
      }
      else {
        if (this.tags.has("pc")) {
            if (this.cena.mapa.tiles[pmy][pmx] == 2) {
                const tile = {
                    x: (pmx * SIZE) + (SIZE / 2),
                    y: (pmy * SIZE) + (SIZE / 2),
                    w: SIZE,
                    h: SIZE
                }
                if (this.colidiuCom(tile)) {
                    this.cena.mapa.tiles[pmy][pmx] = 0;
                    this.cena.game.ponto++;
                    this.cena.game.bau++;
                }
            }
        }
        if (this.cena.mapa.tiles[pmy][pmx] == 3) {
            const tile = {
                x: (pmx * SIZE) + (SIZE / 2),
                y: (pmy * SIZE) + (SIZE / 2),
                w: SIZE,
                h: SIZE
            }
            if (this.colidiuCom(tile)) {
                this.cena.game.ponto = this.cena.game.ponto + 2;
                this.cena.game.moeda++;
                this.cena.game.selecionaCena("jogo2");
            }
        }
    }
    }
  }
  aplicaRestriçõesCima(pmx, pmy) {
    const SIZE = this.cena.mapa.SIZE;
    if (this.vy < 0) {
      if (this.cena.mapa.tiles[pmy][pmx] != 0) {
        const tile = {
          x: pmx * SIZE + SIZE / 2,
          y: pmy * SIZE + SIZE / 2,
          w: SIZE,
          h: SIZE
        };
        this.cena.ctx.strokeStyle = this.color;
        this.cena.ctx.strokeRect(tile.x - SIZE / 2, tile.y - SIZE / 2, SIZE, SIZE)
        if (this.colidiuCom(tile)) {
          this.vy = 0;
          this.y = tile.y + tile.h / 2 + this.h / 2 + 1;
        }
      }
      else {
        if (this.tags.has("pc")) {
            if (this.cena.mapa.tiles[pmy][pmx] == 2) {
                const tile = {
                    x: (pmx * SIZE) + (SIZE / 2),
                    y: (pmy * SIZE) + (SIZE / 2),
                    w: SIZE,
                    h: SIZE
                }
                if (this.colidiuCom(tile)) {
                    this.cena.mapa.tiles[pmy][pmx] = 0;
                    this.cena.game.ponto++;
                    this.cena.game.bau++;
                }
            }
        }
        if (this.cena.mapa.tiles[pmy][pmx] == 3) {
            const tile = {
                x: (pmx * SIZE) + (SIZE / 2),
                y: (pmy * SIZE) + (SIZE / 2),
                w: SIZE,
                h: SIZE
            }
            if (this.colidiuCom(tile)) {
                this.cena.game.ponto = this.cena.game.ponto + 2;
                this.cena.game.moeda++;
                this.cena.game.selecionaCena("jogo2");
            }
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
      if (mx < 20 && my < 20) {
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

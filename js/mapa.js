export default class Mapa {
  constructor(linhas = 20, colunas = 20, tamanho = 32) {
    this.LINHAS = linhas;
    this.COLUNAS = colunas;
    this.SIZE = tamanho;
    this.tiles = [];
    for (let l = 0; l < this.LINHAS; l++) {
      this.tiles[l] = [];
      for (let c = 0; c < this.COLUNAS; c++) {
        this.tiles[l][c] = 0;
      }
    }
    this.cena = null;
  }

  desenhar(ctx) {
    let img = new Image();
    img = this.cena.assets.img("textura");
    let linha = 11;
    let coluna = 23;
    let l1 = 14;
    let c1 = 9;
    let l2 = 14;
    let c2 = 8;
    let l3 = 14;
    let c3 = 10;
    let l4 = 26;
    let c4 = 20;
    let l5 = 26;
    let c5 = 21;
    let l6 = 26;
    let c6 = 22;
    let l7 = 27;
    let c7 = 22;
    let l8 = 28;
    let c8 = 22;
    let l9 = 28;
    let c9 = 21;
    let l10 = 28;
    let c10 = 20;
    let l11 = 27;
    let c11 = 20;
    for (let l = 0; l < this.LINHAS; l++) {
      for (let c = 0; c < this.COLUNAS; c++) {

        ctx.drawImage(img, coluna * 32, linha * 32, 32, 32,
          c * 32, l * 32, 32, 32);
        if (this.tiles[l][c] == 1) {
          ctx.drawImage(img, c1 * 32, l1 * 32, 32, 32,
            c * 32, l * 32, 32, 32);
        }
        if (this.tiles[l][c] == 2) {
          ctx.drawImage(img, c2 * 32, l2 * 32, 32, 32,
            c * 32, l * 32, 32, 32);
        }
        if (this.tiles[l][c] == 3) {
          ctx.drawImage(img, c3 * 32, l3 * 32, 32, 32,
            c * 32, l * 32, 32, 32);
        }
        if (this.tiles[l][c] == 4) {
          ctx.drawImage(img, c4 * 32, l4 * 32, 32, 32,
            c * 32, l * 32, 32, 32);
        }
        if (this.tiles[l][c] == 5) {
          ctx.drawImage(img, c5 * 32, l5 * 32, 32, 32,
            c * 32, l * 32, 32, 32);
        }
        if (this.tiles[l][c] == 6) {
          ctx.drawImage(img, c6 * 32, l6 * 32, 32, 32,
            c * 32, l * 32, 32, 32);
        } if (this.tiles[l][c] == 7) {
          ctx.drawImage(img, c7 * 32, l7 * 32, 32, 32,
            c * 32, l * 32, 32, 32);
        } if (this.tiles[l][c] == 8) {
          ctx.drawImage(img, c8 * 32, l8 * 32, 32, 32,
            c * 32, l * 32, 32, 32);
        } if (this.tiles[l][c] == 9) {
          ctx.drawImage(img, c9 * 32, l9 * 32, 32, 32,
            c * 32, l * 32, 32, 32);
        } if (this.tiles[l][c] == 10) {
          ctx.drawImage(img, c10 * 32, l10 * 32, 32, 32,
            c * 32, l * 32, 32, 32);
        } if (this.tiles[l][c] == 11) {
          ctx.drawImage(img, c11 * 32, l11 * 32, 32, 32,
            c * 32, l * 32, 32, 32);
        }
        /*ctx.strokeStyle = "gray";
        ctx.strokeRect(c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE);*/
      }
    }
  }

  carregaMapa(modelo) {
    this.LINHAS = modelo.length;
    this.COLUNAS = modelo[0]?.length ?? 0;

    this.tiles = [];
    for (let l = 0; l < this.LINHAS; l++) {
      this.tiles[l] = [];
      for (let c = 0; c < this.COLUNAS; c++) {
        this.tiles[l][c] = modelo[l][c];
      }
    }
  }
}

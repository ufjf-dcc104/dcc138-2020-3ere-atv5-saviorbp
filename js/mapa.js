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
    let l1 = 31;
    let c1 = 26;
    let l2 = 11;
    let c2 = 17;
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
        ctx.strokeStyle = "gray";
        ctx.strokeRect(c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE);
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

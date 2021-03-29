import Cena from "./Cena.js";
import Sprite from "./Sprites.js";
import Mapa from "./Mapa.js";
import modeloMapa1 from "../maps/mapa1.js";
import modeloMapa2 from "../maps/mapa2.js";

export default class CenaJogo extends Cena {
    quandoColidir(a, b) {
        if ((a.tags.has("pc") && b.tags.has("enemy")) ||
            (b.tags.has("pc") && a.tags.has("enemy"))) {
            this.game.selecionaCena("fim");
            this.assets.play("bate");
            if (!this.aRemover.includes(b)) {
                this.aRemover.push(b);
            }
            else{
                if(a.tags.has("enemy")&& b.tags.has("enemy"))
                {
                    this.assets.play("boom");
                    this.game.ponto++;
                    this.game.elimina++;
                }
    
            }
        }
    }

    preparar() {
        super.preparar();
        this.criar = 0;
        const mapa1 = new Mapa(20, 20, 32);
        if (this.modelo == 1) {
            mapa1.carregaMapa(modeloMapa1);
        }else{
            mapa1.carregaMapa(modeloMapa2);
        }
        this.configuraMapa(mapa1);

        const pc = new Sprite({ x: 50, y: 150, color: "blue", tags: ["pc"] });
        const cena = this;
        pc.controlar = function (dt) {
            if (cena.input.comandos.get("MOVE_ESQUERDA")) {
                this.vx = -50;
            } else if (cena.input.comandos.get("MOVE_DIREITA")) {
                this.vx = +50;
            } else if (cena.input.comandos.get("MOVE_CIMA")) {
                this.vy = -50;
            } else if (cena.input.comandos.get("MOVE_BAIXO")) {
                this.vy = +50;
            } else {
                this.vx = 0, this.vy = 0;
            }
        };

        this.adicionar(pc);

        function perseguePC(dt) {
            this.vx = 25 * Math.sign(pc.x - this.x);
            this.vy = 25 * Math.sign(pc.y - this.y);

        }

        const en1 = new Sprite({ x: 360, color: "orange", controlar: perseguePC, tags: ["enemy"] });

        this.adicionar(en1);

    }

    criaSprite() {
        let invalido = 1;
        let xa, ya;
        while (invalido == 1) {
            xa = Math.floor(Math.random() * 11 * 32) + 64;
            let mx = Math.floor(xa / this.mapa.SIZE);
            ya = Math.floor(Math.random() * 11 * 32) + 64;
            let my = Math.floor(ya / this.mapa.SIZE);

            if (mx < 20 && my < 20) {
                if (this.mapa.tiles[my][mx] != 1) {
                    invalido = 0;
                }
            }
        }
        let vxa = Math.floor(Math.random() * 11);
        let positivoOuNegativo = Math.floor(Math.random() * 10) + 1;
        vxa = vxa * Math.pow(-1, positivoOuNegativo);
        let vya = Math.floor(Math.random() * 11);
        positivoOuNegativo = Math.floor(Math.random() * 10) + 1;
        vya = vya * Math.pow(-1, positivoOuNegativo);
        const en1 = new Sprite({ x: xa, y: ya, w: 20, h: 20, vx: vxa, vy: vya, color: "red", tags: ["enemy"] });
        this.adicionar(en1);
    }
    mudaEstado() {
        //for (const sprite of this.sprites) {
        //sprite.reposicionar();
        //}
        this.criaSprite();
    }

    quadro(t) {
        this.t0 = this.t0 ?? t;
        this.dt = (t - this.t0) / 1000;
        this.criar = this.dt + this.criar;
        if (this.criar > 4) {
            this.mudaEstado();
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
}
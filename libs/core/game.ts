enum Direction {
    //% block=direita
    Right,
    //% block=esquerda
    Left
}

enum LedSpriteProperty {
    //% block=x
    X,
    //% block=y
    Y,
    //% block=direção
    Direction,
    //% block=brilho
    Brightness,
    //% block=Piscar
    Blink
}

/**
 * A single-LED sprite game engine
 */
//% color=#007A4B weight=32 icon="\uf11b"
//% advanced=true block="JOGO"
namespace game {
    let _score: number = 0;
    let _life: number = 3;
    let _startTime: number = 0;
    let _endTime: number = 0;
    let _isGameOver: boolean = false;
    let _countdownPause: number = 0;
    let _level: number = 1;
    let _gameId: number = 0;
    let _img: Image;
    let _sprites: LedSprite[];
    let _paused: boolean = false;
    let _backgroundAnimation = false; // indicates if an auxiliary animation (and fiber) is already running

    /**
    * Cria um novo ator de LED apontando para a direita.
    * @param x coordenada horizontal do ator, ex: 2
    * @param y coordenada vertical do ator, ex: 2
     */
    //% weight=60 blockGap=8 help=game/create-sprite
    //% blockId=game_create_sprite block="criar ator na posição|x: %x|y: %y"
    //% parts="ledmatrix"
    export function createSprite(x: number, y: number): LedSprite {
        init();
        let p = new LedSprite(x, y);
        return p;
    }

    /**
     * Pega a pontuação atual
     */
    //% weight=9 help=game/score
    //% blockId=game_score block="pontos" blockGap=8
    export function score(): number {
        return _score;
    }

    /**
     * Adiciona pontos à pontuação atual e exibe uma animação.
     * @param points quantidade de pontos para alterar, ex: 1
     */
    //% weight=10 help=game/add-score
    //% blockId=game_add_score block="alterar pontuação para|%points" blockGap=8
    //% parts="ledmatrix"
    export function addScore(points: number): void {
        setScore(_score + points);
        if (!_paused && !_backgroundAnimation) {
            _backgroundAnimation = true;
            control.inBackground(() => {
                led.stopAnimation();
                basic.showAnimation(`0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 1 1 1 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 1 1 1 0 0 0 1 0 0 0 0 0
    0 0 0 0 0 0 0 1 0 0 0 1 1 1 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 1 1 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0
    0 0 1 0 0 0 1 1 1 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 1 1 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 1 0 0 0 1 1 1 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 1 1 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 1 1 1 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 1 1 1 0 0 0 1 0 0 0 0 0`, 20);
                _backgroundAnimation = false;
            });
        }
    }

    /**
     * Mostra uma animação e, em seguida, inicia um cronômetro regressivo, que causa Game Over quando chega a 0.
     * @param ms duração do cronômetro regressivo em milissegundos, ex: 10000
     */
    //% weight=9 help=game/start-countdown
    //% blockId=game_start_countdown block="iniciar cronômetro regressivo|(ms) %duration" blockGap=8
    //% parts="ledmatrix"
    export function startCountdown(ms: number): void {
        if (checkStart()) {
            basic.showAnimation(`1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0
0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0
1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0
0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0
1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0`, 400);
            _countdownPause = Math.max(500, ms);
            _startTime = -1;
            _endTime = input.runningTime() + _countdownPause;
            _paused = false;
            control.inBackground(() => {
                basic.pause(_countdownPause);
                gameOver();
            });
        }
    }

   /**
     * Exibe uma animação de fim de jogo e a pontuação.
     */
    //% weight=8 help=game/game-over
    //% blockId=game_game_over block="fim de jogo"
    //% parts="ledmatrix"
    export function gameOver(): void {
        if (!_isGameOver) {
            _isGameOver = true;
            unplugEvents();
            led.stopAnimation();
            led.setBrightness(255);
            while (true) {
                for (let i = 0; i < 8; i++) {
                    basic.clearScreen();
                    basic.pause(100);
                    basic.showLeds(`1 1 1 1 1
1 1 1 1 1
1 1 1 1 1
1 1 1 1 1
1 1 1 1 1`, 300);
                }
                basic.showAnimation(`1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 1 1 1 0 0 1 1 0 0 0 1 0 0 0 0 0 0 0 0 0
1 1 1 1 1 1 1 1 1 1 1 1 1 0 1 1 1 0 0 1 1 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
1 1 0 1 1 1 0 0 0 1 1 0 0 0 1 1 0 0 0 1 1 0 0 0 1 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
1 1 1 1 1 1 1 1 1 1 1 0 1 1 1 1 0 0 1 1 1 0 0 0 1 1 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 1 1 1 1 0 0 1 1 1 0 0 0 1 1 0 0 0 0 1 0 0 0 0 0`, 100);
                for (let j = 0; j < 3; j++) {
                    basic.showString(" GAMEOVER ", 100);
                    showScore();
                }
            }
        } else {
            // already in game over mode in another fiber
            while (true) {
                basic.pause(10000);
            }
        }
    }

   /**
     * Define o valor atual da pontuação.
     * @param value novo valor da pontuação.
     */
    //% blockId=game_set_score block="definir pontuação %points" blockGap=8
    //% weight=10 help=game/set-score
    export function setScore(value: number): void {
        _score = Math.max(0, value);
    }

    /**
     * Pega o estado de vida atual
     */
    //% weight=10
    export function life(): number {
        return _life;
    }

   /**
    * Define o valor atual de vidas.
    * @param value valor atual de vidas.
    */
    //% weight=10 help=game/set-life
    //% blockId=game_set_life block="definir vida %value" blockGap=8
    export function setLife(value: number): void {
        _life = Math.max(0, value);
        if (_life <= 0) {
            gameOver();
        }
    }

   /**
     * Adiciona pontos de vida ao total atual.
     * @param lives quantidade de vidas a adicionar.
     */
    //% weight=10 help=game/add-life
    //% blockId=game_add_life block="adicionar vidas %lives" blockGap=8
    export function addLife(lives: number): void {
        setLife(_life + lives);
    }

    /**
    * Obtém o tempo restante (desde o início da contagem regressiva) ou o tempo atual (desde que o dispositivo foi iniciado ou desde o início do cronômetro) em milissegundos.
    */
    //% weight=10
    export function currentTime(): number {
        if (_endTime > 0) {
            return Math.max(0, _endTime - input.runningTime());
        } else {
            return input.runningTime() - _startTime;
        }
    }

    /**
     * Remove uma quantidade de vidas.
     * @param life quantidade de vidas a ser removida
     */
    //% weight=10 help=game/remove-life
    //% parts="ledmatrix"
    //% blockId=game_remove_life block="remover vida %life" blockGap=8
    export function removeLife(life: number): void {
        setLife(_life - life);
        if (!_paused && !_backgroundAnimation) {
            _backgroundAnimation = true;
            control.inBackground(() => {
                led.stopAnimation();
                basic.showAnimation(`1 0 0 0 1 0 0 0 0 0 1 0 0 0 1 0 0 0 0 0
0 1 0 1 0 0 0 0 0 0 0 1 0 1 0 0 0 0 0 0
0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0
0 1 0 1 0 0 0 0 0 0 0 1 0 1 0 0 0 0 0 0
1 0 0 0 1 0 0 0 0 0 1 0 0 0 1 0 0 0 0 0`, 40);
                _backgroundAnimation = false;
            });
        }
    }

    /**
    * Incrementa o nível e exibe uma mensagem.
     */
    //% weight=10
    //% parts="ledmatrix"
    export function levelUp(): void {
        _level = _level + 1;
        basic.showString("LEVEL:", 150);
        basic.showNumber(_level, 150);
    }

    /**
     * Pega o valor de level atual
     */
    //% weight=10
    export function level(): number {
        return _level;
    }

    /**
    * Inicia um cronômetro. `current time` retornará o tempo decorrido.
     */
    //% weight=10
    export function startStopwatch(): void {
        _startTime = input.runningTime();
        _endTime = -1;
    }

    /**
     * Indica se o jogo ainda está em andamento. Retorna `false` se o jogo estiver terminado ou pausado.
     */
    //% weight=5 help=game/is-running
    //% blockId=game_isrunning block="está em andamento" blockGap=8
    export function isRunning(): boolean {
        return !_isGameOver && !_paused && !!_img;
    }

    /**
    * Exibe a pontuação na tela.
     */
    //%  weight=60
    //% parts="ledmatrix"
    export function showScore(): void {
        basic.showString(" SCORE ", 100);
        basic.showNumber(_score, 150);
        basic.showString(" ", 150);
    }

    /**
     * Indica se o jogo acabou e exibe a sequência de game over.
     */
    //% weight=7 help=game/is-game-over
    //% blockId=game_isgameover block="jogo acabou" blockGap=8
    export function isGameOver(): boolean {
        return _isGameOver;
    }

    /**
     * Indica se a renderização do jogo está pausada para permitir outras animações.
     */
    //% weight=6 help=game/is-paused
    //% blockId=game_ispaused block="está pausado" blockGap=8
    export function isPaused(): boolean {
        return _paused;
    }

   /**
     * Indica se a renderização do jogo está pausada para permitir outras animações.
     */
    //% weight=6 help=game/is-paused
    //% blockId=game_ispaused block="jogo está pausado" blockGap=8
    export function pause(): void {
        plot()
        _paused = true;
    }


  /**
     * Retoma o mecanismo de renderização do jogo
     */
    //% blockId=game_resume block="continuar"
    //% advanced=true blockGap=8 help=game/resume
    export function resume(): void {
        _paused = false;
        plot();
    }

    /**
     * Retorna `false` se o jogo não puder ser iniciado.
     */
    function checkStart(): boolean {
        if (_countdownPause > 0 || _startTime > 0) {
            return false;
        } else {
            return true;
        }
    }

    function unplugEvents(): void {
        input.onButtonPressed(Button.A, () => { });
        input.onButtonPressed(Button.B, () => { });
        input.onButtonPressed(Button.AB, () => {
            control.reset();
        });
    }

    /**
     * Cria um ator do jogo renderizado como um único LED.
     */
    //%
    export class LedSprite {
        private _x: number;
        private _y: number;
        private _dir: number;
        private _brightness: number;
        private _blink: number;
        private _enabled: boolean;

        constructor(x: number, y: number) {
            this._x = Math.clamp(0, 4, x);
            this._y = Math.clamp(0, 4, y);
            this._dir = 90;
            this._brightness = 255;
            this._enabled = true;
            init();
            _sprites.push(this);
            plot();
        }

        /**
         * Move a certa quantidade de LEDs na direção atual.
         * @param sprite o ator a ser movido
         * @param leds número de LEDs a mover, ex: 1, -1
         */
        //% weight=50 help=game/move
        //% blockId=game_move_sprite block="%sprite(ator)|move por %leds" blockGap=8
        //% parts="ledmatrix"
        public move(leds: number): void {
            if (this._dir == 0) {
                this._y = this._y - leds;
            } else if (this._dir == 45) {
                this._x = this._x + leds;
                this._y = this._y - leds;
            } else if (this._dir == 90) {
                this._x = this._x + leds;
            } else if (this._dir == 135) {
                this._x = this._x + leds;
                this._y = this._y + leds;
            } else if (this._dir == 180) {
                this._y = this._y + leds;
            } else if (this._dir == -45) {
                this._x = this._x - leds;
                this._y = this._y - leds;
            } else if (this._dir == -90) {
                this._x = this._x - leds;
            } else {
                this._x = this._x - leds;
                this._y = this._y + leds;
            }
            this._x = Math.clamp(0, 4, this._x);
            this._y = Math.clamp(0, 4, this._y);
            plot();
        }

       /**
         * Vai para uma posição específica na tela.
         * @param sprite o ator a ser movido
         * @param x a posição horizontal (0-4)
         * @param y a posição vertical (0-4)
         */
        //% parts="ledmatrix"
        public goTo(x: number, y: number): void {
            this._x = x;
            this._y = y;
            this._x = Math.clamp(0, 4, this._x);
            this._y = Math.clamp(0, 4, this._y);
            plot();
        }

       /**
         * Se o ator estiver tocando a borda da tela e estiver indo na direção da borda, ele vira para o lado oposto.
         * @param sprite o ator a ser verificado para "quicar"
         */
        //% weight=18 help=game/if-on-edge-bounce
        //% blockId=game_sprite_bounce block="%sprite(ator)|se estiver na borda, voltar"
        //% parts="ledmatrix"
        public ifOnEdgeBounce(): void {
            if (this._dir == 0 && this._y == 0) {
                this._dir = 180;
            } else if (this._dir == 45 && (this._x == 4 || this._y == 0)) {
                if (this._x == 0 && this._y == 0) {
                    this._dir = -135;
                } else if (this._y == 0) {
                    this._dir = 135;
                } else {
                    this._dir = -45;
                }
            } else if (this._dir == 90 && this._x == 4) {
                this._dir = -90;
            } else if (this._dir == 135 && (this._x == 4 || this._y == 4)) {
                if (this.x() == 4 && this.y() == 4) {
                    this._dir = -45;
                } else if (this._y == 4) {
                    this._dir = 45;
                } else {
                    this._dir = -135;
                }
            } else if (this._dir == 180 && this._y == 4) {
                this._dir = 0;
            } else if (this._dir == -45 && (this._x == 0 || this._y == 0)) {
                if (this.x() == 0 && this.y() == 0) {
                    this._dir = 135;
                } else if (this._y == 0) {
                    this._dir = -135;
                } else {
                    this._dir = 45;
                }
            } else if (this._dir == -90 && this._x == 0) {
                this._dir = 90;
            } else if (this._dir == -135 && (this._x == 0 || this._y == 4)) {
                if (this._x == 0 && this._y == 4) {
                    this._dir = 45;
                } else if (this._y == 4) {
                    this._dir = -45;
                } else {
                    this._dir = 135;
                }
            }
            plot();
        }

       /**
         * Vira o ator
         * @param sprite o ator a ser virado
         * @param direction esquerda ou direita
         * @param degrees ângulo em graus para virar, ex: 45, 90, 180, 135
         */
        //% weight=49 help=game/turn
        //% blockId=game_turn_sprite block="%sprite(ator)|virar a %direction|em (°) %degrees"
        public turn(direction: Direction, degrees: number) {
            if (direction == Direction.Right)
                this.setDirection(this._dir + degrees);
            else
                this.setDirection(this._dir - degrees);
        }

       /**
         * Vira para a direita (horário)
         * @param sprite o ator a ser virado
         * @param degrees ângulo em graus para virar, ex: 45, 90, 180, 135
         */
        public turnRight(degrees: number): void {
            this.turn(Direction.Right, degrees);
        }

       /**
         * Vira para a esquerda (anti-horário)
         * @param sprite o ator a ser virado
         * @param degrees ângulo em graus para virar, ex: 45, 90, 180, 135
         */
        public turnLeft(degrees: number): void {
            this.turn(Direction.Left, degrees);
        }

     /**
     * Define uma propriedade do ator
     * @param property o nome da propriedade a ser alterada
     * @param value o valor atualizado
     */
    //% weight=29 help=game/set
    //% blockId=game_sprite_set_property block="%sprite(ator)|definir %property|para %value" blockGap=8
        public set(property: LedSpriteProperty, value: number) {
            switch (property) {
                case LedSpriteProperty.X: this.setX(value); break;
                case LedSpriteProperty.Y: this.setY(value); break;
                case LedSpriteProperty.Direction: this.setDirection(value); break;
                case LedSpriteProperty.Brightness: this.setBrightness(value); break;
                case LedSpriteProperty.Blink: this.setBlink(value); break;
            }
        }

       /**
         * Altera uma propriedade do ator
         * @param property o nome da propriedade a ser alterada
         * @param value a quantidade de alteração, ex: 1
         */
        //% weight=30 help=game/change
        //% blockId=game_sprite_change_xy block="%sprite(ator)|alterar %property|por %value" blockGap=8
        public change(property: LedSpriteProperty, value: number) {
            switch (property) {
                case LedSpriteProperty.X: this.changeXBy(value); break;
                case LedSpriteProperty.Y: this.changeYBy(value); break;
                case LedSpriteProperty.Direction: this.changeDirectionBy(value); break;
                case LedSpriteProperty.Brightness: this.changeBrightnessBy(value); break;
                case LedSpriteProperty.Blink: this.changeBlinkBy(value); break;
            }
        }

        /**
         * Obtém uma propriedade do ator
         * @param property o nome da propriedade a ser obtida
         */
        //% weight=28 help=game/get
        //% blockId=game_sprite_property block="%sprite(ator)|%property"
        public get(property: LedSpriteProperty) {
            switch (property) {
                case LedSpriteProperty.X: return this.x();
                case LedSpriteProperty.Y: return this.y();
                case LedSpriteProperty.Direction: return this.direction()
                case LedSpriteProperty.Brightness: return this.brightness();
                case LedSpriteProperty.Blink: return this.blink();
                default: return 0;
            }
        }

       /**
         * Define a direção do ator atual, arredondada para o múltiplo mais próximo de 45
         * @param this o ator para o qual definir a direção
         * @param degrees nova direção em graus
         */
        //% parts="ledmatrix"
        public setDirection(degrees: number): void {
            this._dir = (Math.floor(degrees / 45) % 8) * 45;
            if (this._dir <= -180) {
                this._dir = this._dir + 360;
            } else if (this._dir > 180) {
                this._dir = this._dir - 360;
            }
            plot();
        }

        /**
        * Relata a posição ``x`` de um ator na tela de LEDs
         * @param this TODO
         */
        public x(): number {
            return this._x;
        }

        /**
        * Relata a posição ``y`` de um ator na tela de LEDs
         * @param this TODO
         */ 
        public y(): number {
            return this._y;
        }

        /**
        * Relata a direção atual de um ator
         * @param this TODO
         */
        public direction(): number {
            return this._dir;
        }

        /**
        * Define a posição ``x`` de um ator
         * @param this TODO
         * @param x TODO
         */
        public setX(x: number): void {
            this.goTo(x, this._y);
        }

        /**
        * Define a posição ``y`` de um ator
         * @param this TODO
         * @param y TODO
         */
        public setY(y: number): void {
            this.goTo(this._x, y);
        }

        /**
        * Altera a posição ``y`` pelo valor fornecido
         * @param this TODO
         * @param y TODO
         */
        public changeYBy(y: number): void {
            this.goTo(this._x, this._y + y);
        }

        /**
        * Altera a posição ``x`` pelo valor fornecido
         * @param this TODO
         * @param x TODO
         */
        public changeXBy(x: number): void {
            this.goTo(this._x + x, this._y);
        }

       /**
         * Retorna verdadeiro se o ator estiver na mesma posição que o ator especificado
         * @param this o ator para verificar sobreposição ou toque
         * @param other o outro ator para verificar sobreposição ou toque
         */
        //% weight=20 help=game/is-touching
        //% blockId=game_sprite_touching_sprite block="o %sprite(ator)|está tocando %other" blockGap=8
        public isTouching(other: LedSprite): boolean {
            return this._enabled && other._enabled && this._x == other._x && this._y == other._y;
        }

       /**
         * Retorna verdadeiro se o ator estiver tocando a borda
         * @param this o ator para verificar contato com a borda
         */
        //% weight=19 help=game/is-touching-edge
        //% blockId=game_sprite_touching_edge block="o %sprite(ator)|está tocando a borda" blockGap=8
        public isTouchingEdge(): boolean {
            return this._enabled && (this._x == 0 || this._x == 4 || this._y == 0 || this._y == 4);
        }

        /**
         * Liga o ator (ligado por padrão)
        * @param this o ator
         */
        public on(): void {
            this.setBrightness(255);
        }

        /**
         * Desliga o ator (ligado por padrão)
         * @param this o ator
         */
        public off(): void {
            this.setBrightness(0);
        }

        /**
         * Define o ``brilho`` de um ator
        * @param this o ator
        * @param brilho o brilho de 0 (desligado) a 255 (ligado), por exemplo: 255.tness the brightness from 0 (off) to 255 (on), eg: 255.
         */
        //% parts="ledmatrix"
        public setBrightness(brightness: number): void {
            this._brightness = Math.clamp(0, 255, brightness);
            plot();
        }

       /**
         * Informa o ``brilho`` de um ator na tela de LED
         * @param this o ator
         */
        //% parts="ledmatrix"
        public brightness(): number {
            let r: number;
            return this._brightness;
        }

        /**
         * Altera a posição ``y`` pela quantidade dada
         * @param this o ator
         * @param value o valor para alterar o brilho
         */
        public changeBrightnessBy(value: number): void {
            this.setBrightness(this._brightness + value);
        }

       /**
         * Altera a posição da ``direção`` pela quantidade dada, girando para a direita
         * @param this TODO
         * @param angle TODO
         */
        public changeDirectionBy(angle: number): void {
            this.turnRight(angle);
        }

        /**
         * Exclui o ator do mecanismo de jogo. O ator não aparecerá mais na tela nem interagirá com outros atores.
         * @param this ator a ser excluído
         */
        //% weight=59 blockGap=8 help=game/delete
        //% blockId="game_delete_sprite" block="apaga %this(ator)"
        public delete(): void {
            this._enabled = false;
            if (_sprites.removeElement(this))
                plot();
        }

        /**
        * Informa se o ator foi excluído do mecanismo de jogo.
         */
        //% weight=58 help=game/is-deleted
        //% blockId="game_sprite_is_deleted" block="foi excluido? %sprite(ator)"
        public isDeleted(): boolean {
            return !this._enabled;
        }

        /**
        * Define o intervalo de duração do piscar em milissegundos.
         * @param sprite TODO
         * @param ms TODO
         */
        public setBlink(ms: number): void {
            this._blink = Math.clamp(0, 10000, ms);
        }

        /**
        * Altera a duração do ``piscar`` pela quantidade de milissegundos fornecida.
         * @param this TODO
         * @param ms TODO
         */
        public changeBlinkBy(ms: number): void {
            this.setBlink(this._blink + ms);
        }

        /**
        * Relata a duração do ``piscar`` de um ator.
         * @param this TODO
         */
        public blink(): number {
            return this._blink;
        }

        //% weight=-1
        //% parts="ledmatrix"
        public _plot(now: number) {
            let ps = this
            if (ps._brightness > 0) {
                let r = 0;
                if (ps._blink > 0) {
                    r = Math.floor(now / ps._blink) % 2;
                }
                if (r == 0) {
                    _img.setPixelBrightness(ps._x, ps._y, _img.pixelBrightness(ps._x, ps._y) + ps._brightness);
                }
            }
        }
    }

    function init(): void {
        if (_img) return;
        const img = images.createImage(
`0 0 0 0 0
0 0 0 0 0
0 0 0 0 0
0 0 0 0 0
0 0 0 0 0`);
        _sprites = (<LedSprite[]>[]);
        basic.forever(() => {
            basic.pause(30);
            plot();
            if (game.isGameOver()) {
                basic.pause(600);
            }
        });
        _img = img;
    }

    /**
    * Exibe os atores atuais na tela.
     */
    //% parts="ledmatrix"
    function plot(): void {
        if (game.isGameOver() || game.isPaused() || !_img || _backgroundAnimation) {
            return;
        }
        // ensure greyscale mode
        const dm = led.displayMode();
        if (dm != DisplayMode.Greyscale)
            led.setDisplayMode(DisplayMode.Greyscale);
        // render sprites
        const now = input.runningTime();
        _img.clear();
        for (let i = 0; i < _sprites.length; i++) {
            _sprites[i]._plot(now);
        }
        _img.plotImage(0);
    }

    /**
    * Obtém um ator inválido; usado para inicializar variáveis locais.
     */
    //% weight=0
    export function invalidSprite(): LedSprite {
        return null;
    }

}


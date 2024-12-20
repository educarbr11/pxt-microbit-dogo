namespace music {
    export enum PlaybackMode {
        //% block="até terminar"
        UntilDone,
        //% block="em segundo plano"
        InBackground,
        //% block="looping em segundo plano"
        LoopingInBackground
    }

    let looping: Playable[];

    export class Playable {
        stopped: boolean;
        constructor() {

        }

        _play(playbackMode: PlaybackMode) {
            // subclass
        }

        loop() {
            if (!looping) {
                looping = [];
            }

            looping.push(this);
            this.stopped = false;

            control.runInParallel(() => {
                while (!this.stopped) {
                    this._play(PlaybackMode.UntilDone);
                }
            });
        }
    }

    export class StringArrayPlayable extends Playable {
        constructor(private notes: string[], private tempo: number) {
            super();
        }

        _play(playbackMode: PlaybackMode) {
            if(this.tempo) {
                music.setTempo(this.tempo);
            }
            if (playbackMode == PlaybackMode.InBackground) {
                startMelodyInternal(this.notes, MelodyOptions.OnceInBackground);
            }
            else if (playbackMode == PlaybackMode.LoopingInBackground) {
                startMelodyInternal(this.notes, MelodyOptions.ForeverInBackground);
            }
            else {
                startMelodyInternal(this.notes, MelodyOptions.Once);
                waitForMelodyEnd();
            }
        }
    }

    export class TonePlayable extends Playable {
        constructor(public pitch: number, public duration: number) {
            super();
        }

        _play(playbackMode: PlaybackMode) {
            if (playbackMode === PlaybackMode.InBackground) {
                control.runInParallel(() => music.playTone(this.pitch, this.duration));
            }
            else if (playbackMode === PlaybackMode.UntilDone) {
                music.playTone(this.pitch, this.duration);
            }
            else {
                this.loop();
            }
        }
    }

    /**
     * Toque uma música, melodia ou outro som. A música toca até terminar ou pode tocar como uma tarefa em segundo plano.
     * background task.
     * @param toPlay o som ou melodia a tocar 
     * @param playbackMode toque a música ou melodia até terminar ou como tarefa em segundo plano
     */
    //% blockId="music_playable_play"
    //% block="reproduzir $toPlay $playbackMode"
    //% toPlay.shadow=music_string_playable
    //% group="Melodia"
    //% help="music/play"
    //% blockHidden
    export function play(toPlay: Playable, playbackMode: PlaybackMode) {
        toPlay._play(playbackMode);
    }

    //% blockId="music_playable_play_default_bkg"
    //% block="reproduzir $toPlay $playbackMode"
    //% toPlay.shadow=music_string_playable
    //% playbackMode.defl=music.PlaybackMode.InBackground
    //% group="Melodia"
    //% help="music/play"
    //% blockHidden
    export function _playDefaultBackground(toPlay: Playable, playbackMode: PlaybackMode) {
        return play(toPlay, playbackMode);
    }

    /**
     * Play a melody from the melody editor
     * @param melody string of up to eight notes [C D E F G A B C5] or rests [-] separated by spaces, which will be played one at a time, ex: "E D G F B A C5 B "
     * @param bpm number in beats per minute dictating how long each note will play
     */
    //% blockId="music_string_playable"
    //% block="melodia $melody no tempo $bpm|(bpm)"
    //% weight=85 blockGap=8
    //% help=music/string-playable
    //% group="Melodia"
    //% toolboxParent=music_playable_play
    //% toolboxParentArgument=toPlay
    //% duplicateShadowOnDrag
    //% melody.shadow=melody_editor
    //% bpm.min=40 bpm.max=500
    //% bpm.defl=120
    export function stringPlayable(melody: string, bpm: number): Playable {
        return new StringArrayPlayable(music.getMelodyNotes(melody), bpm);
    }

    /**
     * Reproduz um tom através do pino ``P0`` pela duração determinada.
     * @param note altura do tom a ser reproduzido em Hertz (Hz).
     * @param duration duração do tom em milissegundos (ms)
     */
    //% blockId="music_tone_playable"
    //% block="nota musical $note por $duration"
    //% toolboxParent=music_playable_play
    //% toolboxParentArgument=toPlay
    //% group="Nota Musical"
    //% weight=85
    //% duplicateShadowOnDrag
    //% note.shadow=device_note
    //% duration.shadow=device_beat
    //% parts="headphone"
    //% help=music/tone-playable
    export function tonePlayable(note: number, duration: number): Playable {
        return new TonePlayable(note, duration);
    }

    export function _stopPlayables() {
        if (!looping) return;

        for (const p of looping) {
            p.stopped = true;
        }
        looping = undefined;
    }
}
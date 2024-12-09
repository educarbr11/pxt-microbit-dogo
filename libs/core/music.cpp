#include "pxt.h"

namespace pins {
    void analogSetPitchVolume(int volume);
    int analogPitchVolume();
}

namespace music {
/**
 * Define a intensidade do volume de 0 até 255
 * @param volume o volume de 0 até 255
 */
//% blockId=synth_set_volume block="definir volume %volume"
//% volume.min=0 volume.max=255
//% volume.defl=127
//% help=music/set-volume
//% weight=70
//% group="Volume"
//% blockGap=8
void setVolume(int volume) {
#if MICROBIT_CODAL
    uBit.audio.setVolume(max(0, min(255, volume)));
#else
    pins::analogSetPitchVolume(volume);
#endif
}

/**
 * Retorna o volume de saída atual do sintetizador de som.
 */
//% blockId=synth_get_volume block="volume"
//% help=music/volume
//% weight=69
//% group="Volume"
//% blockGap=8
int volume() {
#if MICROBIT_CODAL
    return uBit.audio.getVolume();
#else
    return pins::analogPitchVolume();
#endif
}

/**
* Ligue ou desligue o alto-falante integrado.
* Desativar o alto-falante redefine o pino de som para o padrão P0.
* @param enabled se o alto-falante embutido está habilitado além do pino de som
*/
//% blockId=music_set_built_in_speaker_enable block="definir alto-falante embutido $enabled"
//% group="micro:bit (V2)"
//% parts=builtinspeaker
//% help=music/set-built-in-speaker-enabled
//% enabled.shadow=toggleOnOff
//% weight=0
void setBuiltInSpeakerEnabled(bool enabled) {
#if MICROBIT_CODAL
    uBit.audio.setSpeakerEnabled(enabled);
#else
    // don't crash if user asks to turn it off
    if (enabled) {
        target_panic(PANIC_VARIANT_NOT_SUPPORTED);
    }
#endif
}

/**
* Verifique se algum som está sendo reproduzido, independentemente da fonte
*/
//% blockId=music_sound_is_playing block="som tocando"
//% group="micro:bit (V2)"
//% help=music/is-sound-playing
//% weight=0
bool isSoundPlaying() {
#if MICROBIT_CODAL
    if (uBit.audio.mixer.getSilenceStartTime() == 0) {
        return false;
    } else {
        return uBit.audio.isPlaying();
    }

#else
    target_panic(PANIC_VARIANT_NOT_SUPPORTED);
#endif
}

/**
 * Defines an optional sample level to generate during periods of silence.
 **/
//% group="micro:bit (V2)"
//% help=music/set-silence-level
//% level.min=0
//% level.max=1024
//% level.defl=0
//% weight=1
void setSilenceLevel(int level) {
#if MICROBIT_CODAL
    uBit.audio.mixer.setSilenceLevel(level);
#else
    // this is an optimization
    // ignore in V1
#endif
}

}
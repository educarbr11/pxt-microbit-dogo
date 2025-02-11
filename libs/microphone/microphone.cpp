#include "pxt.h"

#if MICROBIT_CODAL
#include "LevelDetector.h"
#include "LevelDetectorSPL.h"
#endif

#define MICROPHONE_MIN 52.0f
#define MICROPHONE_MAX 120.0f

enum class DetectedSound {
    //% block="forte"
    Loud = 2,
    //% block="silencioso"
    Quiet = 1
};

enum class SoundThreshold {
    //% block="forte"
    Loud = 2,
    //% block="silencioso"
    Quiet = 1
};
namespace input {

/**
* Registra um evento que é executado quando um som é detectado
*/
//% help=input/on-sound
//% blockId=input_on_sound block="quando o som estiver %sound"
//% parts="microphone"
//% weight=88 blockGap=12
//% group="micro:bit (V2)"
void onSound(DetectedSound sound, Action handler) {
#if MICROBIT_CODAL
    uBit.audio.levelSPL->activateForEvents(true);
    const auto thresholdType = sound == DetectedSound::Loud ? LEVEL_THRESHOLD_HIGH : LEVEL_THRESHOLD_LOW;
    registerWithDal(DEVICE_ID_SYSTEM_LEVEL_DETECTOR, thresholdType, handler);
#else
    target_panic(PANIC_VARIANT_NOT_SUPPORTED);
#endif
}

/**
* Lê o volume através do microfone de 0 (silencioso) a 255 (alto)
*/
//% help=input/sound-level
//% blockId=device_get_sound_level block="nível do som"
//% parts="microphone"
//% weight=34 blockGap=8
//% group="micro:bit (V2)"
int soundLevel() {
#if MICROBIT_CODAL
    LevelDetectorSPL* level = uBit.audio.levelSPL;
    if (NULL == level)
        return 0;
    const int micValue = level->getValue();
    const int scaled = max(MICROPHONE_MIN, min(micValue, MICROPHONE_MAX)) - MICROPHONE_MIN;
    return min(0xff, scaled * 0xff / (MICROPHONE_MAX - MICROPHONE_MIN));
#else
    target_panic(PANIC_VARIANT_NOT_SUPPORTED);
    return 0;
#endif
}

/**
* Sets the threshold for a sound type.
*/
//% help=input/set-sound-threshold
//% blockId=input_set_sound_threshold block="definir som %sound no limite %value"
//% parts="microphone"
//% threshold.min=0 threshold.max=255 threshold.defl=128
//% weight=14 blockGap=8
//% advanced=false
//% group="micro:bit (V2)"
void setSoundThreshold(SoundThreshold sound, int threshold) {
#if MICROBIT_CODAL
    LevelDetectorSPL* level = uBit.audio.levelSPL;
    if (NULL == level)
        return;

    threshold = max(0, min(0xff, threshold));
    const int scaled = MICROPHONE_MIN + threshold * (MICROPHONE_MAX - MICROPHONE_MIN) / 0xff;
    if (SoundThreshold::Loud == sound)
        level->setHighThreshold(scaled);
    else
        level->setLowThreshold(scaled);
#else
    target_panic(PANIC_VARIANT_NOT_SUPPORTED);
#endif
}
}
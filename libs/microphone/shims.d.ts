// Auto-generated. Do not edit.
declare namespace input {

    /**
     * Registra um evento que é executado quando um som é detectado
     */
    //% help=input/on-sound
    //% blockId=input_on_sound block="quando o som estiver %sound"
    //% parts="microphone"
    //% weight=88 blockGap=12
    //% group="micro:bit (V2)" shim=input::onSound
    function onSound(sound: DetectedSound, handler: () => void): void;

    /**
     * Reads the loudness through the microphone from 0 (silent) to 255 (loud)
     */
    //% help=input/sound-level
    //% blockId=device_get_sound_level block="sound level"
    //% parts="microphone"
    //% weight=34 blockGap=8
    //% group="micro:bit (V2)" shim=input::soundLevel
    function soundLevel(): int32;

    /**
     * Sets the threshold for a sound type.
     */
    //% help=input/set-sound-threshold
    //% blockId=input_set_sound_threshold block="definir som %sound no limite %value"
    //% parts="microphone"
    //% threshold.min=0 threshold.max=255
    //% weight=14 blockGap=8
    //% advanced=false
    //% group="micro:bit (V2)" threshold.defl=128 shim=input::setSoundThreshold
    function setSoundThreshold(sound: SoundThreshold, threshold?: int32): void;
}

// Auto-generated. Do not edit. Really.

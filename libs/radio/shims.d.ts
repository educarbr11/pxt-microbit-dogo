// Auto-generated. Do not edit.



    //% color=#E3008C weight=96 icon="\uf012"
declare namespace radio {

    /**
     * Disables the radio for use as a multipoint sender/receiver.
     * Disabling radio will help conserve battery power when it is not in use.
     */
    //% help=radio/off shim=radio::off
    function off(): void;

    /**
     * Initialises the radio for use as a multipoint sender/receiver
     * Only useful when the radio.off() is used beforehand.
     */
    //% help=radio/on shim=radio::on
    function on(): void;

    /**
     * Envia um evento via rádio para dispositivos vizinhos.
     */
    //% blockId=radioRaiseEvent block="rádio: enviar evento|da fonte %src=control_event_source_id|com valor %value=control_event_value_id"
    //% blockExternalInputs=1
    //% advanced=false
    //% weight=1
    //% help=radio/raise-event shim=radio::raiseEvent
    function raiseEvent(src: int32, value: int32): void;

    /**
     * Internal use only. Takes the next packet from the radio queue and returns its contents + RSSI in a Buffer.
     * @returns NULL if no packet available
     */
    //% shim=radio::readRawPacket
    function readRawPacket(): Buffer;

    /**
     * Internal use only. Sends a raw packet through the radio (assumes RSSI appened to packet)
     */
    //% async shim=radio::sendRawPacket
    function sendRawPacket(msg: Buffer): void;

    /**
     * Used internally by the library.
     */
    //% help=radio/on-data-received
    //% weight=0
    //% blockId=radio_datagram_received_event block="radio on data received" blockGap=8
    //% deprecated=true blockHidden=1 shim=radio::onDataReceived
    function onDataReceived(body: () => void): void;

    /**
     * Define o ID do grupo para comunicações por rádio. Um micro:bit só pode escutar um ID de grupo por vez.
     * @param id o ID do grupo, entre ``0`` e ``255``, ex: 1
     */
    //% help=radio/set-group
    //% weight=100
    //% blockId=radio_set_group block="definir canal de rádio %ID"
    //% id.min=0 id.max=255
    //% group="CANAL" shim=radio::setGroup
    function setGroup(id: int32): void;

    /**
     * Alterar o nível de potência de saída do transmissor para o valor especificado.
     * @param power um valor na faixa de 0 a 7, onde 0 é a potência mais baixa e 7 é a mais alta. ex: 7
     */
    //% help=radio/set-transmit-power
    //% weight=9 blockGap=8
    //% blockId=radio_set_transmit_power block="rádio: configurar potência de transmissão %power"
    //% power.min=0 power.max=7
    //% advanced=false shim=radio::setTransmitPower
    function setTransmitPower(power: int32): void;

    /**
     * Altere a banda de transmissão e recepção do rádio para o canal especificado.
     * @param band uma banda de frequência na faixa de 0 a 83. Cada passo equivale a 1MHz, começando em 2400MHz.
     **/
    //% help=radio/set-frequency-band
    //% weight=8 blockGap=8
    //% blockId=radio_set_frequency_band block="rádio: configurar banda de frequência %band"
    //% band.min=0 band.max=83
    //% advanced=false shim=radio::setFrequencyBand
    function setFrequencyBand(band: int32): void;
}

// Auto-generated. Do not edit. Really.

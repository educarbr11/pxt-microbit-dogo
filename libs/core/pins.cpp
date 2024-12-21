#include "pxt.h"

#if MICROBIT_CODAL
#include "Pin.h"
#define PinCompat codal::Pin
#undef Button               // need to get codal Button back in scope here
#include "MicroBitButton.h" // this include is missing in MicroBit.h from codal-microbit-v2 when DEVICE_BLE=0
#else
#define PinCompat MicroBitPin
#endif

enum class DigitalPin {
    //% blockIdentity="pins._digitalPin"
    P0 = MICROBIT_ID_IO_P0,
    //% blockIdentity="pins._digitalPin"
    P1 = MICROBIT_ID_IO_P1,
    //% blockIdentity="pins._digitalPin"
    P2 = MICROBIT_ID_IO_P2,
    //% blockIdentity="pins._digitalPin"
    P3 = MICROBIT_ID_IO_P3,
    //% blockIdentity="pins._digitalPin"
    P4 = MICROBIT_ID_IO_P4,
    //% blockIdentity="pins._digitalPin"
    P5 = MICROBIT_ID_IO_P5,
    //% blockIdentity="pins._digitalPin"
    P6 = MICROBIT_ID_IO_P6,
    //% blockIdentity="pins._digitalPin"
    P7 = MICROBIT_ID_IO_P7,
    //% blockIdentity="pins._digitalPin"
    P8 = MICROBIT_ID_IO_P8,
    //% blockIdentity="pins._digitalPin"
    P9 = MICROBIT_ID_IO_P9,
    //% blockIdentity="pins._digitalPin"
    P10 = MICROBIT_ID_IO_P10,
    //% blockIdentity="pins._digitalPin"
    P11 = MICROBIT_ID_IO_P11,
    //% blockIdentity="pins._digitalPin"
    P12 = MICROBIT_ID_IO_P12,
    //% blockIdentity="pins._digitalPin"
    P13 = MICROBIT_ID_IO_P13,
    //% blockIdentity="pins._digitalPin"
    P14 = MICROBIT_ID_IO_P14,
    //% blockIdentity="pins._digitalPin"
    P15 = MICROBIT_ID_IO_P15,
    //% blockIdentity="pins._digitalPin"
    P16 = MICROBIT_ID_IO_P16,
    //% blockIdentity="pins._digitalPin"
    //% blockHidden=1
    P19 = MICROBIT_ID_IO_P19,
    //% blockIdentity="pins._digitalPin"
    //% blockHidden=1
    P20 = MICROBIT_ID_IO_P20,
};

enum class AnalogPin {
    //% blockIdentity="pins._analogPin"
    P0 = MICROBIT_ID_IO_P0,
    //% blockIdentity="pins._analogPin"
    P1 = MICROBIT_ID_IO_P1,
    //% blockIdentity="pins._analogPin"
    P2 = MICROBIT_ID_IO_P2,
    //% blockIdentity="pins._analogPin"
    P3 = MICROBIT_ID_IO_P3,
    //% blockIdentity="pins._analogPin"
    P4 = MICROBIT_ID_IO_P4,
    //% blockIdentity="pins._analogPin"
    P5 = MICROBIT_ID_IO_P5,
    //% blockIdentity="pins._analogPin"
    P6 = MICROBIT_ID_IO_P6,
    //% blockIdentity="pins._analogPin"
    P7 = MICROBIT_ID_IO_P7,
    //% blockIdentity="pins._analogPin"
    P8 = MICROBIT_ID_IO_P8,
    //% blockIdentity="pins._analogPin"
    P9 = MICROBIT_ID_IO_P9,
    //% blockIdentity="pins._analogPin"
    P10 = MICROBIT_ID_IO_P10,
    //% blockIdentity="pins._analogPin"
    P11 = MICROBIT_ID_IO_P11,
    //% blockIdentity="pins._analogPin"
    P12 = MICROBIT_ID_IO_P12,
    //% blockIdentity="pins._analogPin"
    P13 = MICROBIT_ID_IO_P13,
    //% blockIdentity="pins._analogPin"
    P14 = MICROBIT_ID_IO_P14,
    //% blockIdentity="pins._analogPin"
    P15 = MICROBIT_ID_IO_P15,
    //% blockIdentity="pins._analogPin"
    P16 = MICROBIT_ID_IO_P16,
    //% blockIdentity="pins._analogPin"
    //% blockHidden=1
    P19 = MICROBIT_ID_IO_P19,
    //% blockIdentity="pins._analogPin"
    //% blockHidden=1
    P20 = MICROBIT_ID_IO_P20
};

enum class PulseValue {
    //% block=high
    High = MICROBIT_PIN_EVT_PULSE_HI,
    //% block=low
    Low = MICROBIT_PIN_EVT_PULSE_LO
};

enum class PinPullMode {
    //% block="down"
    PullDown = 0,
    //% block="up"
    PullUp = 1,
    //% block="none"
    PullNone = 2
};

enum class PinEventType {
    //% block="edge"
    Edge = MICROBIT_PIN_EVENT_ON_EDGE,
    //% block="pulse"
    Pulse = MICROBIT_PIN_EVENT_ON_PULSE,
    //% block="touch"
    Touch = MICROBIT_PIN_EVENT_ON_TOUCH,
    //% block="none"
    None = MICROBIT_PIN_EVENT_NONE
};


namespace pxt
{
MicroBitPin *getPin(int id) {
    switch (id) {
        case MICROBIT_ID_IO_P0: return &uBit.io.P0;
        case MICROBIT_ID_IO_P1: return &uBit.io.P1;
        case MICROBIT_ID_IO_P2: return &uBit.io.P2;
        case MICROBIT_ID_IO_P3: return &uBit.io.P3;
        case MICROBIT_ID_IO_P4: return &uBit.io.P4;
        case MICROBIT_ID_IO_P5: return &uBit.io.P5;
        case MICROBIT_ID_IO_P6: return &uBit.io.P6;
        case MICROBIT_ID_IO_P7: return &uBit.io.P7;
        case MICROBIT_ID_IO_P8: return &uBit.io.P8;
        case MICROBIT_ID_IO_P9: return &uBit.io.P9;
        case MICROBIT_ID_IO_P10: return &uBit.io.P10;
        case MICROBIT_ID_IO_P11: return &uBit.io.P11;
        case MICROBIT_ID_IO_P12: return &uBit.io.P12;
        case MICROBIT_ID_IO_P13: return &uBit.io.P13;
        case MICROBIT_ID_IO_P14: return &uBit.io.P14;
        case MICROBIT_ID_IO_P15: return &uBit.io.P15;
        case MICROBIT_ID_IO_P16: return &uBit.io.P16;
        case MICROBIT_ID_IO_P19: return &uBit.io.P19;
        case MICROBIT_ID_IO_P20: return &uBit.io.P20;
#if MICROBIT_CODAL
        case 1001: return &uBit.io.usbTx;
        case 1002: return &uBit.io.usbRx;
#endif
        default: return NULL;
    }
}

} // pxt

namespace pins {
    #define PINOP(op) \
      MicroBitPin *pin = getPin((int)name); \
      if (!pin) return; \
      pin->op

    #define PINREAD(op) \
      MicroBitPin *pin = getPin((int)name); \
      if (!pin) return 0; \
      return pin->op


    //%
    MicroBitPin *getPinAddress(int id) {
        return getPin(id);
    }

    /**
     * Leia o pino ou conector especificado como 0 ou 1
     * @param name pin to read from, eg: DigitalPin.P0
     */
    //% help=pins/digital-read-pin weight=30
    //% blockId=device_get_digital_pin block="ler pino digital %name" blockGap=8
    //% name.shadow=digital_pin_shadow
    int digitalReadPin(int name) {
        PINREAD(getDigitalValue());
    }

   /**
    * Define o valor de um pino ou conector como 0 ou 1.
    * @param name pino para escrever o valor, ex: DigitalPin.P0
    * @param value valor a ser definido no pino, 1 ex, 0
    */
    //% help=pins/digital-write-pin weight=29
    //% blockId=device_set_digital_pin block="mudar pino digital %name|para %value"
    //% value.min=0 value.max=1
    //% name.shadow=digital_pin_shadow
    void digitalWritePin(int name, int value) {
        PINOP(setDigitalValue(value));
    }

   /**
    * Lê o valor do conector como analógico, ou seja, como um valor entre 0 e 1023.
    * @param name pino para ler, ex: AnalogPin.P0
    */
    //% help=pins/analog-read-pin weight=25
    //% blockId=device_get_analog_pin block="ler pino analógico %name" blockGap="8"
    //% name.shadow=analog_read_write_pin_shadow
    int analogReadPin(int name) {
        PINREAD(getAnalogValue());
    }

   /**
    * Define o valor do conector como analógico. O valor deve estar entre 0 e 1023.
    * @param name nome do pino para escrever, ex: AnalogPin.P0
    * @param value valor para escrever no pino entre ``0`` e ``1023``. ex: 1023, 0
    */
    //% help=pins/analog-write-pin weight=24
    //% blockId=device_set_analog_pin block="mudar pino analógico %name|para %value" blockGap=8
    //% value.min=0 value.max=1023
    //% name.shadow=analog_pin_shadow
    void analogWritePin(int name, int value) {
        PINOP(setAnalogValue(value));
    }

   /**
    * Configura o período de modulação por largura de pulso (PWM) da saída analógica em microssegundos.
    * Se este pino não estiver configurado como saída analógica (usando `escrita analógica pino`), a operação não terá efeito.
    * @param name pino analógico para definir o período, ex: AnalogPin.P0
    * @param micros período em microssegundos. ex: 20000
    */
    //% help=pins/analog-set-period weight=23 blockGap=8
    //% blockId=device_set_analog_period block="definir período analógico no pino %pin|para (ms)%micros"
    //% pin.shadow=analog_pin_shadow
    void analogSetPeriod(int name, int micros) {
        PINOP(setAnalogPeriodUs(micros));
    }

    /**
    * Configura o pino como uma entrada digital e gera um evento quando o pino recebe um pulso, seja em nível alto ou baixo.
    * @param name pino digital para registrar, ex: DigitalPin.P0
    * @param pulse o valor do pulso, ex: PulseValue.High
    */
    //% help=pins/on-pulsed advanced=false
    //% blockId=pins_on_pulsed block="no|pino %pin|receber pulso %pulse"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4
    //% pin.fieldOptions.tooltips="false" pin.fieldOptions.width="250"
    //% group="Pulso"
    //% weight=25
    //% blockGap=8
    void onPulsed(DigitalPin name, PulseValue pulse, Action body) {
        MicroBitPin* pin = getPin((int)name);
        if (!pin) return;

        pin->eventOn(MICROBIT_PIN_EVENT_ON_PULSE);
        registerWithDal((int)name, (int)pulse, body);
    }

    /**
    * Obtém a duração do último pulso em microssegundos. Esta função deve ser chamada a partir de um manipulador ``onPulsed``.
    */
    //% help=pins/pulse-duration advanced=false
    //% blockId=pins_pulse_duration block="duração do pulso (ms)"
    //% group="Pulso"
    //% weight=24
    //% blockGap=8
    int pulseDuration() {
        return pxt::lastEvent.timestamp;
    }

   /**
    * Retorna a duração de um pulso em um pino em microssegundos.
    * @param name o pino que mede o pulso, por exemplo: DigitalPin.P0
    * @param value o valor do pulso, por exemplo: PulseValue.High
    * @param maximum duração máxima em microssegundos
    */
    //% blockId="pins_pulse_in" block="pulso no (µs)|pino %name|pulso %value"
    //% advanced=false
    //% help=pins/pulse-in
    //% name.shadow=digital_pin_shadow
    //% group="Pulso"
    //% weight=23
    //% blockGap=8
    int pulseIn(int name, PulseValue value, int maxDuration = 2000000) {
        MicroBitPin* pin = getPin((int)name);
        if (!pin) return 0;

#if MICROBIT_CODAL
        // set polarity
        pin->setPolarity(PulseValue::High == value ? 1 : 0);
        // record pulse
        int period = pin->getPulseUs(maxDuration);
        // timeout
        if (DEVICE_CANCELLED == period)
            return 0;
        // success!
        return period;
#else
        int pulse = value == PulseValue::High ? 1 : 0;
        uint64_t tick =  system_timer_current_time_us();
        uint64_t maxd = (uint64_t)maxDuration;
        while(pin->getDigitalValue() != pulse) {
            if(system_timer_current_time_us() - tick > maxd)
                return 0;
        }

        uint64_t start =  system_timer_current_time_us();
        while(pin->getDigitalValue() == pulse) {
            if(system_timer_current_time_us() - tick > maxd)
                return 0;
        }
        uint64_t end =  system_timer_current_time_us();
        return end - start;
#endif
    }

    /**
    * Escreve um valor no servo, controlando o eixo de acordo. Em um servo padrão, isso ajustará o ângulo do eixo (em graus), movendo-o para essa orientação. Em um servo de rotação contínua, isso ajustará a velocidade do servo (com ``0`` sendo a velocidade máxima em uma direção, ``180`` sendo a velocidade máxima na outra direção, e um valor próximo a ``90`` representando nenhuma movimentação).
    * @param name pino para escrever, por exemplo: AnalogPin.P0
    * @param value ângulo ou velocidade de rotação, por exemplo: 180, 90, 0
    */
    //% help=pins/servo-write-pin weight=20
    //% blockId=device_set_servo_pin block="ajustar servo motor no|pino %name|para %value" blockGap=8
    //% parts=microservo trackArgs=0
    //% value.min=0 value.max=180
    //% name.shadow=analog_pin_shadow
    //% group="Servo"
    void servoWritePin(int name, int value) {
        PINOP(setServoValue(value));
    }

    /**
    * Especifica que um servo contínuo está conectado.
    */
    //%
    void servoSetContinuous(int name, bool value) {
        // handled in simulator
    }

    /**
    * Configura o pino de E/S como uma saída analógica/PWM e ajusta uma largura de pulso. O período é de 20 ms, e a largura do pulso é definida com base no valor fornecido em **microsegundos** ou `1/1000` milissegundos.
    * @param name nome do pino
    * @param micros duração do pulso em microsegundos, por exemplo: 1500
    */
    //% help=pins/servo-set-pulse weight=19
    //% blockId=device_set_servo_pulse block="configurar pulso do servo no|pino %value|para (µs) %micros"
    //% value.shadow=analog_pin_shadow
    //% group="Servo"
    void servoSetPulse(int name, int micros) {
        PINOP(setServoPulseUs(micros));
    }


    PinCompat* pitchPin = NULL;
    uint8_t pitchVolume = 0xff;
    bool analogTonePlaying = false;
    bool edgeConnectorSoundDisabled = false;

    /**
    * Define o pino utilizado para pitch analógico ou música.
    * @param name pino para modular o pitch
    */
    //% blockId=device_analog_set_pitch_pin block="definir pino analógico de pitch %name"
    //% help=pins/analog-set-pitch-pin advanced=false
    //% name.shadow=analog_pin_shadow
    //% group="Pinos"
    //% weight=12
    //% blockGap=8
    void analogSetPitchPin(int name) {
        pitchPin = getPin((int)name);
    }

    void pinAnalogSetPitch(PinCompat* pin, int frequency, int ms) {
      if (frequency <= 0 || pitchVolume == 0) {
        pin->setAnalogValue(0);
      } else {
        int v = 1 << (pitchVolume >> 5);
        pin->setAnalogValue(v);
        pin->setAnalogPeriodUs(1000000/frequency);
      }
    }

   /**
    * Define o pino usado ao utilizar pitch analógico ou música.
    * @param name pino para modular o pitch
    */
    //% blockId=device_analog_set_pitch_pin block="analógico definir pino de pitch %name"
    //% help=pins/analog-set-pitch-pin advanced=false
    //% name.shadow=analog_pin_shadow
    //% group="Pinos"
    //% weight=12
    //% blockGap=8
    void analogSetPitchVolume(int volume) {
        pitchVolume = max(0, min(0xff, volume));

        if (analogTonePlaying) {
            int v = pitchVolume == 0 ? 0 : 1 << (pitchVolume >> 5);
            if (NULL != pitchPin && !edgeConnectorSoundDisabled)
                pitchPin->setAnalogValue(v);
        }
    }

    /**
    * Gets the volume the pitch pin from 0..255
    */
    //% blockId=device_analog_pitch_volume block="analog pitch volume"
    //% help=pins/analog-pitch-volume weight=3 advanced=false
    //% deprecated
    int analogPitchVolume() {
        return pitchVolume;
    }

    /**
    * Envia um sinal de modulação por largura de pulso (PWM) para o pino de tom atual. Use `definir pino de tom analógico` para definir o pino de tom.
    * @param frequency frequência para modular em Hz.
    * @param ms duração do tom em milissegundos.
    */
    //% blockId=device_analog_pitch block="tom analógico %frequency|por (ms) %ms"
    //% help=pins/analog-pitch async advanced=false
    //% group="Pinos"
    //% weight=14
    //% blockGap=8
    void analogPitch(int frequency, int ms) {
        // init pins if needed
        if (NULL == pitchPin) {
#if MICROBIT_CODAL
            pitchPin = &uBit.audio.virtualOutputPin;
#else
            pitchPin = getPin((int)AnalogPin::P0);
#endif
        }
        // set pitch
        analogTonePlaying = true;

#if MICROBIT_CODAL
        if (NULL != pitchPin)
            pinAnalogSetPitch(pitchPin, frequency, ms);
        // clear pitch
        if (ms > 0) {
            fiber_sleep(ms);
            if (NULL != pitchPin)
                pitchPin->setAnalogValue(0);
            analogTonePlaying = false;
            // causes issues with v2 DMA.
            // fiber_sleep(5);
        }
#else
        if (NULL != pitchPin && !edgeConnectorSoundDisabled)
            pinAnalogSetPitch(pitchPin, frequency, ms);
        // clear pitch
        if (ms > 0) {
            fiber_sleep(ms);
            if (NULL != pitchPin && !edgeConnectorSoundDisabled)
                pitchPin->setAnalogValue(0);
            analogTonePlaying = false;
            // causes issues with v2 DMA.
            // fiber_sleep(5);
        }
#endif
    }


   /**
    * Configura a direção de pull de um pino.
    * @param name pino para configurar o modo de pull, ex: DigitalPin.P0
    * @param pull uma das configurações de pull do mbed, ex: PinPullMode.PullUp
    */
    //% help=pins/set-pull advanced=false
    //% blockId=device_set_pull block="configurar puxada de|pino %pin|para %pull"
    //% pin.shadow=digital_pin_shadow
    //% group="Pinos"
    //% weight=15
    //% blockGap=8
    void setPull(int name, PinPullMode pull) {
#if MICROBIT_CODAL
        codal::PullMode m = pull == PinPullMode::PullDown
            ? codal::PullMode::Down
            : pull == PinPullMode::PullUp ? codal::PullMode::Up
            : codal::PullMode::None;
        PINOP(setPull(m));
#else
        PinMode m = pull == PinPullMode::PullDown
            ? PinMode::PullDown
            : pull == PinPullMode::PullUp ? PinMode::PullUp
            : PinMode::PullNone;
        PINOP(setPull(m));
#endif
    }

   /**
    * Configura os eventos emitidos por este pino. Os eventos podem ser assinados
    * usando ``control.onEvent()``.
    * @param name pino para configurar o modo de evento, por exemplo: DigitalPin.P0
    * @param type o tipo de eventos que este pino deve emitir, por exemplo: PinEventType.Edge
    */
    //% help=pins/set-events advanced=false
    //% blockId=device_set_pin_events block="configurar pino %pin|para emitir eventos %type"
    //% pin.shadow=digital_pin_shadow
    //% group="Pinos"
    //% weight=13
    //% blockGap=8
    void setEvents(int name, PinEventType type) {
        getPin((int)name)->eventOn((int)type);
    }

    /**
     * Create a new zero-initialized buffer.
     * @param size number of bytes in the buffer
     */
    //%
    Buffer createBuffer(int size)
    {
        return mkBuffer(NULL, size);
    }


    /**
    * Define a largura da matriz para a tira de LEDs Neopixel (já atribuída a um pino).
    * Deve ser usada em conjunto com `definir largura da matriz` do pacote Neopixel.
    * @param name pino da tira Neopixel, ex: DigitalPin.P1
    * @param value largura da matriz (no mínimo ``2``)
    */
    //% help=pins/neopixel-matrix-width advanced=false
    //% blockId=pin_neopixel_matrix_width block="neopixel largura da matriz no|pino %pin %width"
    //% pin.shadow=digital_pin_shadow
    //% width.defl=5 width.min=2
    //% group="Pinos"
    //% weight=11
    //% blockGap=8
    void setMatrixWidth(int pin, int width) {}

#if MICROBIT_CODAL
#define BUFFER_TYPE uint8_t*
#else
#define BUFFER_TYPE char*
#endif

    /**
     * Read `size` bytes from a 7-bit I2C `address`.
     */
    //%
    Buffer i2cReadBuffer(int address, int size, bool repeat = false)
    {
      Buffer buf = createBuffer(size);
      uBit.i2c.read(address << 1, (BUFFER_TYPE)buf->data, size, repeat);
      return buf;
    }

    /**
     * Write bytes to a 7-bit I2C `address`.
     */
    //%
    int i2cWriteBuffer(int address, Buffer buf, bool repeat = false)
    {
      return uBit.i2c.write(address << 1, (BUFFER_TYPE)buf->data, buf->length, repeat);
    }

    SPI* spi = NULL;
    SPI* allocSPI() {
        if (NULL == spi)
            spi = new SPI(MOSI, MISO, SCK);
        return spi;
    }

   /**
    * Escreve para o escravo SPI e retorna a resposta
    * @param value Dados a serem enviados para o escravo SPI
    */
    //% help=pins/spi-write advanced=false
    //% blockId=spi_write block="escrever SPI %value"
    //% group="SPI"
    //% blockGap=8
    //% weight=53
    int spiWrite(int value) {
        auto p = allocSPI();
        return p->write(value);
    }

    /**
    * Write to and read from the SPI slave at the same time
    * @param command Data to be sent to the SPI slave (can be null)
    * @param response Data received from the SPI slave (can be null)
    */
    //% help=pins/spi-transfer argsNullable
    void spiTransfer(Buffer command, Buffer response) {
        if (!command && !response)
            target_panic(PANIC_INVALID_ARGUMENT);
        if (command && response && command->length != response->length)
            target_panic(PANIC_INVALID_ARGUMENT);
        auto p = allocSPI();
        unsigned len = command ? command->length : response->length;
#if MICROBIT_CODAL
        p->transfer(command ? command->data : NULL, command ? len : 0,
                    response ? response->data : NULL, response ? len : 0);
#else
        for (unsigned i = 0; i < len; ++i) {
            int v = p->write(command ? command->data[i] : 0);
            if (response) response->data[i] = v;
        }
#endif
    }

    /**
    * Defina a frequência do SPI
    * @param frequency a frequência do relógio, ex: 1000000
    */
    //% help=pins/spi-frequency advanced=false
    //% blockId=spi_frequency block="frequência SPI %frequency"
    //% group="SPI"
    //% blockGap=8
    //% weight=55
    void spiFrequency(int frequency) {
        auto p = allocSPI();
        p->frequency(frequency);
    }

  /**
    * Defina os bits e o modo do SPI
    * @param bits o número de bits, ex: 8
    * @param mode o modo, ex: 3
    */
    //% help=pins/spi-format advanced=false
    //% blockId=spi_format block="formato SPI|bits %bits|modo %mode"
    //% group="SPI"
    //% blockGap=8
    //% weight=54
    void spiFormat(int bits, int mode) {
        auto p = allocSPI();
        p->format(bits, mode);
    }

#if MICROBIT_CODAL
#define PIN_ARG(pin) *(getPin((int)(pin)))
#else
#define PIN_ARG(pin) (getPin((int)(pin)))->name
#endif

   /**
    * Define os pinos MOSI, MISO, SCK usados pela conexão SPI
    *
    */
    //% help=pins/spi-pins advanced=false
    //% blockId=spi_pins block="definir pinos SPI|MOSI %mosi|MISO %miso|SCK %sck"
    //% mosi.shadow=digital_pin_shadow
    //% miso.shadow=digital_pin_shadow
    //% sck.shadow=digital_pin_shadow
    //% group="SPI"
    //% blockGap=8
    //% weight=51
    void spiPins(int mosi, int miso, int sck) {
        if (NULL != spi) {
            delete spi;
            spi = NULL;
        }
        spi = new SPI(PIN_ARG(mosi), PIN_ARG(miso), PIN_ARG(sck));
    }

    /**
    * Mounts a push button on the given pin
    */
    //% help=pins/push-button advanced=false
    void pushButton(int pin) {
        new MicroBitButton((PinName)getPin((int)(pin))->name, (int)pin, MICROBIT_BUTTON_ALL_EVENTS, PinMode::PullUp);
    }

  /**
    * Define o pino usado para produzir sons e melodias. O padrão é P0.
    * @param name pino para modular o pitch
    */
    //% blockId=pin_set_audio_pin block="definir pino de áudio $name"
    //% help=pins/set-audio-pin
    //% name.shadow=digital_pin_shadow
    //% weight=1
    //% blockGap=8
    void setAudioPin(int name) {
#if MICROBIT_CODAL
        uBit.audio.setPin(*getPin((int)name));
        uBit.audio.setPinEnabled(!edgeConnectorSoundDisabled);
#else
        // v1 behavior
        pins::analogSetPitchPin(name);
#endif
    }

   /**
    * Define se o áudio será ou não gerado usando um pino no conector de borda.
    */  
    //% blockId=pin_set_audio_pin_enabled
    //% block="definir áudio no pino habilitado $enabled"
    //% weight=0 help=pins/set-audio-pin-enabled
    void setAudioPinEnabled(bool enabled) {
        edgeConnectorSoundDisabled = !enabled;
#if MICROBIT_CODAL
        uBit.audio.setPinEnabled(enabled);
#endif
    }
}

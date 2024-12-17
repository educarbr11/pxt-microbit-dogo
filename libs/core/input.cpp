#include "pxt.h"

enum class Button {
    A = MICROBIT_ID_BUTTON_A,
    B = MICROBIT_ID_BUTTON_B,
    //% block="A+B"
    AB = MICROBIT_ID_BUTTON_AB,
};

enum class Dimension {
    //% block=x
    X = 0,
    //% block=y
    Y = 1,
    //% block=z
    Z = 2,
    //% block=força
    Strength = 3,
};

enum class Rotation {
    //% block=ajuste
    Pitch = 0,
    //% block=rotação
    Roll = 1,
};

enum class TouchPin {
    P0 = MICROBIT_ID_IO_P0,
    P1 = MICROBIT_ID_IO_P1,
    P2 = MICROBIT_ID_IO_P2,
};

enum class AcceleratorRange {
    /**
     * The accelerator measures forces up to 1 gravity
     */
    //%  block="1g"
    OneG = 1,
    /**
     * The accelerator measures forces up to 2 gravity
     */
    //%  block="2g"
    TwoG = 2,
    /**
     * The accelerator measures forces up to 4 gravity
     */
    //% block="4g"
    FourG = 4,
    /**
     * The accelerator measures forces up to 8 gravity
     */
    //% block="8g"
    EightG = 8
};

enum class Gesture {
    /**
     * Raised when shaken
     */
    //% block=agitar
    //% jres=gestures.shake
    Shake = MICROBIT_ACCELEROMETER_EVT_SHAKE,
    /**
     * Raised when the logo is upward and the screen is vertical
     */
    //% block="logo para cima"
    //% jres=gestures.tiltforward
    LogoUp = MICROBIT_ACCELEROMETER_EVT_TILT_UP,
    /**
     * Raised when the logo is downward and the screen is vertical
     */
    //% block="logo para baixo"
    //% jres=gestures.tiltbackwards
    LogoDown = MICROBIT_ACCELEROMETER_EVT_TILT_DOWN,
    /**
     * Raised when the screen is pointing up and the board is horizontal
     */
    //% block="tela virada para cima"
    //% jres=gestures.frontsideup
    ScreenUp = MICROBIT_ACCELEROMETER_EVT_FACE_UP,
    /**
     * Raised when the screen is pointing down and the board is horizontal
     */
    //% block="tela virada para baixo"
    //% jres=gestures.backsideup
    ScreenDown = MICROBIT_ACCELEROMETER_EVT_FACE_DOWN,
    /**
     * Raised when the screen is pointing left
     */
    //% block="tela inclinada para esquerda"
    //% jres=gestures.tiltleft
    TiltLeft = MICROBIT_ACCELEROMETER_EVT_TILT_LEFT,
    /**
     * Raised when the screen is pointing right
     */
    //% block="tela inclinada para direita"
    //% jres=gestures.tiltright
    TiltRight = MICROBIT_ACCELEROMETER_EVT_TILT_RIGHT,
    /**
     * Raised when the board is falling!
     */
    //% block="em queda livre"
    //% jres=gestures.freefall
    FreeFall = MICROBIT_ACCELEROMETER_EVT_FREEFALL,
    /**
    * Raised when a 3G shock is detected
    */
    //% block="3g"
    //% jres=gestures.impact3g
    ThreeG = MICROBIT_ACCELEROMETER_EVT_3G,
    /**
    * Raised when a 6G shock is detected
    */
    //% block="6g"
    //% jres=gestures.impact6g
    SixG = MICROBIT_ACCELEROMETER_EVT_6G,
    /**
    * Raised when a 8G shock is detected
    */
    //% block="8g"
    //% jres=gestures.impact8g
    EightG = MICROBIT_ACCELEROMETER_EVT_8G
};

enum class MesDpadButtonInfo {
    //% block="A down"
    ADown = MES_DPAD_BUTTON_A_DOWN,
    //% block="A up"
    AUp = MES_DPAD_BUTTON_A_UP,
    //% block="B down"
    BDown = MES_DPAD_BUTTON_B_DOWN,
    //% block="B up"
    BUp = MES_DPAD_BUTTON_B_UP,
    //% block="C down"
    CDown = MES_DPAD_BUTTON_C_DOWN,
    //% block="C up"
    CUp = MES_DPAD_BUTTON_C_UP,
    //% block="D down"
    DDown = MES_DPAD_BUTTON_D_DOWN,
    //% block="D up"
    DUp = MES_DPAD_BUTTON_D_UP,
    //% block="1 down"
    _1Down = MES_DPAD_BUTTON_1_DOWN,
    //% block="1 up"
    _1Up = MES_DPAD_BUTTON_1_UP,
    //% block="2 down"
    _2Down = MES_DPAD_BUTTON_2_DOWN,
    //% block="2 up"
    _2Up = MES_DPAD_BUTTON_2_UP,
    //% block="3 down"
    _3Down = MES_DPAD_BUTTON_3_DOWN,
    //% block="3 up"
    _3Up = MES_DPAD_BUTTON_3_UP,
    //% block="4 down"
    _4Down = MES_DPAD_BUTTON_4_DOWN,
    //% block="4 up"
    _4Up = MES_DPAD_BUTTON_4_UP,
};

//% color=#D400D4 weight=111 icon="\uf192"
namespace input {
    /**
     * Fazer algo quando um botão (A, B ou A + B) for pressionado e liberado novamente.
     * @param button o botão que precisa ser pressionado
     * @param body código a ser executado quando o evento for criado
     */
    //% help=input/on-button-pressed weight=85 blockGap=16
    //% blockId=device_button_event block="quando o botão|%NAME|for pressionado"
    //% parts="buttonpair"
    void onButtonPressed(Button button, Action body) {
        registerWithDal((int)button, MICROBIT_BUTTON_EVT_CLICK, body);
    }

    /**
     * Fazer algo quando um gesto for concluído (com agitar o micro:bit)
     * @param gesture o tipo de gesto a monitorar, por exemplo: Gesture.Shake
     * @param body código a ser executado quando o gesto for criado
     */
    //% help=input/on-gesture weight=84 blockGap=16
    //% blockId=device_gesture_event block="quando |%NAME"
    //% parts="accelerometer"
    //% NAME.fieldEditor="gestures" NAME.fieldOptions.columns=4
    void onGesture(Gesture gesture, Action body) {
        int gi = (int)gesture;
        if (gi == MICROBIT_ACCELEROMETER_EVT_3G && uBit.accelerometer.getRange() < 3)
            uBit.accelerometer.setRange(4);
        else if ((gi == MICROBIT_ACCELEROMETER_EVT_6G || gi == MICROBIT_ACCELEROMETER_EVT_8G) && uBit.accelerometer.getRange() < 6)
            uBit.accelerometer.setRange(8);
        registerWithDal(MICROBIT_ID_GESTURE, gi, body);
    }

    /**
    * Testa se um gesto foi detectado no momento.
     * @param gesture the type of gesture to detect, eg: Gesture.Shake
    */
    //% help=input/is-gesture weight=10 blockGap=8
    //% blockId=deviceisgesture block="o gesto é %gesture"
    //% parts="accelerometer"
    //% gesture.fieldEditor="gestures" gesture.fieldOptions.columns=4
    bool isGesture(Gesture gesture) {
        // turn on acceleration
        uBit.accelerometer.getX();
        int gi = (int)gesture;
        return uBit.accelerometer.getGesture() == gi;
    }

     /**
     * Fazer algo quando um pin for tocado e liberado novamente (enquanto também toca no pin GND).
     * @param name o pino que precisa ser pressionado. por exemplo: TouchPin.P0
     * @param body o código a ser executado quando o pino é pressionado
     */
    //% help=input/on-pin-pressed weight=83 blockGap=32
    //% blockId=device_pin_event block="quando pino %name| ativado"
    void onPinPressed(TouchPin name, Action body) {
        auto pin = getPin((int)name);
        if (!pin) return;

        // Forces the PIN to switch to makey-makey style detection.
        pin->isTouched();
        registerWithDal((int)name, MICROBIT_BUTTON_EVT_CLICK, body);
    }

    /**
     * Fazer algo quando o pino for liberado.
     * @param name o pino que precisa ser desativado, por exemplo: TouchPin.P0
     * @param body o código a ser executado quando o pino é desativado
     */
    //% help=input/on-pin-released weight=6 blockGap=16
    //% blockId=device_pin_released block="quando pino %NAME|desativado"
    void onPinReleased(TouchPin name, Action body) {
        auto pin = getPin((int)name);
        if (!pin) return;

        // Forces the PIN to switch to makey-makey style detection.
        pin->isTouched();
        registerWithDal((int)name, MICROBIT_BUTTON_EVT_UP, body);
    }

    /**
     * Obter o estado do botão (pressionado ou não) para ``A`` e ``B``.
     * @param button o botão para consultar a solicitação, por exemplo: Botão.A
     */
    //% help=input/button-is-pressed weight=60
    //% block="botão|%NAME|pressionado"
    //% blockId=device_get_button2
    //% icon="\uf192" blockGap=8
    //% parts="buttonpair"
    bool buttonIsPressed(Button button) {
      if (button == Button::A)
        return uBit.buttonA.isPressed();
      else if (button == Button::B)
        return uBit.buttonB.isPressed();
      else if (button == Button::AB)
        return uBit.buttonAB.isPressed();
      return false;
    }

    /**
     * Obter o estado do pino (ativado ou não). Requer manter o chão para fechar o circuito.
     * @param name pino utilizado para detectar o toque, por exemplo: TouchPin.P0
     */
    //% help=input/pin-is-pressed weight=58
    //% blockId="device_pin_is_pressed" block="pino %NAME| ativado"
    //% blockGap=8
    bool pinIsPressed(TouchPin name) {
        auto pin = getPin((int)name);
        return pin && pin->isTouched();
    }

    int getAccelerationStrength() {
        double x = uBit.accelerometer.getX();
        double y = uBit.accelerometer.getY();
        double z = uBit.accelerometer.getZ();
        return (int)sqrt(x*x+y*y+z*z);
    }

    /**
     * Obter o valor de aceleração em mili-gravidade (quando a placa está na posição horizontal com a tela para cima, x=0, y=0 e z=1024)
     * @param dimension x, y, or z dimension, eg: Dimension.X
     */
    //% help=input/acceleration weight=58
    //% blockId=device_acceleration block="força de aceleração (ma)|%NAME" blockGap=8
    //% parts="accelerometer"
    int acceleration(Dimension dimension) {
      switch (dimension) {
      case Dimension::X: return uBit.accelerometer.getX();
      case Dimension::Y: return uBit.accelerometer.getY();
      case Dimension::Z: return uBit.accelerometer.getZ();
      case Dimension::Strength: return getAccelerationStrength();
      }
      return 0;
    }

    /**
     * Lê o nível de luz aplicado à tela de LED em um alcance de ``0`` (escuro) a ``255`` (claro).
     */
    //% help=input/light-level weight=57
    //% blockId=device_get_light_level block="nível de luz" blockGap=8
    //% parts="ledmatrix"
    int lightLevel() {
        return uBit.display.readLightLevel();
    }

    /**
     * Obter a orientação atual em graus.
     */
    //% help=input/compass-heading
    //% weight=56
    //% blockId=device_heading block="direção da bússola (°)" blockGap=8
    //% parts="compass"
    int compassHeading() {
        return uBit.compass.heading();
    }


    /**
     * Obtém a temperatura em graus Celsius (°C).
     */
    //% weight=55
    //% help=input/temperature
    //% blockId=device_temperature block="temperatura (°C)" blockGap=8
    //% parts="thermometer"
    int temperature() {
        return uBit.thermometer.getTemperature();
    }

    /**
     * O ajuste ou rotação do dispositivo, girando ao longo do ``eixo-x`` ou ``eixo-y``, em graus.
     * @param kind pitch or roll
     */
    //% help=input/rotation weight=52
    //% blockId=device_get_rotation block="rotação (°)|%NAME" blockGap=8
    //% parts="accelerometer"
    int rotation(Rotation kind) {
      switch (kind) {
      case Rotation::Pitch: return uBit.accelerometer.getPitch();
      case Rotation::Roll: return uBit.accelerometer.getRoll();
      }
      return 0;
    }

    /**
     * Obter o valor da força magnética em ``micro-Teslas`` (``µT``). Esta função não é suportada no simulador.
     * @param dimension the x, y, or z dimension, eg: Dimension.X
     */
    //% help=input/magnetic-force weight=54
    //% blockId=device_get_magnetic_force block="força magnética (µT)|%NAME" blockGap=8
    //% parts="compass"
    TNumber magneticForce(Dimension dimension) {
        /* https://github.com/microsoft/pxt-microbit/issues/4995
        if (!uBit.compass.isCalibrated())
            uBit.compass.calibrate();
        */
        double d = 0;        
        switch (dimension) {
            case Dimension::X: d = uBit.compass.getX(); break;
            case Dimension::Y: d = uBit.compass.getY(); break;
            case Dimension::Z: d = uBit.compass.getZ(); break;
            case Dimension::Strength: d = uBit.compass.getFieldStrength() ; break;
        }
        return fromDouble(d / 1000.0);
    }

    /**
     * Obsoleto, a calibração da bússola é automática.
     */
    //% help=input/calibrate-compass
    //% blockId="input_compass_calibrate" block="calibrar bússola"
    //% weight=55
    void calibrateCompass() {
        uBit.compass.calibrate();
    }

    /**
     * Define o intervalo da amostra do acelerómetro em gravidades.
     * @param range um valor descreve a força máxima da aceleração medida
     */
    //% help=input/set-accelerometer-range
    //% blockId=device_set_accelerometer_range block="definir o acelerômetro|alcance %range"
    //% weight=5
    //% parts="accelerometer"
    void setAccelerometerRange(AcceleratorRange range) {
        uBit.accelerometer.setRange((int)range);
    }
}

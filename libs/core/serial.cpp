#include "pxt.h"

#define MICROBIT_SERIAL_READ_BUFFER_LENGTH 64

// make sure USB_TX and USB_RX don't overlap with other pin ids
// also, 1001,1002 need to be kept in sync with getPin() function
enum SerialPin {
    P0 = MICROBIT_ID_IO_P0,
    P1 = MICROBIT_ID_IO_P1,
    P2 = MICROBIT_ID_IO_P2,
    P8 = MICROBIT_ID_IO_P8,
    P12 = MICROBIT_ID_IO_P12,
    P13 = MICROBIT_ID_IO_P13,
    P14 = MICROBIT_ID_IO_P14,
    P15 = MICROBIT_ID_IO_P15,
    P16 = MICROBIT_ID_IO_P16,
    USB_TX = 1001,
    USB_RX = 1002
};

enum BaudRate {
  //% block=115200
  BaudRate115200 = 115200,
  //% block=57600
  BaudRate57600 = 57600,
  //% block=38400
  BaudRate38400 = 38400,
  //% block=31250
  BaudRate31250 = 31250,
  //% block=28800
  BaudRate28800 = 28800,
  //% block=19200
  BaudRate19200 = 19200,
  //% block=14400
  BaudRate14400 = 14400,
  //% block=9600
  BaudRate9600 = 9600,
  //% block=4800
  BaudRate4800 = 4800,
  //% block=2400
  BaudRate2400 = 2400,
  //% block=1200
  BaudRate1200 = 1200
};

//% weight=2 color=#002050 icon="\uf287"
//% advanced=false
namespace serial {
#if MICROBIT_CODAL
    bool is_redirected;
#endif

    // note that at least one // followed by % is needed per declaration!

  /**
  * Lê uma linha de texto da porta serial e retorna o buffer quando o delimitador for encontrado.
  * @param delimiter delimitador de texto que separa cada parte do texto
  */
  //% help=serial/read-until
  //% blockId=serial_read_until block="serial com:|ler até %delimiter=serial_delimiter_conv"
  //% weight=19
    String readUntil(String delimiter) {
      return PSTR(uBit.serial.readUntil(MSTR(delimiter)));
    }

   /**
  * Lê os dados recebidos no buffer como uma string
  */
  //% help=serial/read-string
  //% blockId=serial_read_buffer block="serial com:|ler texto"
  //% weight=18
    String readString() {
      int n = uBit.serial.getRxBufferSize();
      if (n == 0) return mkString("", 0);
      return PSTR(uBit.serial.read(n, MicroBitSerialMode::ASYNC));
    }

    /**
    * Registra um evento a ser disparado quando um dos delimitadores for correspondido.
    * @param delimitadores os caracteres para comparar os caracteres recebidos.
    */
    //% help=serial/on-data-received
    //% weight=18 blockId=serial_on_data_received block="serial com:|ao receber dados %delimitadores=serial_delimiter_conv"
    void onDataReceived(String delimiters, Action body) {
      uBit.serial.eventOn(MSTR(delimiters));
      registerWithDal(MICROBIT_ID_SERIAL, MICROBIT_SERIAL_EVT_DELIM_MATCH, body);
      // lazy initialization of serial buffers
      uBit.serial.read(MicroBitSerialMode::ASYNC);
    }

   /**
  * Envia um pedaço de texto através da conexão serial.
  */
  //% help=serial/write-string
  //% weight=87 blockGap=8
  //% blockId=serial_writestring block="serial com:|escrever cadeia de caracteres %texto"
  //% texto.shadowOptions.toString=true
    void writeString(String text) {
      if (!text) return;

      uBit.serial.send(MSTR(text));
    }

    /**
    * Envia um buffer através da conexão serial.
    */
    //% blockId=serial_writebuffer block="serial com:|escrever buffer %buffer=serial_readbuffer"
    //% help=serial/write-buffer advanced=false weight=6
    void writeBuffer(Buffer buffer) {
      if (!buffer) return;

      uBit.serial.send(buffer->data, buffer->length);
    }

    /**
    * Lê múltiplos caracteres do buffer de recepção.
    * Se o comprimento for positivo, pausa até que haja caracteres suficientes.
    * @param length comprimento do buffer padrão
    */
    //% blockId=serial_readbuffer block="serial com:|ler buffer %length"
    //% help=serial/read-buffer advanced=false weight=5
    Buffer readBuffer(int length) {
      auto mode = SYNC_SLEEP;
      if (length <= 0) {
        length = uBit.serial.getRxBufferSize();
        mode = ASYNC;
      }

      auto buf = mkBuffer(NULL, length);
      auto res = buf;
      registerGCObj(buf); // make sure buffer is pinned, while we wait for data
      int read = uBit.serial.read(buf->data, buf->length, mode);
      if (read != length) {
        res = mkBuffer(buf->data, read);
      }
      unregisterGCObj(buf);

      return res;
    }

    bool tryResolvePin(SerialPin p, PinName& name) {
      switch(p) {
#if !MICROBIT_CODAL
        case SerialPin::USB_TX: name = USBTX; return true;
        case SerialPin::USB_RX: name = USBRX; return true;
#endif
        default: 
          auto pin = getPin(p); 
          if (NULL != pin) {
            name = (PinName)pin->name;
            return true;
          }
      }
      return false;
    }

    /**
    /**
    * Define a entrada e saída serial para usar pinos em vez da conexão USB.
    * @param tx o novo pino de transmissão, ex: SerialPin.P0
    * @param rx o novo pino de recepção, ex: SerialPin.P1
    * @param rate a nova taxa de transmissão. ex: 115200
    */
    //% weight=10
    //% help=serial/redirect
    //% blockId=serial_redirect block="serial com:|redirecionar para|TX %tx|RX %rx|com taxa de transmissão %rate"
    //% blockExternalInputs=1
    //% tx.fieldEditor="gridpicker" tx.fieldOptions.columns=3
    //% tx.fieldOptions.tooltips="false"
    //% rx.fieldEditor="gridpicker" rx.fieldOptions.columns=3
    //% rx.fieldOptions.tooltips="false"
    //% blockGap=8
    void redirect(SerialPin tx, SerialPin rx, BaudRate rate) {
#if MICROBIT_CODAL
      if (getPin(tx) && getPin(rx)) {
        uBit.serial.redirect(*getPin(tx), *getPin(rx));
        is_redirected = 1;
      }
      uBit.serial.setBaud(rate);
#else
      PinName txn;
      PinName rxn;
      if (tryResolvePin(tx, txn) && tryResolvePin(rx, rxn))
        uBit.serial.redirect(txn, rxn);
      uBit.serial.baud((int)rate);
#endif
    }

   /**
    * Define a taxa de transmissão (baud rate) da porta serial
    */
    //% weight=10
    //% blockId=serial_setbaudrate block="serial com:|definir taxa de transmissão %rate"
    //% blockGap=8 inlineInputMode=inline
    //% help=serial/set-baud-rate
    //% group="Configuração" advanced=false
    void setBaudRate(BaudRate rate) {
#if MICROBIT_CODAL
      uBit.serial.setBaud(rate);
#else
      uBit.serial.baud((int)rate);
#endif
    }


    /**
    * Direciona a entrada e saída serial para usar a conexão USB.
    */
    //% weight=9 help=serial/redirect-to-usb
    //% blockId=serial_redirect_to_usb block="serial com:|direcionar para USB"
    void redirectToUSB() {
#if MICROBIT_CODAL
      is_redirected = false;
      uBit.serial.redirect(uBit.io.usbTx, uBit.io.usbRx);
      uBit.serial.setBaud(115200);
#else
      uBit.serial.redirect(USBTX, USBRX);
      uBit.serial.baud(115200);
#endif
    }

   /**
    * Define o tamanho do buffer RX em bytes
    * @param size comprimento do buffer RX em bytes, ex: 32
    */
    //% help=serial/set-rx-buffer-size
    //% blockId=serialSetRxBufferSize block="serial com: definir tamanho do buffer RX para $size"
    //% advanced=false
    void setRxBufferSize(uint8_t size) {
      uBit.serial.setRxBufferSize(size);
    }

    /**
    * Define o tamanho do buffer TX em bytes
    * @param size comprimento do buffer TX em bytes, ex: 32
    */
    //% help=serial/set-tx-buffer-size
    //% blockId=serialSetTxBufferSize block="serial com: definir tamanho do buffer TX para $size"
    //% advanced=false
    void setTxBufferSize(uint8_t size) {
      uBit.serial.setTxBufferSize(size);
    }

    /** Send DMESG debug buffer over serial. */
    //%
    void writeDmesg() {
        pxt::dumpDmesg();
    }
}

namespace pxt {

static void sendString(const char *c, int len) {
  while (len--)
    uBit.serial.putc(*c++);
}

void dumpDmesg() {
#if MICROBIT_CODAL
    if (serial::is_redirected)
      return;
    microbit_dmesg_flush();
#endif
}

}

#ifndef BLE_LOGO_SERVICE_H
#define BLE_LOGO_SERVICE_H

#include "MicroBitConfig.h"
#include "pxt.h"

//================================================================
#if MICROBIT_CODAL
//================================================================

#include "MicroBitBLEManager.h"
#include "MicroBitBLEService.h"

#define BLE_LOGO_UPDATE_INTERVAL_MS 50

class BLELogoService : public MicroBitBLEService
{
    public:

    /**
      * Constructor.
      * Create a representation of the LogoService
      * @param _ble The instance of a BLE device that we're running on.
      */
    BLELogoService(BLEDevice &_ble);

    /**
    * Reads the logo touch state and notifies connected clients.
    */
    void update();

    private:

    // Bluetooth stack we're running on.
    BLEDevice &ble;

    // memory for the characteristic value.
    uint8_t logoState;

    // Index for each characteristic in arrays of handles and UUIDs
    typedef enum mbbs_cIdx
    {
        mbbs_cIdxSTATE,
        mbbs_cIdxCOUNT
    } mbbs_cIdx;

    // UUIDs for our service and characteristics
    static const uint8_t  service_base_uuid[16];
    static const uint8_t  char_base_uuid[16];
    static const uint16_t serviceUUID;
    static const uint16_t charUUID[mbbs_cIdxCOUNT];

    // Data for each characteristic when they are held by Soft Device.
    MicroBitBLEChar chars[mbbs_cIdxCOUNT];

    public:

    int              characteristicCount()      { return mbbs_cIdxCOUNT; };
    MicroBitBLEChar *characteristicPtr(int idx) { return &chars[idx]; };
};

//================================================================
#endif // MICROBIT_CODAL
//================================================================

#endif

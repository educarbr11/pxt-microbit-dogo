#include "MicroBitConfig.h"
#include "BLELogoService.h"
#include "MicroBitEvent.h"

//================================================================
#if MICROBIT_CODAL
//================================================================

const uint8_t BLELogoService::service_base_uuid[16] =
{ 0xd0,0x60,0x00,0x00,0x26,0x79,0x30,0xda,0xa2,0x6e,0x02,0x73,0xb6,0x04,0x38,0x49 };

const uint8_t BLELogoService::char_base_uuid[16] =
{ 0xd0,0x60,0x00,0x00,0x26,0x79,0x30,0xda,0xa2,0x6e,0x02,0x73,0xb6,0x04,0x38,0x4a };

const uint16_t BLELogoService::serviceUUID              = 0xd061;
const uint16_t BLELogoService::charUUID[mbbs_cIdxCOUNT]  = { 0xd061 };

static BLELogoService *instance = NULL;

static void logo_poll_fiber(void *) {
    while (true) {
        if (instance)
            instance->update();
        fiber_sleep(BLE_LOGO_UPDATE_INTERVAL_MS);
    }
}

BLELogoService::BLELogoService(BLEDevice &_ble) :
        ble(_ble)
{
    // Initialise our characteristic value.
    logoState = 0;

    // Register the base UUID and create the service.
    RegisterBaseUUID(service_base_uuid);
    CreateService(serviceUUID);

    RegisterBaseUUID(char_base_uuid);
    CreateCharacteristic(mbbs_cIdxSTATE, charUUID[mbbs_cIdxSTATE],
                         (uint8_t *)&logoState,
                         sizeof(logoState), sizeof(logoState),
                         microbit_propREAD | microbit_propNOTIFY);

    instance = this;
    create_fiber(logo_poll_fiber, NULL);
}

void BLELogoService::update() {
    if (getConnected()) {
        logoState = uBit.io.logo.isTouched() ? 1 : 0;
        notifyChrValue(mbbs_cIdxSTATE, (uint8_t *)&logoState, sizeof(logoState));
    }
}

//================================================================
#endif // MICROBIT_CODAL
//================================================================

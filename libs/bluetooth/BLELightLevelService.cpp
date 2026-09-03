#include "MicroBitConfig.h"
#include "BLELightLevelService.h"
#include "MicroBitEvent.h"

//================================================================
#if MICROBIT_CODAL
//================================================================

const uint8_t BLELightLevelService::service_base_uuid[16] =
{ 0xd0,0x60,0x00,0x00,0x26,0x79,0x30,0xda,0xa2,0x6e,0x02,0x73,0xb6,0x04,0x38,0x49 };

const uint8_t BLELightLevelService::char_base_uuid[16] =
{ 0xd0,0x60,0x00,0x00,0x26,0x79,0x30,0xda,0xa2,0x6e,0x02,0x73,0xb6,0x04,0x38,0x4a };

const uint16_t BLELightLevelService::serviceUUID              = 0xd063;
const uint16_t BLELightLevelService::charUUID[mbbs_cIdxCOUNT]  = { 0xd063 };

static BLELightLevelService *instance = NULL;

static void light_poll_fiber(void *) {
    while (true) {
        if (instance)
            instance->update();
        fiber_sleep(BLE_LIGHT_LEVEL_UPDATE_INTERVAL_MS);
    }
}

BLELightLevelService::BLELightLevelService(BLEDevice &_ble) :
        ble(_ble)
{
    // Initialise our characteristic value.
    lightLevel = 0;

    // Register the base UUID and create the service.
    RegisterBaseUUID(service_base_uuid);
    CreateService(serviceUUID);

    RegisterBaseUUID(char_base_uuid);
    CreateCharacteristic(mbbs_cIdxLEVEL, charUUID[mbbs_cIdxLEVEL],
                         (uint8_t *)&lightLevel,
                         sizeof(lightLevel), sizeof(lightLevel),
                         microbit_propREAD | microbit_propNOTIFY);

    instance = this;
    create_fiber(light_poll_fiber, NULL);
}

void BLELightLevelService::update() {
    if (getConnected()) {
        lightLevel = (uint8_t)uBit.display.readLightLevel();
        notifyChrValue(mbbs_cIdxLEVEL, (uint8_t *)&lightLevel, sizeof(lightLevel));
    }
}

//================================================================
#endif // MICROBIT_CODAL
//================================================================

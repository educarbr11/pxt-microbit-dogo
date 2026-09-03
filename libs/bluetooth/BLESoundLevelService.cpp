#include "MicroBitConfig.h"
#include "BLESoundLevelService.h"
#include "MicroBitEvent.h"

//================================================================
#if MICROBIT_CODAL
//================================================================

#define SOUND_LEVEL_MIN 52.0f
#define SOUND_LEVEL_MAX 120.0f

const uint8_t BLESoundLevelService::service_base_uuid[16] =
{ 0xd0,0x60,0x00,0x00,0x26,0x79,0x30,0xda,0xa2,0x6e,0x02,0x73,0xb6,0x04,0x38,0x49 };

const uint8_t BLESoundLevelService::char_base_uuid[16] =
{ 0xd0,0x60,0x00,0x00,0x26,0x79,0x30,0xda,0xa2,0x6e,0x02,0x73,0xb6,0x04,0x38,0x4a };

const uint16_t BLESoundLevelService::serviceUUID              = 0xd062;
const uint16_t BLESoundLevelService::charUUID[mbbs_cIdxCOUNT]  = { 0xd062 };

static BLESoundLevelService *instance = NULL;

static void sound_poll_fiber(void *) {
    while (true) {
        if (instance)
            instance->update();
        fiber_sleep(BLE_SOUND_LEVEL_UPDATE_INTERVAL_MS);
    }
}

BLESoundLevelService::BLESoundLevelService(BLEDevice &_ble) :
        ble(_ble)
{
    // Initialise our characteristic value.
    soundLevel = 0;

    // Register the base UUID and create the service.
    RegisterBaseUUID(service_base_uuid);
    CreateService(serviceUUID);

    RegisterBaseUUID(char_base_uuid);
    CreateCharacteristic(mbbs_cIdxLEVEL, charUUID[mbbs_cIdxLEVEL],
                         (uint8_t *)&soundLevel,
                         sizeof(soundLevel), sizeof(soundLevel),
                         microbit_propREAD | microbit_propNOTIFY);

    instance = this;
    create_fiber(sound_poll_fiber, NULL);
}

void BLESoundLevelService::update() {
    if (getConnected()) {
        LevelDetectorSPL *level = uBit.audio.levelSPL;
        uint8_t val = 0;
        if (level != NULL) {
            const int micValue = level->getValue();
            const int scaled = max(SOUND_LEVEL_MIN, min(micValue, SOUND_LEVEL_MAX)) - SOUND_LEVEL_MIN;
            val = (uint8_t)min(0xff, scaled * 0xff / (SOUND_LEVEL_MAX - SOUND_LEVEL_MIN));
        }
        soundLevel = val;
        notifyChrValue(mbbs_cIdxLEVEL, (uint8_t *)&soundLevel, sizeof(soundLevel));
    }
}

//================================================================
#endif // MICROBIT_CODAL
//================================================================

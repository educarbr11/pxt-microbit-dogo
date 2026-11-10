"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");

require("pxt-core/built/pxt.js");
const nodeutil = require("pxt-core/built/nodeutil.js");
const pxtApi = global.pxt;
const rootDir = path.resolve(__dirname, "..");
const packageConfigs = {};
const target = JSON.parse(fs.readFileSync(path.join(rootDir, "pxtarget.json"), "utf8"));
target.bundledpkgs = {};

for (const id of ["core", "bluetooth", "microphone", "radio"]) {
    const config = nodeutil.readPkgConfig(path.join(rootDir, "libs", id));
    packageConfigs[id] = config;
    target.bundledpkgs[id] = { "pxt.json": JSON.stringify(config) };
}

pxtApi.setAppTarget(target);

function createProject(pairingConfig, dependencies) {
    const host = {
        readFile(pkg, filename) {
            if (filename === "pxt.json") return JSON.stringify(pkg.config);
            if (pkg.id === "this") return filename === "main.ts" ? "" : null;

            const directory = path.join(rootDir, "libs", pkg.id);
            for (const relative of [""].concat(pkg.config.additionalFilePaths || [])) {
                const filePath = path.join(directory, relative, filename);
                if (fs.existsSync(filePath)) return fs.readFileSync(filePath, "utf8");
            }
            return null;
        }
    };
    const main = new pxtApi.MainPackage(host);
    main.config = {
        name: "bluetooth-config-test",
        dependencies: Object.fromEntries(dependencies.map(id => [id, "*"])),
        files: ["main.ts"]
    };
    if (pairingConfig) main.config.yotta = { config: pxtApi.Util.clone(pairingConfig) };
    main.isLoaded = true;

    function addDependency(id, parent) {
        if (main.deps[id]) return;
        const pkg = new pxtApi.Package(id, "*", main, parent, id);
        pkg.config = pxtApi.Util.clone(packageConfigs[id]);
        pkg.isLoaded = true;
        main.deps[id] = pkg;
        for (const dependency of Object.keys(pkg.config.dependencies)) {
            addDependency(dependency, pkg);
        }
    }

    for (const id of dependencies) addDependency(id, main);
    return main;
}

function bluetoothSettings(extensionInfo, variant) {
    if (variant === "mbdal") return extensionInfo.yotta.config.microbit_dal.bluetooth;

    const config = extensionInfo.codal.config;
    const prefix = "YOTTA_CFG_MICROBIT_DAL_BLUETOOTH_";
    return Object.fromEntries(["enabled", "open", "whitelist", "security_level"].map(key =>
        [key, config[prefix + key.toUpperCase()]]));
}

async function testPairingMode(variant, name, pairingConfig, expected) {
    const main = createProject(pairingConfig, ["core", "microphone"]);
    const conflicts = await main.findConflictsAsync(packageConfigs.bluetooth, "*");
    assert.deepStrictEqual(conflicts.map(conflict => conflict.message), [], `${variant}: ${name}`);

    const installed = createProject(pairingConfig, ["core", "microphone", "bluetooth"]);
    const info = pxtApi.cpp.getExtensionInfo(installed);
    const settings = bluetoothSettings(info, variant);
    assert.strictEqual(settings.enabled, 1, `${variant}: Bluetooth must stay enabled`);
    for (const key of Object.keys(expected)) {
        assert.strictEqual(settings[key], expected[key], `${variant}: ${name}: ${key}`);
    }
    console.log(`OK: ${variant}: ${name}`);
}

async function run() {
    const modes = packageConfigs.core.yotta.userConfigs;
    for (const variant of ["mbdal", "mbcodal"]) {
        pxtApi.setAppTargetVariant(variant);
        await testPairingMode(variant, "JustWorks", modes[1].config, {
            open: 0, whitelist: 1, security_level: "SECURITY_MODE_ENCRYPTION_NO_MITM"
        });
        await testPairingMode(variant, "no pairing", modes[0].config, {
            open: 1, whitelist: 0, security_level: undefined
        });
        await testPairingMode(variant, "default", undefined, {
            open: 0, whitelist: 1, security_level: "SECURITY_MODE_ENCRYPTION_NO_MITM"
        });
        await testPairingMode(variant, "passkey", modes[2].config, {
            open: 0, whitelist: 1, security_level: "SECURITY_MODE_ENCRYPTION_WITH_MITM"
        });

        const radioProject = createProject(undefined, ["core", "microphone", "radio"]);
        const conflicts = await radioProject.findConflictsAsync(packageConfigs.bluetooth, "*");
        assert(conflicts.some(conflict => conflict.pkg0.id === "radio"
            && conflict.settingName === "microbit-dal.bluetooth.enabled"),
        "The real radio/Bluetooth conflict must still be detected");
        assert.throws(() => pxtApi.cpp.getExtensionInfo(
            createProject(undefined, ["core", "microphone", "radio", "bluetooth"])),
        error => error instanceof pxtApi.cpp.PkgConflictError
            && error.settingName === "microbit-dal.bluetooth.enabled");
        console.log(`OK: ${variant}: radio/Bluetooth conflict preserved`);
    }
}

run().catch(error => {
    console.error(error);
    process.exitCode = 1;
});

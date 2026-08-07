"use strict";

const fs = require("fs");
const https = require("https");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const target = JSON.parse(fs.readFileSync(path.join(rootDir, "pxtarget.json"), "utf8"));
const locales = target.appTheme.availableLocales || [];
const outputRoot = path.join(rootDir, "sim", "public", "locales");
const translationApi = "https://makecode.com/api/translations";

const categoryOverrides = {
    "pt-BR": {
        "{id:category}Basic": "{id:category}BÁSICO",
        "{id:category}Input": "{id:category}ENTRADA",
        "{id:category}Music": "{id:category}MÚSICA",
        "{id:category}Led": "{id:category}LED",
        "{id:category}Radio": "{id:category}Rádio",
        "{id:category}Loops": "{id:category}LAÇOS DE REPETIÇÃO",
        "{id:category}Logic": "{id:category}LÓGICA",
        "{id:category}Variables": "{id:category}VARIÁVEIS",
        "{id:category}Math": "{id:category}MATEMÁTICA",
        "{id:category}LAÇOS DE REPETIÇÃO": "{id:category}LAÇOS DE REPETIÇÃO",
        "{id:category}LÓGICA": "{id:category}LÓGICA",
        "{id:category}VARIÁVEIS": "{id:category}VARIÁVEIS",
        "{id:category}MATEMÁTICA": "{id:category}MATEMÁTICA",
        "remainder of %1 / %2": "resto da divisão de %1 / %2",
        "{id:category}Images": "{id:category}IMAGENS",
        "{id:category}Advanced": "{id:category}Avançado",
        "{id:category}Extensions": "{id:category}Extensões",
        "Advanced": "Avançado",
        "Extensions": "Extensões"
    },
    "pt-PT": {
        "{id:category}Basic": "{id:category}Básico",
        "{id:category}Input": "{id:category}Entrada",
        "{id:category}Music": "{id:category}Música",
        "{id:category}Led": "{id:category}LED",
        "{id:category}Radio": "{id:category}Rádio",
        "{id:category}Loops": "{id:category}Ciclos",
        "{id:category}Logic": "{id:category}Lógica",
        "{id:category}Variables": "{id:category}Variáveis",
        "{id:category}Math": "{id:category}Matemática",
        "{id:category}Images": "{id:category}Imagens",
        "{id:category}Advanced": "{id:category}Avançado",
        "{id:category}Extensions": "{id:category}Extensões",
        "Advanced": "Avançado",
        "Extensions": "Extensões"
    }
};

function getJson(url, attemptsLeft = 3) {
    return new Promise((resolve, reject) => {
        const request = https.get(url, { timeout: 30000 }, response => {
            if (response.statusCode !== 200) {
                response.resume();
                reject(new Error(`HTTP ${response.statusCode} para ${url}`));
                return;
            }

            let body = "";
            response.setEncoding("utf8");
            response.on("data", chunk => body += chunk);
            response.on("end", () => {
                try {
                    resolve(JSON.parse(body));
                } catch (error) {
                    reject(new Error(`JSON inválido recebido de ${url}: ${error.message}`));
                }
            });
        });

        request.on("timeout", () => request.destroy(new Error(`Timeout ao acessar ${url}`)));
        request.on("error", error => reject(error));
    }).catch(error => {
        if (attemptsLeft <= 1) throw error;
        return getJson(url, attemptsLeft - 1);
    });
}

function translationUrl(locale, filename) {
    const query = new URLSearchParams({
        lang: locale,
        filename,
        approved: "false"
    });
    return `${translationApi}?${query.toString()}`;
}

function mergeTranslations(targetStrings, sourceStrings) {
    Object.keys(sourceStrings || {}).forEach(key => {
        const value = sourceStrings[key];
        if (value && !targetStrings[key]) targetStrings[key] = value;
    });
}

function bundledTranslationFiles() {
    const files = [];

    target.bundleddirs.forEach(directory => {
        const localeDir = path.join(rootDir, directory, "_locales");
        if (!fs.existsSync(localeDir)) return;

        fs.readdirSync(localeDir)
            .filter(filename => /-strings\.json$/i.test(filename))
            .forEach(filename => files.push(`microbit/${filename}`));
    });

    return Array.from(new Set(files));
}

function localBlockTranslations() {
    const strings = {};

    target.bundleddirs.forEach(directory => {
        const localeDir = path.join(rootDir, directory, "_locales");
        if (!fs.existsSync(localeDir)) return;

        fs.readdirSync(localeDir)
            .filter(filename => /(?<!-jsdoc)-strings\.json$/i.test(filename))
            .forEach(filename => {
                const fileStrings = JSON.parse(fs.readFileSync(path.join(localeDir, filename), "utf8"));
                Object.keys(fileStrings)
                    .filter(key => key.endsWith("|block") || key.startsWith("{id:category}"))
                    .forEach(key => strings[key] = fileStrings[key]);
            });
    });

    return strings;
}

function writeTranslations(locale, filename, translations) {
    const localeDir = path.join(outputRoot, locale);
    fs.mkdirSync(localeDir, { recursive: true });
    const ordered = {};
    Object.keys(translations).sort().forEach(key => ordered[key] = translations[key]);
    fs.writeFileSync(path.join(localeDir, filename), `${JSON.stringify(ordered, null, 2)}\n`);
}

async function buildLocale(locale, bundledFiles, blockStrings) {
    const [editorStrings, targetStrings, simulatorStrings, ...packageStrings] = await Promise.all([
        getJson(translationUrl(locale, "strings.json")),
        getJson(translationUrl(locale, "microbit/target-strings.json")),
        getJson(translationUrl(locale, "microbit/sim-strings.json")),
        ...bundledFiles.map(filename => getJson(translationUrl(locale, filename)))
    ]);

    const bundledStrings = {};
    packageStrings.forEach(strings => mergeTranslations(bundledStrings, strings));
    if (locale === "pt-BR") Object.assign(bundledStrings, blockStrings);

    const overrides = categoryOverrides[locale] || {};
    Object.assign(editorStrings, overrides);
    Object.assign(bundledStrings, overrides);

    if (!Object.keys(editorStrings).length) throw new Error(`strings.json vazio para ${locale}`);
    if (!Object.keys(bundledStrings).length) throw new Error(`bundled-strings.json vazio para ${locale}`);
    Object.keys(overrides).forEach(key => {
        if (editorStrings[key] !== overrides[key] || bundledStrings[key] !== overrides[key]) {
            throw new Error(`Override de tradução inconsistente para ${locale}: ${key}`);
        }
    });

    writeTranslations(locale, "strings.json", editorStrings);
    writeTranslations(locale, "target-strings.json", targetStrings);
    writeTranslations(locale, "sim-strings.json", simulatorStrings);
    writeTranslations(locale, "bundled-strings.json", bundledStrings);

    console.log(`${locale}: ${Object.keys(editorStrings).length} editor, ${Object.keys(targetStrings).length} target, ${Object.keys(bundledStrings).length} APIs`);
}

async function main() {
    if (!locales.length) throw new Error("Nenhum locale configurado em appTheme.availableLocales");
    const bundledFiles = bundledTranslationFiles();
    const blockStrings = localBlockTranslations();
    await Promise.all(locales.map(locale => buildLocale(locale, bundledFiles, blockStrings)));
}

main().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
});

var DisconnectResponse;
(function (DisconnectResponse) {
    DisconnectResponse[DisconnectResponse["Disconnected"] = 0] = "Disconnected";
    DisconnectResponse[DisconnectResponse["Waiting"] = 1] = "Waiting";
    DisconnectResponse[DisconnectResponse["TimedOut"] = 2] = "TimedOut";
})(DisconnectResponse || (DisconnectResponse = {}));
// Empty string for released, otherwise contains the ref or version path
const ref = `@relprefix@`.replace("---", "").replace(/^\//, "");
const pageUrl = `@targetUrl@/` + ref;
// pxtRelId is replaced with the commit hash for this release
const refCacheName = "makecode;" + ref + ";@pxtRelId@";
initWebappServiceWorker();
initWebUSB();
function initWebappServiceWorker() {
    // We don't do offline for version paths, only named releases
    const isNamedEndpoint = ref.indexOf("/") === -1;
    const cdnUrl = `@cdnUrl@`;
    const webappUrls = [
        // The current page
        pageUrl,
        `@simUrl@`,
        // webapp files
        `/pxt-microbit-dogo/semantic.js`,
        `/pxt-microbit-dogo/main.js`,
        `/pxt-microbit-dogo/pxtapp.js`,
        `/pxt-microbit-dogo/typescript.js`,
        `/pxt-microbit-dogo/marked/marked.min.js`,
        `/pxt-microbit-dogo/highlight.js/highlight.pack.js`,
        `/pxt-microbit-dogo/jquery.js`,
        `/pxt-microbit-dogo/pxtlib.js`,
        `/pxt-microbit-dogo/pxtcompiler.js`,
        `/pxt-microbit-dogo/pxtpy.js`,
        `/pxt-microbit-dogo/pxteditor.js`,
        `/pxt-microbit-dogo/pxtsim.js`,
        `/pxt-microbit-dogo/pxtembed.js`,
        `/pxt-microbit-dogo/pxtworker.js`,
        `/pxt-microbit-dogo/pxtweb.js`,
        `/pxt-microbit-dogo/blockly.css`,
        `/pxt-microbit-dogo/semantic.css`,
        `/pxt-microbit-dogo/rtlsemantic.css`,
        // blockly
        `/pxt-microbit-dogo/blockly/media/sprites.png`,
        `/pxt-microbit-dogo/blockly/media/click.mp3`,
        `/pxt-microbit-dogo/blockly/media/disconnect.wav`,
        `/pxt-microbit-dogo/blockly/media/delete.mp3`,
        // monaco; keep in sync with webapp/public/index.html
        `/pxt-microbit-dogo/vs/loader.js`,
        `/pxt-microbit-dogo/vs/base/worker/workerMain.js`,
        `/pxt-microbit-dogo/vs/basic-languages/bat/bat.js`,
        `/pxt-microbit-dogo/vs/basic-languages/cpp/cpp.js`,
        `/pxt-microbit-dogo/vs/basic-languages/python/python.js`,
        `/pxt-microbit-dogo/vs/basic-languages/markdown/markdown.js`,
        `/pxt-microbit-dogo/vs/editor/editor.main.css`,
        `/pxt-microbit-dogo/vs/editor/editor.main.js`,
        `/pxt-microbit-dogo/vs/editor/editor.main.nls.js`,
        `/pxt-microbit-dogo/vs/language/json/jsonMode.js`,
        `/pxt-microbit-dogo/vs/language/json/jsonWorker.js`,
        // charts
        `/pxt-microbit-dogo/smoothie/smoothie_compressed.js`,
        `/pxt-microbit-dogo/images/Bars_black.gif`,
        // gifjs
        `/pxt-microbit-dogo/gifjs/gif.js`,
        // ai
        `/pxt-microbit-dogo/ai.2.min.js`,
        // target
        `/pxt-microbit-dogo/target.js`,
        // music editor icons
        `/pxt-microbit-dogo/music-editor/apple.png`,
        `/pxt-microbit-dogo/music-editor/burger.png`,
        `/pxt-microbit-dogo/music-editor/cake.png`,
        `/pxt-microbit-dogo/music-editor/car.png`,
        `/pxt-microbit-dogo/music-editor/cat.png`,
        `/pxt-microbit-dogo/music-editor/cherry.png`,
        `/pxt-microbit-dogo/music-editor/clam.png`,
        `/pxt-microbit-dogo/music-editor/computer.png`,
        `/pxt-microbit-dogo/music-editor/crab.png`,
        `/pxt-microbit-dogo/music-editor/dog.png`,
        `/pxt-microbit-dogo/music-editor/duck.png`,
        `/pxt-microbit-dogo/music-editor/egg.png`,
        `/pxt-microbit-dogo/music-editor/explosion.png`,
        `/pxt-microbit-dogo/music-editor/fish.png`,
        `/pxt-microbit-dogo/music-editor/ice-cream.png`,
        `/pxt-microbit-dogo/music-editor/lemon.png`,
        `/pxt-microbit-dogo/music-editor/snake.png`,
        `/pxt-microbit-dogo/music-editor/star.png`,
        `/pxt-microbit-dogo/music-editor/strawberry.png`,
        `/pxt-microbit-dogo/music-editor/taco.png`,
        `/pxt-microbit-dogo/music-editor/bass-clef.svg`,
        `/pxt-microbit-dogo/music-editor/treble-clef.svg`,
        // These macros should be replaced by the backend
        `/pxt-microbit-dogo/fieldeditors.js`,
        `/pxt-microbit-dogo/editor.js`,
        ``,
        `@targetUrl@/pxt-microbit-dogo/monacoworker.js`,
        `@targetUrl@/pxt-microbit-dogo/worker.js`
    ];
    // Replaced by the backend by a list of encoded urls separated by semicolons
    const cachedHexFiles = decodeURLs(``);
    const cachedTargetImages = decodeURLs(`%2Fpxt-microbit-dogo%2Fdocs%2Fstatic%2Fproviders%2Fgithub-mark.png;%2Fpxt-microbit-dogo%2Fdocs%2Fstatic%2Fproviders%2Fmicrosoft-logo.svg;%2Fpxt-microbit-dogo%2Fdocs%2Fstatic%2Fproviders%2Fgoogle-logo.svg;%2Fpxt-microbit-dogo%2Fdocs%2Fstatic%2Fproviders%2Fclever-logo.png;%2Fpxt-microbit-dogo%2Fdocs%2Fstatic%2FLOGO_DOGOCODE.png;%2Fpxt-microbit-dogo%2Fdocs%2Fstatic%2Flogo.square.white.svg;%2Fpxt-microbit-dogo%2Fdocs%2Fstatic%2Flogo-dogomaker.png;%2Fpxt-microbit-dogo%2Fdocs%2Fstatic%2Fbg-dogocode.jpg;%2Fpxt-microbit-dogo%2Fdocs%2Fstatic%2Fdownload%2Ftransfer.png;%2Fpxt-microbit-dogo%2Fdocs%2Fstatic%2Fdownload%2Fconnect-microbit.gif;%2Fpxt-microbit-dogo%2Fdocs%2Fstatic%2Fdownload%2Ffull-reset.gif;%2Fpxt-microbit-dogo%2Fdocs%2Fstatic%2Fdownload%2Fselecting-microbit.gif;%2Fpxt-microbit-dogo%2Fdocs%2Fstatic%2Fdownload%2Fsuccessfully-paired.png;%2Fpxt-microbit-dogo%2Fdocs%2Fstatic%2Fdownload%2Fincompatible.png;%2Fpxt-microbit-dogo%2Fdocs%2Fstatic%2Fdownload%2Fdevice-forgotten.gif;%2Fpxt-microbit-dogo%2Fdocs%2Fstatic%2Fdownload%2Fbrowser-unpair-image.gif;%2Fpxt-microbit-dogo%2Fdocs%2Fstatic%2Fwinapp.PNG;%2Fpxt-microbit-dogo%2Fdocs%2Fstatic%2Fprofile%2Fmicrobit-cloud.png`);
    // Duplicate entries in this list will cause an exception so call dedupe
    // just in case
    const allFiles = dedupe(webappUrls.concat(cachedTargetImages)
        .map(url => url.trim())
        .filter(url => !!url && url.indexOf("@") !== 0));
    let didInstall = false;
    self.addEventListener("install", (ev) => {
        if (!isNamedEndpoint) {
            console.log("Skipping service worker install for unnamed endpoint");
            return;
        }
        didInstall = true;
        console.log("Installing service worker...");
        ev.waitUntil(caches.open(refCacheName)
            .then(cache => {
            console.log("Opened cache");
            console.log("Caching:\n" + allFiles.join("\n"));
            return cache.addAll(allFiles).then(() => cache);
        })
            .then(cache => cache.addAll(cachedHexFiles).catch(e => {
            // Hex files might return a 404 if they haven't hit the backend yet. We
            // need to catch the exception or the service worker will fail to install
            console.log("Failed to cache hexfiles");
        }))
            .then(() => self.skipWaiting()));
    });
    self.addEventListener("activate", (ev) => {
        if (!isNamedEndpoint) {
            console.log("Skipping service worker activate for unnamed endpoint");
            return;
        }
        console.log("Activating service worker...");
        ev.waitUntil(caches.keys()
            .then(cacheNames => {
            // Delete all caches that "belong" to this ref except for the current version
            const toDelete = cacheNames.filter(c => {
                const cacheRef = getRefFromCacheName(c);
                return cacheRef === null || (cacheRef === ref && c !== refCacheName);
            });
            return Promise.all(toDelete.map(name => caches.delete(name)));
        })
            .then(() => {
            if (didInstall) {
                // Only notify clients for the first activation
                didInstall = false;
                return notifyAllClientsAsync();
            }
            return Promise.resolve();
        }));
    });
    self.addEventListener("fetch", (ev) => {
        ev.respondWith(handleFetch(ev));
    });
    async function handleFetch(ev) {
        if (ev.request.url.startsWith(pageUrl)) {
            let path = ev.request.url.slice(pageUrl.length);
            if (path.startsWith("/"))
                path = path.slice(1);
            // If this is just the main page with a query parameter, attempt
            // to fetch from the network and fall back to the cache if it fails
            if (path.charAt(0) === "?") {
                let response;
                try {
                    response = await fetch(ev.request);
                    // Store this response in the cache in case the user tries
                    // to visit this same query param offline
                    const cache = await caches.open(refCacheName);
                    cache.put(ev.request, response.clone());
                }
                catch (e) {
                    // Ignore
                }
                if (response) {
                    return response;
                }
                else {
                    console.warn(`Unable to fetch ${ev.request.url}, falling back to cache`);
                }
            }
        }
        // Check to see if it's in the cache
        const match = await caches.match(ev.request);
        if (match)
            return match;
        // Fall back to the network
        const response = fetch(ev.request);
        return response;
    }
    function dedupe(urls) {
        const res = [];
        for (const url of urls) {
            if (res.indexOf(url) === -1)
                res.push(url);
        }
        return res;
    }
    function getRefFromCacheName(name) {
        const parts = name.split(";");
        if (parts.length !== 3)
            return null;
        return parts[1];
    }
    function decodeURLs(encodedURLs) {
        // Charcode 64 is '@', we need to calculate it because otherwise the minifier
        // will combine the string concatenation into @cdnUrl@ and get mangled by the backend
        const cdnEscaped = String.fromCharCode(64) + "cdnUrl" + String.fromCharCode(64);
        return dedupe(encodedURLs.split(";")
            .map(encoded => decodeURIComponent(encoded).replace(cdnEscaped, cdnUrl).trim()));
    }
    function notifyAllClientsAsync() {
        const scope = self;
        return scope.clients.claim().then(() => scope.clients.matchAll()).then(clients => {
            clients.forEach(client => client.postMessage({
                type: "serviceworker",
                state: "activated",
                ref: ref
            }));
        });
    }
}
// The ServiceWorker manages the webUSB sharing between tabs/windows in the browser. Only
// one client can connect to webUSB at a time
function initWebUSB() {
    // Webusb doesn't love it when we connect/reconnect too quickly
    const minimumLockWaitTime = 4000;
    // The ID of the client who currently has the lock on webUSB
    let lockGranted;
    let lastLockTime = 0;
    let waitingLock;
    let state = "idle";
    let pendingDisconnectResolver;
    let statusResolver;
    self.addEventListener("message", async (ev) => {
        const message = ev.data;
        if ((message === null || message === void 0 ? void 0 : message.type) === "serviceworkerclient") {
            if (message.action === "request-packet-io-lock") {
                if (!lockGranted)
                    lockGranted = await checkForExistingLockAsync();
                // Deny the lock if we are in the process of granting it to someone else
                if (state === "granting") {
                    await sendToAllClientsAsync({
                        type: "serviceworker",
                        action: "packet-io-lock-granted",
                        granted: false,
                        lock: message.lock
                    });
                    return;
                }
                console.log("Received lock request " + message.lock);
                // Throttle reconnect requests
                const timeSinceLastLock = Date.now() - lastLockTime;
                waitingLock = message.lock;
                if (timeSinceLastLock < minimumLockWaitTime) {
                    state = "waiting";
                    console.log("Waiting to grant lock request " + message.lock);
                    await delay(minimumLockWaitTime - timeSinceLastLock);
                }
                // We received a more recent request while we were waiting, so abandon this one
                if (waitingLock !== message.lock) {
                    console.log("Rejecting old lock request " + message.lock);
                    await sendToAllClientsAsync({
                        type: "serviceworker",
                        action: "packet-io-lock-granted",
                        granted: false,
                        lock: message.lock
                    });
                    return;
                }
                state = "granting";
                // First we need to tell whoever currently has the lock to disconnect
                // and poll until they have finished
                if (lockGranted) {
                    let resp;
                    do {
                        console.log("Sending disconnect request " + message.lock);
                        resp = await waitForLockDisconnectAsync();
                        if (resp === DisconnectResponse.Waiting) {
                            console.log("Waiting on disconnect request " + message.lock);
                            await delay(1000);
                        }
                    } while (resp === DisconnectResponse.Waiting);
                }
                // Now we can notify that the request has been granted
                console.log("Granted lock request " + message.lock);
                lockGranted = message.lock;
                await sendToAllClientsAsync({
                    type: "serviceworker",
                    action: "packet-io-lock-granted",
                    granted: true,
                    lock: message.lock
                });
                lastLockTime = Date.now();
                state = "idle";
            }
            else if (message.action === "release-packet-io-lock") {
                // The client released the webusb lock for some reason (e.g. went to home screen)
                console.log("Received disconnect for " + lockGranted);
                lockGranted = undefined;
                if (pendingDisconnectResolver)
                    pendingDisconnectResolver(DisconnectResponse.Disconnected);
            }
            else if (message.action === "packet-io-lock-disconnect") {
                // Response to a disconnect request we sent
                console.log("Received disconnect response for " + lockGranted);
                if (message.didDisconnect)
                    lockGranted = undefined;
                if (pendingDisconnectResolver)
                    pendingDisconnectResolver(message.didDisconnect ? DisconnectResponse.Disconnected : DisconnectResponse.Waiting);
            }
            else if (message.action === "packet-io-supported") {
                await sendToAllClientsAsync({
                    type: "serviceworker",
                    action: "packet-io-supported",
                    supported: true
                });
            }
            else if (message.action === "packet-io-status" && message.hasLock && statusResolver) {
                statusResolver(message.lock);
            }
        }
    });
    async function sendToAllClientsAsync(message) {
        const clients = await self.clients.matchAll();
        clients.forEach(c => c.postMessage(message));
    }
    // Waits for the disconnect and times-out after 5 seconds if there is no response
    function waitForLockDisconnectAsync() {
        let ref;
        const promise = new Promise((resolve) => {
            console.log("Waiting for disconnect " + lockGranted);
            pendingDisconnectResolver = resolve;
            sendToAllClientsAsync({
                type: "serviceworker",
                action: "packet-io-lock-disconnect",
                lock: lockGranted
            });
        });
        const timeoutPromise = new Promise(resolve => {
            ref = setTimeout(() => {
                console.log("Timed-out disconnect request " + lockGranted);
                resolve(DisconnectResponse.TimedOut);
            }, 5000);
        });
        return Promise.race([promise, timeoutPromise])
            .then(resp => {
            clearTimeout(ref);
            pendingDisconnectResolver = undefined;
            return resp;
        });
    }
    function checkForExistingLockAsync() {
        if (lockGranted)
            return Promise.resolve(lockGranted);
        let ref;
        const promise = new Promise(resolve => {
            console.log("check for existing lock");
            statusResolver = resolve;
            sendToAllClientsAsync({
                type: "serviceworker",
                action: "packet-io-status"
            });
        });
        const timeoutPromise = new Promise(resolve => {
            ref = setTimeout(() => {
                console.log("Timed-out check for existing lock");
                resolve(undefined);
            }, 1000);
        });
        return Promise.race([promise, timeoutPromise])
            .then(resp => {
            clearTimeout(ref);
            statusResolver = undefined;
            return resp;
        });
    }
    function delay(millis) {
        return new Promise(resolve => {
            setTimeout(resolve, millis);
        });
    }
}

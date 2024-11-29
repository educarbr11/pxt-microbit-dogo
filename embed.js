(function() {
    if (window.ksRunnerInit) return;

    // This line gets patched up by the cloud
    var pxtConfig = {
    "relprefix": "/pxt-microbit-dogo/",
    "verprefix": "",
    "workerjs": "/pxt-microbit-dogo/worker.js",
    "monacoworkerjs": "/pxt-microbit-dogo/monacoworker.js",
    "gifworkerjs": "/pxt-microbit-dogo/gifjs/gif.worker.js",
    "serviceworkerjs": "/pxt-microbit-dogo/serviceworker.js",
    "typeScriptWorkerJs": "/pxt-microbit-dogo/tsworker.js",
    "pxtVersion": "11.3.4",
    "pxtRelId": "localDirRelId",
    "pxtCdnUrl": "/pxt-microbit-dogo/",
    "commitCdnUrl": "/pxt-microbit-dogo/",
    "blobCdnUrl": "/pxt-microbit-dogo/",
    "cdnUrl": "/pxt-microbit-dogo/",
    "targetVersion": "0.0.0",
    "targetRelId": "",
    "targetUrl": "",
    "targetId": "microbit",
    "simUrl": "/pxt-microbit-dogo/simulator.html",
    "simserviceworkerUrl": "/pxt-microbit-dogo/simulatorserviceworker.js",
    "simworkerconfigUrl": "/pxt-microbit-dogo/workerConfig.js",
    "partsUrl": "/pxt-microbit-dogo/siminstructions.html",
    "runUrl": "/pxt-microbit-dogo/run.html",
    "docsUrl": "/pxt-microbit-dogo/docs.html",
    "multiUrl": "/pxt-microbit-dogo/multi.html",
    "asseteditorUrl": "/pxt-microbit-dogo/asseteditor.html",
    "isStatic": true,
    "kioskUrl": "/pxt-microbit-dogo/kiosk.html",
    "teachertoolUrl": "/pxt-microbit-dogo/teachertool.html",
    "tutorialtoolUrl": "/pxt-microbit-dogo/tutorialtool.html",
    "skillmapUrl": "/pxt-microbit-dogo/skillmap.html",
    "multiplayerUrl": "/pxt-microbit-dogo/multiplayer.html",
    "authcodeUrl": "/pxt-microbit-dogo/authcode.html"
};

    var scripts = [
        "/pxt-microbit-dogo/highlight.js/highlight.pack.js",
        "/pxt-microbit-dogo/marked/marked.min.js",
    ]

    if (typeof jQuery == "undefined")
        scripts.unshift("/pxt-microbit-dogo/jquery.js")
    if (typeof jQuery == "undefined" || !jQuery.prototype.sidebar)
        scripts.push("/pxt-microbit-dogo/semantic.js")
    if (!window.pxtTargetBundle)
        scripts.push("/pxt-microbit-dogo/target.js");
    scripts.push("/pxt-microbit-dogo/pxtembed.js");

    var pxtCallbacks = []

    window.ksRunnerReady = function(f) {
        if (pxtCallbacks == null) f()
        else pxtCallbacks.push(f)
    }

    window.ksRunnerWhenLoaded = function() {
        pxt.docs.requireHighlightJs = function() { return hljs; }
        pxt.setupWebConfig(pxtConfig || window.pxtWebConfig)
        pxt.runner.setInitCallbacks(pxtCallbacks)
        pxtCallbacks.push(function() {
            pxtCallbacks = null
        })
        pxt.runner.init();
    }

    scripts.forEach(function(src) {
        var script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.head.appendChild(script);
    })

} ())

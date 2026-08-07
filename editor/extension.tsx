/// <reference path="../node_modules/pxt-core/localtypings/pxtarget.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxtcompiler.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxtlib.d.ts" />
/// <reference path="../node_modules/pxt-core/localtypings/pxteditor.d.ts" />
/// <reference path="dapjs.d.ts" />
import * as dialogs from "./dialogs";
import * as flash from "./flash";
import * as patch from "./patch";
import { googleAnalytics } from "./analytics";

const homeHeroGalleryPath = "/dogocode-home-hero";
const portalCourseUrl = "https://app.portaldogomaker.com.br/curso/177f1593-9a9e-4268-9771-1497139958be";

function initializeHomeHeroLink() {
    document.addEventListener("click", (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const hero = target && target.closest(".getting-started-segment.hero") as HTMLElement;

        if (!hero || target.closest(".dots") || hero.style.backgroundImage.indexOf("banner-home_2.jpg") < 0) {
            return;
        }

        googleAnalytics.track("select_promotion", {
            promotion_id: "portal_dogomaker_course",
            promotion_name: "Portal DogoMaker course"
        });
        window.location.assign(portalCourseUrl);
    });
}

function initializeHomeHeroCarousel(projectView: pxt.editor.IProjectView) {
    const loadGalleryAsync = pxt.gallery.loadGalleryAsync;
    const secondBannerUrl = pxt.webConfig && pxt.webConfig.isStatic
        ? `${pxt.webConfig.relprefix}docs/static/banner-home_2.jpg`
        : "/static/banner-home_2.jpg";

    pxt.gallery.loadGalleryAsync = (name: string) => {
        if (name === homeHeroGalleryPath) {
            return Promise.resolve([{
                name: "Banners",
                cards: [{ imageUrl: secondBannerUrl, url: portalCourseUrl }]
            }]);
        }

        return loadGalleryAsync(name);
    };

    pxt.appTarget.appTheme.homeScreenHeroGallery = homeHeroGalleryPath;
    projectView.forceUpdate();
}

pxt.editor.initExtensionsAsync = function (opts: pxt.editor.ExtensionOptions): Promise<pxt.editor.ExtensionResult> {
    pxt.debug('loading microbit target extensions...')

    initializeHomeHeroCarousel(opts.projectView);
    initializeHomeHeroLink();
    googleAnalytics.initialize();

    const manyAny = Math as any;
    if (!manyAny.imul)
        manyAny.imul = function (a: number, b: number): number {
            const ah = (a >>> 16) & 0xffff;
            const al = a & 0xffff;
            const bh = (b >>> 16) & 0xffff;
            const bl = b & 0xffff;
            // the shift by 0 fixes the sign on the high part
            // the final |0 converts the unsigned value into a signed value
            return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0) | 0);
        };

    const res: pxt.editor.ExtensionResult = {
        hexFileImporters: []
    };

    pxt.usb.setFilters([{
        vendorId: 0x0D28,
        productId: 0x0204,
        classCode: 0xff,
        subclassCode: 0x03 // the ctrl pipe endpoint
    }, {
        vendorId: 0x0D28,
        productId: 0x0204,
        classCode: 0xff,
        subclassCode: 0x00 // the custom CMSIS2 endpoint
    }])

    res.mkPacketIOWrapper = flash.mkDAPLinkPacketIOWrapper;
    res.blocklyPatch = patch.patchBlocks;
    res.showProgramTooLargeErrorAsync = dialogs.showProgramTooLargeErrorAsync;
    return Promise.resolve<pxt.editor.ExtensionResult>(res);
}

import { googleAnalytics } from "./analytics";

const heroSelector = ".projectsdialog .getting-started-segment.hero";
const rotationDelayMs = 9000;
const swipeThresholdPx = 40;
const portalCourseUrl = "https://app.portaldogomaker.com.br/curso/177f1593-9a9e-4268-9771-1497139958be";

interface HeroSlide {
    imageUrl: string;
    label: string;
    url?: string;
}

class HomeHeroCarousel {
    private observer: MutationObserver;
    private hero: HTMLElement;
    private controls: HTMLElement;
    private slides: HeroSlide[];
    private activeIndex = 0;
    private timer: number;
    private pointerStartX: number;
    private suppressClickUntil = 0;

    initialize() {
        if (this.observer) return;

        this.slides = [
            { imageUrl: this.assetUrl("banner-home.jpg"), label: "Banner DogoCode" },
            { imageUrl: this.assetUrl("banner-home_2.jpg"), label: "Curso Portal DogoMaker", url: portalCourseUrl }
        ];
        this.slides.forEach(slide => {
            const image = new Image();
            image.src = slide.imageUrl;
        });

        this.observer = new MutationObserver(() => this.mount());
        this.observer.observe(document.body, { childList: true, subtree: true });
        document.addEventListener("visibilitychange", this.handleVisibilityChange);
        this.mount();
    }

    private assetUrl(filename: string) {
        return pxt.webConfig && pxt.webConfig.isStatic
            ? `${pxt.webConfig.relprefix}docs/static/${filename}`
            : `/static/${filename}`;
    }

    private mount() {
        const nextHero = document.querySelector(heroSelector) as HTMLElement;
        if (!nextHero) {
            this.unmount();
            return;
        }
        if (nextHero === this.hero && this.controls && this.controls.parentElement === nextHero) return;

        this.unmount();
        this.hero = nextHero;
        this.hero.classList.add("dogocode-hero-carousel");
        this.hero.tabIndex = 0;
        this.hero.setAttribute("role", "region");
        this.hero.setAttribute("aria-label", "Destaques DogoCode");
        this.hero.addEventListener("click", this.handleHeroClick);
        this.hero.addEventListener("keydown", this.handleKeyDown);
        this.hero.addEventListener("pointerdown", this.handlePointerDown);
        this.hero.addEventListener("pointerup", this.handlePointerUp);
        this.hero.addEventListener("pointercancel", this.handlePointerCancel);

        this.controls = document.createElement("div");
        this.controls.className = "dogocode-hero-dots";
        this.controls.setAttribute("role", "group");
        this.controls.setAttribute("aria-label", "Selecionar banner");
        this.slides.forEach((slide, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "dogocode-hero-dot";
            button.setAttribute("aria-label", `Exibir ${slide.label}`);
            button.addEventListener("click", event => {
                event.stopPropagation();
                this.show(index, true);
            });
            this.controls.appendChild(button);
        });
        this.hero.appendChild(this.controls);

        this.show(this.activeIndex, false);
    }

    private unmount() {
        this.clearTimer();
        if (!this.hero) return;

        this.hero.removeEventListener("click", this.handleHeroClick);
        this.hero.removeEventListener("keydown", this.handleKeyDown);
        this.hero.removeEventListener("pointerdown", this.handlePointerDown);
        this.hero.removeEventListener("pointerup", this.handlePointerUp);
        this.hero.removeEventListener("pointercancel", this.handlePointerCancel);
        this.hero = undefined;
        this.controls = undefined;
    }

    private show(index: number, restartTimer: boolean) {
        if (!this.hero) return;

        this.activeIndex = (index + this.slides.length) % this.slides.length;
        const slide = this.slides[this.activeIndex];
        this.hero.style.backgroundImage = `url("${slide.imageUrl}")`;
        this.hero.setAttribute("data-dogocode-hero-index", `${this.activeIndex}`);
        this.hero.setAttribute("aria-label", `Destaques DogoCode: ${slide.label}`);

        const buttons = this.controls && this.controls.querySelectorAll("button");
        if (buttons) {
            Array.prototype.forEach.call(buttons, (button: HTMLButtonElement, buttonIndex: number) => {
                const active = buttonIndex === this.activeIndex;
                button.classList.toggle("active", active);
                button.setAttribute("aria-pressed", active ? "true" : "false");
            });
        }

        if (restartTimer || !this.timer) this.scheduleNext();
    }

    private scheduleNext() {
        this.clearTimer();
        if (!document.hidden && this.hero) {
            this.timer = window.setTimeout(() => this.show(this.activeIndex + 1, true), rotationDelayMs);
        }
    }

    private clearTimer() {
        if (this.timer) window.clearTimeout(this.timer);
        this.timer = undefined;
    }

    private handleVisibilityChange = () => {
        if (document.hidden) this.clearTimer();
        else this.scheduleNext();
    };

    private handleHeroClick = (event: MouseEvent) => {
        if (Date.now() < this.suppressClickUntil || (event.target as HTMLElement).closest(".dogocode-hero-dots")) return;

        const slide = this.slides[this.activeIndex];
        if (!slide.url) return;

        googleAnalytics.track("select_promotion", {
            promotion_id: "portal_dogomaker_course",
            promotion_name: "Portal DogoMaker course"
        });
        window.location.assign(slide.url);
    };

    private handleKeyDown = (event: KeyboardEvent) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        event.stopPropagation();
        this.show(this.activeIndex + (event.key === "ArrowLeft" ? -1 : 1), true);
    };

    private handlePointerDown = (event: PointerEvent) => {
        this.pointerStartX = event.clientX;
    };

    private handlePointerUp = (event: PointerEvent) => {
        if (this.pointerStartX === undefined) return;
        const distance = event.clientX - this.pointerStartX;
        this.pointerStartX = undefined;
        if (Math.abs(distance) < swipeThresholdPx) return;

        event.preventDefault();
        event.stopPropagation();
        this.suppressClickUntil = Date.now() + 500;
        this.show(this.activeIndex + (distance < 0 ? 1 : -1), true);
    };

    private handlePointerCancel = () => {
        this.pointerStartX = undefined;
    };
}

export const homeHeroCarousel = new HomeHeroCarousel();

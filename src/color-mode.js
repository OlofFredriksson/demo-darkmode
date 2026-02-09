/* globals document window */
const htmlElement = document.documentElement;
const sessionKey = "color-mode";
const windowRef = typeof window !== "undefined" ? window : null;
const prefersDarkQuery = windowRef?.matchMedia
    ? windowRef.matchMedia("(prefers-color-scheme: dark)")
    : null;

const getStoredMode = () => {
    try {
        return sessionStorage.getItem(sessionKey);
    } catch {
        return null;
    }
};

const getCurrentMode = () =>
    htmlElement.getAttribute("data-color-mode") || "auto";

const getEffectiveMode = (mode) => {
    if (mode === "dark" || mode === "light") {
        return mode;
    }
    return prefersDarkQuery?.matches ? "dark" : "light";
};

const updateDarkModeStatus = (mode) => {
    const statusEl = document.getElementById("darkModeStatus");
    if (!statusEl) {
        return;
    }
    const effectiveMode = getEffectiveMode(mode);
    statusEl.textContent = effectiveMode === "dark" ? "On" : "Off";
};

const setWindowDarkModeFlag = (mode) => {
    if (!windowRef) {
        return;
    }
    windowRef.isDarkModeActive = getEffectiveMode(mode) === "dark";
    updateDarkModeStatus(mode);
};

const storedMode = getStoredMode();
if (storedMode) {
    htmlElement.setAttribute("data-color-mode", storedMode);
}

setWindowDarkModeFlag(getCurrentMode());

const initColorModeSelect = () => {
    const colorModeSelect = document.getElementById("colorModeSelect");
    if (!colorModeSelect) {
        return;
    }

    const initialMode = storedMode || getCurrentMode();
    colorModeSelect.value = initialMode;
    setWindowDarkModeFlag(initialMode);

    colorModeSelect.addEventListener("change", ({ target }) => {
        const nextMode = target.value;
        htmlElement.setAttribute("data-color-mode", nextMode);
        setWindowDarkModeFlag(nextMode);
        try {
            sessionStorage.setItem(sessionKey, nextMode);
        } catch {
            // Ignore storage errors
        }
    });
};

if (prefersDarkQuery) {
    prefersDarkQuery.addEventListener("change", () => {
        if (getCurrentMode() === "auto") {
            setWindowDarkModeFlag("auto");
        }
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initColorModeSelect, {
        once: true,
    });
} else {
    initColorModeSelect();
}

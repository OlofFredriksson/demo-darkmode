/* globals document */
const htmlElement = document.documentElement;
const sessionKey = "color-mode";

const getStoredMode = () => {
    try {
        return sessionStorage.getItem(sessionKey);
    } catch {
        return null;
    }
};

const storedMode = getStoredMode();
if (storedMode) {
    htmlElement.setAttribute("data-color-mode", storedMode);
}

const initColorModeSelect = () => {
    const colorModeSelect = document.getElementById("colorModeSelect");
    if (!colorModeSelect) {
        return;
    }

    const initialMode =
        storedMode || htmlElement.getAttribute("data-color-mode") || "auto";
    colorModeSelect.value = initialMode;

    colorModeSelect.addEventListener("change", ({ target }) => {
        const nextMode = target.value;
        htmlElement.setAttribute("data-color-mode", nextMode);
        try {
            sessionStorage.setItem(sessionKey, nextMode);
        } catch {
            // Ignore storage errors
        }
    });
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initColorModeSelect, {
        once: true,
    });
} else {
    initColorModeSelect();
}

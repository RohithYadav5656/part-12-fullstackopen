import { DefaultTheme } from "styled-components";

export type ColorUsage = "primary" | "default" | "warning";

export interface ButtonColorScheme {
    background: {
        default: string;
        hover: string;
        disabled: string;
    }
    text: string;
    outline: string;
}

export const LightTheme: DefaultTheme = {
    colors: {
        background: "#D7E9FF",
        foreground: "#FFFFFF",
        link: "#0066CC",
        button: {
            default: {
                background: {
                    default: "#FFFFFF",
                    hover: "#F1F1F1",
                    disabled: "#D2D2D2",
                },
                text: "inherit",
                outline: "black"
            },
            primary: {
                background: {
                    default: "#242424",
                    hover: "#444",
                    disabled: "#D2D2D2"
                },
                text: "white",
                outline: "#415784"
            },
            warning: {
                background: {
                    default: "#ff4646",
                    hover: "#c21313",
                    disabled: "#D2D2D2"
                },
                text: "white",
                outline: "black"
            }
        },
        items: {
            unlockDateUpcoming: "#F67575",
            unlockDatePassed: "#A7DF70",
            editing: "#FFFFFF"
        },
        formErrorNotification: "#FF3030",
        formErrorBackground: "#FFA0A0A0",
        unlockedBackgroundColor: "#56f956",
        lockedBackgroundColor: "#ff6d6d"
    }
}
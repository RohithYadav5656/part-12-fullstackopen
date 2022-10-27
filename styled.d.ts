import "styled-components"
import { ButtonColorScheme, ColorUsage } from "./themes";

declare module "styled-components" {
    export interface DefaultTheme {
        colors: {
            background: string;
            foreground: string;
            button: { [usage in ColorUsage]: ButtonColorScheme; },
            link: string;
            items: {
                unlockDateUpcoming: string;
                unlockDatePassed: string;
                editing: string;
            },
            formErrorNotification: string;
            formErrorBackground: string;
            unlockedBackgroundColor: string,
            lockedBackgroundColor: string;
        }
    }
}
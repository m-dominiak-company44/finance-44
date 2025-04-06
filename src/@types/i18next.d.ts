// import the original type declarations
import 'i18next';
// import all namespaces (for the default language, only)
import en from '~/locales/en/translation.json';
import pl from '~//locales/pl/translation.json';

declare module 'i18next' {
    // Extend CustomTypeOptions
    interface CustomTypeOptions {
        // custom namespace type, if you changed it
        defaultNS: 'en';
        // custom resources type
        resources: {
            en: typeof en;
            pl: typeof pl;
        };
        // other
    }
}

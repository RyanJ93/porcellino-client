import IllegalArgumentException from '../exceptions/IllegalArgumentException';
import supported_locales from '../suppport/locales/supported_locales';
import SupportedLocale from '../DTOs/SupportedLocale';
import Facade from './Facade';
import i18n from 'i18next';

class Locale extends Facade {
    /**
     * Changes the application language.
     *
     * @param {string} language
     *
     * @returns {Promise<void>}
     *
     * @throws {IllegalArgumentException} If an invalid language is given.
     */
    public static async changeLanguage(language: string): Promise<void> {
        if ( language === '' ){
            throw new IllegalArgumentException('Invalid language.');
        }
        const index = language.indexOf('-');
        if ( index > 0 ){
            language = language.substring(0, index);
        }
        await i18n.changeLanguage(language);
    }

    /**
     * Returns the code of the locale being used.
     *
     * @returns {string}
     */
    public static getCurrentLocale(): string {
        return i18n.language;
    }

    /**
     * Returns all the properties of the locale being used.
     *
     * @returns {?SupportedLocale}
     */
    public static getCurrentLocaleProperties(): SupportedLocale | null {
        let currentLocale = Locale.getCurrentLocale(), currentLocaleProperties = null, i = 0;
        while ( currentLocaleProperties === null && i < supported_locales.length ){
            if ( supported_locales[i].getCode() === currentLocale ){
                currentLocaleProperties = supported_locales[i];
            }
            i++;
        }
        return currentLocaleProperties;
    }

    /**
     * Returns all the supported locales.
     *
     * @returns {SupportedLocale[]}
     */
    public static getSupportedLocales(): readonly SupportedLocale[] {
        return supported_locales;
    }
}

export default Locale;

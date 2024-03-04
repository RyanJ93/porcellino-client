import { initReactI18next } from 'react-i18next';
import backend from 'i18next-xhr-backend';
import Locale from '../facades/Locale';
import Provider from './Provider';
import i18n from 'i18next';

class LocaleProvider implements Provider {
    private setupI18n(): Promise<any> {
        const localeSeparator = navigator.language.indexOf('-');
        const language = localeSeparator === -1 ? navigator.language : navigator.language.substr(0, localeSeparator);
        return i18n.use(initReactI18next).use(backend).init({
            fallbackLng: 'en',
            lng: language,
            backend: {
                addPath: 'locales/{{lng}}.missing.json',
                loadPath: 'locales/{{lng}}.json'
            }
        });
    }

    public async run(): Promise<void> {
        await this.setupI18n();
        await Locale.changeLanguage(i18n.language);
    }
}

export default LocaleProvider;

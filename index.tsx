import ExceptionMappingProvider from './src/providers/ExceptionMappingProvider';
import ApplicationProvider from './src/providers/ApplicationProvider';
import ProviderManager from './src/suppport/ProviderManager';
import LocaleProvider from './src/providers/LocaleProvider';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './src/common/app.scss';
import 'bootstrap';

const providerManager = ProviderManager.getInstance();
providerManager.register(new ExceptionMappingProvider());
providerManager.register(new LocaleProvider());
providerManager.register(new ApplicationProvider());

// @ts-ignore
document.addEventListener('DOMContentLoaded', () => {
    providerManager.runProviders().then(() => {
        console.log('App initialized!');
    });
});

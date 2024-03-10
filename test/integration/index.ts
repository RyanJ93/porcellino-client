import Selenium from './support/Selenium';
import './user_signup';
import './user_login';

process.on('uncaughtException', () => Selenium.disposeWebDriver().then(process.exit(0)));
process.on('SIGINT', () => Selenium.disposeWebDriver().then(process.exit(0)));
process.on('beforeExit', () => Selenium.disposeWebDriver().then(process.exit(0)));

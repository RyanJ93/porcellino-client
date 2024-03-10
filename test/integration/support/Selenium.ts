import { Browser, Builder, WebDriver } from 'selenium-webdriver';

class Selenium {
    private static webDriver?: WebDriver;

    public static async ensureSetup(): Promise<void> {
        if ( typeof Selenium.webDriver === 'undefined' ){
            let browserName: string = Browser.CHROME;
            process.argv.forEach((arg: string): void => {
                if ( arg.indexOf('--browser-name=') === 0 ){
                    browserName = arg.substring(15);
                }
            });
            Selenium.webDriver = await new Builder().forBrowser(browserName).build();
            await Selenium.webDriver.manage().setTimeouts({ implicit: 2000 });
        }
    }

    public static getWebDriver(): WebDriver | undefined {
        return Selenium.webDriver;
    }

    public static async disposeWebDriver(): Promise<void> {
        if ( typeof Selenium.webDriver !== 'undefined' ){
            await Selenium.webDriver.quit();
            Selenium.webDriver = undefined;
        }
    }
}

export default Selenium;

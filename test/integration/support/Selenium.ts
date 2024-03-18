import { Browser, Builder, By, WebDriver, WebElement, until, Key } from 'selenium-webdriver';
import { Select } from 'selenium-webdriver/lib/select';

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

    public static async clickElementBySelector(selector: string): Promise<void> {
        const element: WebElement = await (Selenium.webDriver!).findElement(By.css(selector));
        await element.click();
    }

    public static async getElementTextContent(selector: string): Promise<string> {
        const element: WebElement = await (Selenium.webDriver!).findElement(By.css(selector));
        return await element.getText();
    }

    public static async fillInputBySelector(selector: string, value: string): Promise<void> {
        const element: WebElement = await (Selenium.webDriver!).findElement(By.css(selector));
        await element.clear();
        await element.sendKeys(value);
    }

    public static async selectOptionBySelector(selector: string, label: string): Promise<void> {
        const element: WebElement = await (Selenium.webDriver!).findElement(By.css(selector));
        await new Select(element).selectByVisibleText(label);
    }

    public static async selectOptionByCustomSelectSelector(selector: string, value: string): Promise<void> {
        const element: WebElement = await (Selenium.webDriver!).findElement(By.css(selector));
        const optionSelector: string = 'ul li[role="option"][data-value="' + value + '"]';
        await element.click();
        const optionElement: WebElement = await Selenium.waitAndFind(optionSelector);
        await optionElement.click();
    }

    public static async getSelectOptionList(selector: string): Promise<string[]> {
        const element: WebElement = await (Selenium.webDriver!).findElement(By.css(selector));
        const optionSelector: string = 'ul li[role="option"]';
        await element.click();
        await Selenium.waitForSelector(optionSelector);
        const elementList: WebElement[] = await (Selenium.webDriver!).findElements(By.css(optionSelector));
        await (Selenium.webDriver!).actions().sendKeys(Key.ESCAPE).perform();
        return Promise.all(elementList.map((element) => element.getText()));
    }

    public static async getErrorMessagesInContainer(selector: string): Promise<string[]> {
        const element: WebElement = await (Selenium.webDriver!).findElement(By.css(selector));
        const elementList: WebElement[] = await element.findElements(By.css('.error-msg'));
        return await Promise.all(elementList.map((element: WebElement): Promise<string> => element.getText()));
    }

    public static async waitForSelector(selector: string, timeout: number = 10000): Promise<void> {
        const optionElement: WebElement = await (Selenium.webDriver!).findElement(By.css(selector));
        await (Selenium.webDriver!).wait(until.elementIsVisible(optionElement), timeout);
    }

    public static async waitAndFind(selector: string, timeout: number = 10000): Promise<WebElement> {
        await Selenium.waitForSelector(selector, timeout);
        return (Selenium.webDriver!).findElement(By.css(selector));
    }
}

export default Selenium;

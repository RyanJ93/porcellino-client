import { By, WebDriver, WebElement } from 'selenium-webdriver';
import { describe, before, it } from 'mocha';
import Selenium from './support/Selenium';
import { deepStrictEqual } from 'assert';

async function compileLoginForm(email: string, password: string): Promise<void> {
    const webDriver: WebDriver = Selenium.getWebDriver()!;
    const submitButtonElement: WebElement = await webDriver.findElement(By.css('button[type="submit"]'));
    const passwordElement: WebElement = await webDriver.findElement(By.name('password'));
    const emailElement: WebElement = await webDriver.findElement(By.name('email'));
    await Promise.all([passwordElement.clear(), emailElement.clear()]);
    await emailElement.sendKeys(email);
    await passwordElement.sendKeys(password);
    await submitButtonElement.click();
}

describe('Testing user login.', () => {
    before(() => Selenium.ensureSetup());

    it('Should load the authentication page.', async () => {
        const webDriver: WebDriver = Selenium.getWebDriver()!;
        await webDriver.get('https://porcellino.local');
        await webDriver.findElement(By.css('form[data-action="user.login"]'));
    });

    it('Should detect an invalid email address.', async () => {
        await compileLoginForm('test-frontend@', 'password');
        const webDriver: WebDriver = Selenium.getWebDriver()!;
        const errorLabelElement: WebElement = await webDriver.findElement(By.id('email-error-text'));
        const errorLabelText: string = await errorLabelElement.getText();
        deepStrictEqual(errorLabelText, 'You must provide your e-mail address.');
    });

    it('Should detect an invalid password.', async () => {
        await compileLoginForm('test-frontend@test.it', 'ps');
        const webDriver: WebDriver = Selenium.getWebDriver()!;
        const errorLabelElement: WebElement = await webDriver.findElement(By.id('password-error-text'));
        const errorLabelText: string = await errorLabelElement.getText();
        deepStrictEqual(errorLabelText, 'You must provide a valid password.');
    });

    it('Should detect an invalid login attempt.', async () => {
        await compileLoginForm('test-frontend@test.it', 'invalid-password');
        const webDriver: WebDriver = Selenium.getWebDriver()!;
        const errorLabelElement: WebElement = await webDriver.findElement(By.id('global-error-text'));
        const errorLabelText: string = await errorLabelElement.getText();
        deepStrictEqual(errorLabelText, 'Provided credentials are incorrect.');
    });

    it('Should authenticate the user.', async () => {
        await compileLoginForm('test-frontend@test.it', 'password');
        const webDriver: WebDriver = Selenium.getWebDriver()!;
        const elementList: WebElement[] = await webDriver.findElements(By.css('.error-msg'));
        const errorMessageList = await Promise.all(elementList.map((e) => e.getText()));
        deepStrictEqual(errorMessageList, []);
    });
});

import { By, WebDriver, WebElement } from 'selenium-webdriver';
import { describe, before, it } from 'mocha';
import Selenium from './support/Selenium';
import { deepStrictEqual } from 'assert';

async function compileSignupForm(email: string, password: string, passwordConfirm?: string): Promise<void> {
    const webDriver: WebDriver = Selenium.getWebDriver()!;
    const submitButtonElement: WebElement = await webDriver.findElement(By.css('button[type="submit"]'));
    const passwordConfirmElement: WebElement = await webDriver.findElement(By.name('password-confirm'));
    const passwordElement: WebElement = await webDriver.findElement(By.name('password'));
    const emailElement: WebElement = await webDriver.findElement(By.name('email'));
    await Promise.all([passwordConfirmElement.clear(), passwordElement.clear(), emailElement.clear()]);
    await emailElement.sendKeys(email);
    await passwordElement.sendKeys(password);
    if ( typeof passwordConfirm !== 'string' ){
        passwordConfirm = password;
    }
    await passwordConfirmElement.sendKeys(passwordConfirm);
    await submitButtonElement.click();
}

describe('Testing user signup.', async () => {
    before(() => Selenium.ensureSetup());

    it('Should load the authentication page.', async () => {
        const webDriver: WebDriver = Selenium.getWebDriver()!;
        await webDriver.get('https://porcellino.local');
        await webDriver.findElement(By.css('form[data-action="user.login"]'));
    });

    it('Should switch to the signup form.', async () => {
        const webDriver: WebDriver = Selenium.getWebDriver()!;
        const element: WebElement = await webDriver.findElement(By.linkText('Create your account!'));
        await element.click();
        await webDriver.findElement(By.css('form[data-action="user.signup"]'));
    });

    it('Should detect an invalid email address.', async () => {
        await compileSignupForm('test-frontend@', 'password');
        const webDriver: WebDriver = Selenium.getWebDriver()!;
        const errorLabelElement: WebElement = await webDriver.findElement(By.id('email-error-text'));
        const errorLabelText: string = await errorLabelElement.getText();
        deepStrictEqual(errorLabelText, 'You must provide your e-mail address.');
    });

    it('Should detect an invalid password.', async () => {
        await compileSignupForm('test-frontend@test.it', 'ps');
        const webDriver: WebDriver = Selenium.getWebDriver()!;
        const errorLabelElement: WebElement = await webDriver.findElement(By.id('password-error-text'));
        const errorLabelText: string = await errorLabelElement.getText();
        deepStrictEqual(errorLabelText, 'You must provide a valid password.');
    });

    it('Should detect an invalid password confirm.', async () => {
        await compileSignupForm('test-frontend@test.it', 'password', 'password2');
        const webDriver: WebDriver = Selenium.getWebDriver()!;
        const errorLabelElement: WebElement = await webDriver.findElement(By.id('password-confirm-error-text'));
        const errorLabelText: string = await errorLabelElement.getText();
        deepStrictEqual(errorLabelText, 'You must confirm your password.');
    });

    it('Should create a new user.', async () => {
        await compileSignupForm('test-frontend@test.it', 'password');
        const webDriver: WebDriver = Selenium.getWebDriver()!;
        const elementList: WebElement[] = await webDriver.findElements(By.css('.error-msg'));
        const errorMessageList = await Promise.all(elementList.map((e) => e.getText()));
        deepStrictEqual(errorMessageList, []);
    });

    it('Should detect an already existing user.', async () => {
        await compileSignupForm('test-frontend@test.it', 'password');
        const webDriver: WebDriver = Selenium.getWebDriver()!;
        const errorLabelElement: WebElement = await webDriver.findElement(By.id('global-error-text'));
        const errorLabelText: string = await errorLabelElement.getText();
        deepStrictEqual(errorLabelText, 'Provided e-mail address is already in use.');
    });
});

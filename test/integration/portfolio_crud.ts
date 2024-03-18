import { By, WebDriver, WebElement } from 'selenium-webdriver';
import { setTimeout } from 'node:timers/promises';
import { describe, before, it } from 'mocha';
import Selenium from './support/Selenium';
import { deepStrictEqual } from 'assert';

describe('Testing portfolio management.', async (): Promise<void> => {
    before((): Promise<void> => Selenium.ensureSetup());

    it('Should move to portfolio section.', async (): Promise<void> => {
        // const webDriver: WebDriver = Selenium.getWebDriver()!;
        // await webDriver.get('https://porcellino.local');
        await Selenium.clickElementBySelector('.hook__lateral-menu-list li[data-target="portfolio"]');
        const text: string = await Selenium.getElementTextContent('h5.hook__section-title');
        deepStrictEqual(text, 'Available portfolios');
    });

    it('Should detect an empty list of portfolio.', async (): Promise<void> => {
        const webDriver: WebDriver = Selenium.getWebDriver()!;
        await webDriver.findElement(By.css('div.hook__portfolio-list'));
        const elementList: WebElement[] = await webDriver.findElements(By.css('div.hook__portfolio-list .hook__portfolio-card'));
        deepStrictEqual(elementList, []);
    });

    it('Should open the portfolio creation dialog.', async (): Promise<void> => {
        const webDriver: WebDriver = Selenium.getWebDriver()!;
        await Selenium.clickElementBySelector('button.hook__portfolio-create-btn');
        await Selenium.waitForSelector('.hook__dialog-title');
        const title: string = await Selenium.getElementTextContent('.hook__dialog-title');
        await webDriver.findElement(By.css('.hook__portfolio-create-form'));
        deepStrictEqual(title, 'Create a new portfolio');
    });

    it('Should detect an invalid portfolio name while creating a new portfolio.', async (): Promise<void> => {
        const currencyFieldSelector: string = '.hook__portfolio-create-form div[data-input-equiv="select"][data-name="currency"]';
        const submitButtonSelector: string = '.hook__portfolio-create-form button[type="submit"]';
        const nameFieldSelector: string = '.hook__portfolio-create-form input[name="name"]';
        await Selenium.selectOptionByCustomSelectSelector(currencyFieldSelector, '3');
        await Selenium.fillInputBySelector(nameFieldSelector, '');
        await Selenium.clickElementBySelector(submitButtonSelector);
        const errorMessages: string[] = await Selenium.getErrorMessagesInContainer('.hook__portfolio-create-form');
        deepStrictEqual(errorMessages, ['Invalid name.']);
    });

    it('Should detect missing currency while creating a new portfolio.', async (): Promise<void> => {
        const submitButtonSelector: string = '.hook__portfolio-create-form button[type="submit"]';
        const nameFieldSelector: string = '.hook__portfolio-create-form input[name="name"]';
        await Selenium.fillInputBySelector(nameFieldSelector, 'Test portfolio');
        await Selenium.clickElementBySelector(submitButtonSelector);
        const errorMessages: string[] = await Selenium.getErrorMessagesInContainer('.hook__portfolio-create-form');
        deepStrictEqual(errorMessages, ['Invalid currency.']);
    });

    it('Should create a new portfolio.', async (): Promise<void> => {
        const webDriver: WebDriver = Selenium.getWebDriver()!, portfolioName: string = 'Test portfolio';
        const currencyFieldSelector: string = '.hook__portfolio-create-form div[data-input-equiv="select"][data-name="currency"]';
        const submitButtonSelector: string = '.hook__portfolio-create-form button[type="submit"]';
        const nameFieldSelector: string = '.hook__portfolio-create-form input[name="name"]';
        await Selenium.selectOptionByCustomSelectSelector(currencyFieldSelector, '3');
        await Selenium.fillInputBySelector(nameFieldSelector, portfolioName);
        await Selenium.clickElementBySelector(submitButtonSelector);
        await setTimeout(3000);
        const firstEntry: WebElement = await webDriver.findElement(By.css('div.hook__portfolio-list .hook__portfolio-card'));
        const titleElement: WebElement = await firstEntry.findElement(By.css('h5.hook__portfolio-card-title'));
        const titleContent: string = await titleElement.getText();
        deepStrictEqual(titleContent, portfolioName);
        const optionList: string[] = await Selenium.getSelectOptionList('.hook__portfolio-select');
        deepStrictEqual(optionList, ['Select a portfolio', portfolioName]);
    });

    it('Should detect a non-empty list of portfolio.', async (): Promise<void> => {
        const webDriver: WebDriver = Selenium.getWebDriver()!;
        await webDriver.findElement(By.css('div.hook__portfolio-list'));
        const elementList: WebElement[] = await webDriver.findElements(By.css('div.hook__portfolio-list .hook__portfolio-card'));
        deepStrictEqual(elementList.length, 1);
    });

    it('Should open the portfolio edit dialog.', async (): Promise<void> => {
        const webDriver: WebDriver = Selenium.getWebDriver()!;
        const firstEntry: WebElement = await webDriver.findElement(By.css('div.hook__portfolio-list .hook__portfolio-card'));
        const editButtonElement: WebElement = await firstEntry.findElement(By.css('.hook__portfolio-card-edit-btn'));
        await editButtonElement.click();
        await Selenium.waitForSelector('.hook__dialog-title');
        const title: string = await Selenium.getElementTextContent('.hook__dialog-title');
        await webDriver.findElement(By.css('.hook__portfolio-edit-form'));
        deepStrictEqual(title, 'Edit portfolio Test portfolio');
    });

    it('Should detect an invalid portfolio name while editing a new portfolio.', async (): Promise<void> => {
        const submitButtonSelector: string = '.hook__portfolio-edit-form button[type="submit"]';
        const nameFieldSelector: string = '.hook__portfolio-edit-form input[name="name"]';
        await Selenium.fillInputBySelector(nameFieldSelector, '');
        await Selenium.clickElementBySelector(submitButtonSelector);
        const errorMessages: string[] = await Selenium.getErrorMessagesInContainer('.hook__portfolio-edit-form');
        deepStrictEqual(errorMessages, ['Invalid name.']);
    });

    it('Should update a portfolio.', async (): Promise<void> => {
        const webDriver: WebDriver = Selenium.getWebDriver()!, portfolioName: string = 'Test portfolio edited';
        const submitButtonSelector: string = '.hook__portfolio-edit-form button[type="submit"]';
        const nameFieldSelector: string = '.hook__portfolio-edit-form input[name="name"]';
        await Selenium.fillInputBySelector(nameFieldSelector, portfolioName);
        await Selenium.clickElementBySelector(submitButtonSelector);
        await setTimeout(3000);
        const firstEntry: WebElement = await webDriver.findElement(By.css('div.hook__portfolio-list .hook__portfolio-card'));
        const titleElement: WebElement = await firstEntry.findElement(By.css('h5.hook__portfolio-card-title'));
        const titleContent: string = await titleElement.getText();
        deepStrictEqual(titleContent, portfolioName);
        const optionList: string[] = await Selenium.getSelectOptionList('.hook__portfolio-select');
        deepStrictEqual(optionList, ['Select a portfolio', portfolioName]);
    });

    it('Should open the portfolio delete confirm dialog.', async (): Promise<void> => {
        const webDriver: WebDriver = Selenium.getWebDriver()!;
        const firstEntry: WebElement = await webDriver.findElement(By.css('div.hook__portfolio-list .hook__portfolio-card'));
        const editButtonElement: WebElement = await firstEntry.findElement(By.css('.hook__portfolio-card-delete-btn'));
        await editButtonElement.click();
        await Selenium.waitForSelector('.hook__delete-confirm-dialog-cancel-btn');
        await Selenium.clickElementBySelector('.hook__delete-confirm-dialog-cancel-btn');
    });

    it('Should delete previously created portfolio.', async (): Promise<void> => {
        const webDriver: WebDriver = Selenium.getWebDriver()!;
        const firstEntry: WebElement = await webDriver.findElement(By.css('div.hook__portfolio-list .hook__portfolio-card'));
        const editButtonElement: WebElement = await firstEntry.findElement(By.css('.hook__portfolio-card-delete-btn'));
        await editButtonElement.click();
        await Selenium.waitForSelector('.hook__delete-confirm-dialog-cancel-btn');
        await Selenium.clickElementBySelector('.hook__delete-confirm-dialog-delete-btn');
        await setTimeout(3000);
        const elementList: WebElement[] = await webDriver.findElements(By.css('div.hook__portfolio-list .hook__portfolio-card'));
        deepStrictEqual(elementList, []);
        const optionList: string[] = await Selenium.getSelectOptionList('.hook__portfolio-select');
        deepStrictEqual(optionList, ['Select a portfolio']);
    });
});

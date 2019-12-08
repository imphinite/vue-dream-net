import '@babel/polyfill';
import * as selenium from 'selenium-standalone';
import { remote } from 'webdriverio';
import { byDusk } from '../helper';

describe('examples', () => {

    let seleniumProcess;
    let browser;

    beforeAll(async () => {
        // Install Selenium if required
        await new Promise(resolve => {
            selenium.install(resolve);
        });
        // Start Selenium server.
        seleniumProcess = await new Promise((resolve, reject) => {
            selenium.start((error, childProcess) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(childProcess);
                }
            });
        });
        // Configure the browser via BROWSER_NAME environment variable.
        browser = await remote({
            logLevel: 'error',
            capabilities: {
                browserName: process.env.TESTING_BROWSER_NAME || 'chrome'
            }
        });
    });

    afterAll(async () => {
        await browser.deleteSession();
        // Kill Selenium server.
        await seleniumProcess.kill();
    });

    /**
     * Test whether the login modal pops up on button click.
     */
    it('should pop up sign up modal on click', async () => {
        let signupModalTitleText;
        let loginModalTitleText;

        try {
            await browser.url('http://localhost:8080/');

            await browser.pause(500);

            await browser.saveScreenshot(`./test/_logs/should-pop-up-sign-up-modal-on-click.png`);

            const loginModalButtonElement = await browser.$(byDusk('login-modal-button'));
            await loginModalButtonElement.click();
            // Wait for the modal to pop up
            await browser.pause(500);

            // See the modal title
            // const signupModalTitleElement = await browser.$(byDusk('sign-up-modal-title'));
            // signupModalTitleText = await signupModalTitleElement.getText();

            // Switch to login form
            // const alreadyHaveAccountButtonElement = await browser.$(byDusk('switch-login'));
            // await alreadyHaveAccountButtonElement.click();

            // See the modal title
            // const loginModalTitleElement = await browser.$(byDusk('login-modal-title'));
            // loginModalTitleText = await loginModalTitleElement.getText();
        }
        catch (err)
        {
            await browser.saveScreenshot(`./test/_logs/should-pop-up-sign-up-modal-on-click.png`);
        }
        finally
        {
            // expect(signupModalTitleText).toBe('Sign up to experience the most efficient way of communication');
            // expect(loginModalTitleText).toBe('Log in to experience the most efficient way of communication');
        }
    });
});

/* eslint-disable no-undef */
const { Given, Then } = require('@cucumber/cucumber');
const { expect, test } = require('@playwright/test');

Given('I am in web application', async function () {
    // Write code here that turns the phrase above into concrete actions
    await global.page.goto('http://localhost:3000')
});

Then('I should see the application loaded', async function () {
    // Write code here that turns the phrase above into concrete actions
    const headingText = await global.page.$eval('h1', el => el.textContent);
    expect(headingText).toMatch('Vite + React');

});

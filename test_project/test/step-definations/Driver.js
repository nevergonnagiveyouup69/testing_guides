/* eslint-disable max-len */
const { Before, BeforeAll, AfterAll, After, BeforeStep, AfterStep, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { createCoverageMap } = require('istanbul-lib-coverage');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
global.page = null
global.admin_user_id = []

let loginPerformed = false;
setDefaultTimeout(34000);

BeforeAll(async function () {
    global.browser = await chromium.launch({
        headless: false, //make this has false if you want to visualize the browser while running the testcases.
        timeout: 24000,
        slowMo: 100,
    });
    const context = await browser.newContext({
        viewport: { height: 1080, width: 1900 }
    });
    global.page = await context.newPage();
    global.current_process_name = uuidv4()
    console.log("Current process name:", global.current_process_name);
    global.loginPerformed = false;
    try {
        global.__coverage__ = await global.page.evaluate(() => {
            return window.__coverage__;
        });
        // global.__coverage__ = await driver.executeScript("return __coverage__;");
        global.coverageMap = createCoverageMap(__coverage__);
    } catch (error) {
        throw new Error('::: __coverage__ ::: Coverage Mapping Object Not Found :::')
    }
    await global.page.coverage.startJSCoverage();
})
After(function (scenario) {
    console.log('scenario.result.status', scenario.result.status);
    let failedScenarios = path.join(__dirname, 'failedScenarios');
    if (!fs.existsSync(failedScenarios)) {
        fs.mkdirSync(failedScenarios);
    }
    if (scenario.result.status === 'FAILED') {
        const world = this;
        const uniqueId = uuidv4();
        return page.screenshot().then(function (screenShot, error) {
            if (!error) {
                world.attach(screenShot, 'image/png');
                failedScenarios = path.join(failedScenarios, `${uniqueId}_${scenario.pickle.id}_${scenario.pickle.name}.png`);
                fs.writeFile(failedScenarios, screenShot, (err) => {
                    if (err) {
                        console.error('Error writing coverage data:', err);
                    } else {
                        console.log('Coverage data has been written to:', failedScenarios);
                    }
                });
            }
        });
    }
});

AfterStep(async function () {
    const updatedCoverageData = await page.evaluate(() => window.__coverage__);
    const updatedCoverageMap = createCoverageMap(updatedCoverageData);
    global.coverageMap.merge(updatedCoverageMap);
});

AfterAll(async function () {
    const coverageDataDir = path.join(__dirname, 'coverageData');
    if (!fs.existsSync(coverageDataDir)) {
        fs.mkdirSync(coverageDataDir);
    }
    const coverageDataFile = path.join(coverageDataDir, `coverage_${global.current_process_name}.json`);
    const coverageData = global.coverageMap.toJSON();
    // Write coverage data to file
    fs.writeFile(coverageDataFile, JSON.stringify(coverageData), (err) => {
        if (err) {
            console.error('Error writing coverage data:', err);
        } else {
            console.log('Coverage data has been written to:', coverageDataFile);
        }
    });
    await browser.close();
});

const { Given, Then } = require('@cucumber/cucumber');
const { expect, chromium } = require('@playwright/test');
const fs = require('fs');
const { PNG } = require('pngjs');

// Paths to store and compare screenshots
const baselineScreenshotPath = 'test/screenshots/original/origin.png';
const newScreenshotPath = 'test/screenshots/current/current.png';
const diffScreenshotPath = 'test/screenshots/difference/diff.png';

// Dynamic import of pixelmatch
async function compareScreenshots(img1Path, img2Path, diffPath) {
    const pixelmatch = (await import('pixelmatch')).default; // Dynamically import pixelmatch
    const img1 = PNG.sync.read(fs.readFileSync(img1Path));
    const img2 = PNG.sync.read(fs.readFileSync(img2Path));
    const { width, height } = img1;
    const diff = new PNG({ width, height });

    const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });
    fs.writeFileSync(diffPath, PNG.sync.write(diff));
    return numDiffPixels;
}

// Step to take a screenshot in the web application
Given('I am in web application and I screenshot', async function () {
    
    await global.page.goto('http://localhost:3000')
    
    // Take a screenshot and save it as 'new.png'
    await page.screenshot({ path: newScreenshotPath });
});

// Step to compare the baseline screenshot with the new screenshot
Then('I compare the screenshot', async function () {  

    const numDiffPixels = await compareScreenshots(baselineScreenshotPath, newScreenshotPath, diffScreenshotPath);
    
    // Assert that there are no significant differences
    expect(numDiffPixels).toBeLessThan(400); // Adjust threshold based on tolerance
});

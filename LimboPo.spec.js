// tests/limbo.test.js
const { test, expect } = require('@playwright/test');
const LimboPage = require('../Pageobjects/limboPage');

test('Limbo test', async ({ page }) => {
    const limbo = new LimboPage(page);
    
    // Navigate to the Limbo game page
    await limbo.navigate();
    console.log('Page Title:', await page.title());

    // Set initial payout amount
    await limbo.fillInput("Payout", "4");
    
    // Adjust Payout using the slider
    await limbo.slider.fill('12'); // Adjust volume
    await limbo.fillInput("Payout", "2.40"); // Set second payout

    // Get win chance percentage according to payout 
    const resultText = await limbo.getWinChance();
    console.log(resultText);

    // Handle volume (Mute action) 
    await limbo.volumeMute();
    // Betting logic clicking on every button
    await limbo.clickButton('x2');
    await limbo.clickButton('25');
    await limbo.clickButton('/2'); // Click 'Half' button
    await limbo.clickButton('All In');
    await limbo.clickButton('Reset');

    // Attempt to place a bet < min bet amount
    await limbo.fillInput("Amount", ".50");

    await expect(limbo.betButton).toBeDisabled(true);
    await limbo.clickButton('/2');
    console.log(await limbo.checkAckMessage());

    // Out-of-range bet amount > max bet amount
    await limbo.fillInput("Amount", "200000000000000");
    await limbo.betButton.click();
    console.log(await limbo.checkAckMessage());

    // Valid bet amount <= max and >=Min bet amount
    await limbo.fillInput("Amount", "2");
    await limbo.betButton.click();
    
    // Show and hide history functionality
    await page.getByText("Show All").click();
    await page.getByText("Hide").click();

    // Auto betting setup
    await limbo.autoBetSetup();
    console.log(await limbo.checkAckMessage());

    // Perform a series of actions for navigation menus
    await limbo.VolumeUmute(); // Unmute the live game volume
    await page.locator("(//*[name()='svg'][@class='tabler-icon tabler-icon-shield-check'])[1]").click();
    await page.locator("(//*[name()='svg'][@class='tabler-icon tabler-icon-x'])[1]").click();
    console.log(await page.locator("(//div[@class='flex items-center gap-1 py-1 text-sm font-normal tracking-tight rounded-md w-fit'])[1]").textContent());

    console.log(await limbo.checkAckMessage("Auto Betting is off"));
    await page.close();
});
// pages/limboPage.js
class LimboPage 
{
    constructor(page) {
        this.page = page;
      
        // Locators
        this.payoutInput = (placeholder) => page.getByPlaceholder(placeholder);
        this.slider = page.getByRole('slider');
        this.ackMessage = page.locator('.nx-message');
        this.betButton = page.getByRole('button', { name: 'Bet', exact: true });
        this.volumeButtonMute = page.locator("svg.tabler-icon.tabler-icon-volume");
        this.VolumeButtonUmute = page.locator("svg.tabler-icon.tabler-icon-volume-off");
    
    }

    async navigate() {
        await this.page.goto("https://blastoff-fe.dev.fawk.app/gamesfdsf/9999/70004");
    }

    async fillInput(placeholder, value) {
        await this.payoutInput(placeholder).fill(value);
        await this.payoutInput(placeholder).click();
    }

    async clickButton(name) {
        await this.page.getByRole('button', { name }).click();
    }

    async getWinChance() {
        return await this.page.locator("//p[@class='p-1 px-2 font-bold text-green-600 rounded-md']").textContent();
    }

    async checkAckMessage() {
        return await this.ackMessage.textContent();
    }

    async volumeMute() {
        await this.volumeButtonMute.click();
    }
    async VolumeUmute(){
        await this.VolumeButtonUmute.click();
    }
    async autoBetSetup() {
        await this.clickButton('Auto');
        await this.fillInput('∞', '3');
        await this.page.getByRole('button', { name: '10', exact: true }).click();
        await this.fillInput('∞', '2');

        // Win/Loss betting options
        await this.page.getByRole('button', { name: 'Increase By' }).first().click();
        await this.page.locator('div').filter({ hasText: /^On win \(optional\)ResetIncrease By$/ }).getByPlaceholder('0').fill('1');
        await this.page.getByRole('button', { name: 'Increase By' }).nth(1).click();
        await this.page.locator('div').filter({ hasText: /^On lose \(optional\)ResetIncrease By$/ }).getByPlaceholder('0').fill('2');
    }
}

module.exports = LimboPage;
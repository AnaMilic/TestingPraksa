const { expect } = require("@playwright/test");

class CheckoutCompletePage {
  constructor(page) {
    this.completeText = page.getByText("Thank you for your order!");
    this.backButton = page.getByRole("button", { name: "Back Home" });
  }
  async validateOrderCompleted() {
    await expect(this.completeText).toBeVisible();
    await expect(this.backButton).toBeVisible();
  }
  async backToHomePage() {
    await this.backButton.click();
  }
}
module.exports = { CheckoutCompletePage };

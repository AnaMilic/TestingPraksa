const { expect } = require("@playwright/test");

class CheckoutPage {
  constructor(page) {
    this.checkoutForm = page.locator(".checkout_info");
    this.firstName = page.getByPlaceholder("First Name");
    this.lastName = page.getByPlaceholder("Last Name");
    this.zip = page.getByPlaceholder("Zip/Postal Code");
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.errorMessage = page.getByText("Error");
  }
  async validateCheckoutPage() {
    await expect(this.checkoutForm).toBeVisible();
  }
  async fillingFormWithInformation(firstName, lastName, zip) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.zip.fill(zip);
    await this.continueButton.click();
  }
  async fillingFormWithInvalidInformation(firstName, lastName, zip) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.zip.fill(zip);
    await this.continueButton.click();
    await expect(this.errorMessage).toBeVisible();
  }
}
module.exports = { CheckoutPage };

const { expect } = require("@playwright/test");
const firstName = "a";
const lastName = "a";
const zip = "11111";
const invalidFirstName = "";
const invalidLastName = "";
const invalidZip = "";
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
  async fillingFormWithInformation() {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.zip.fill(zip);
    await this.continueButton.click();
  }
  async fillingFormWithInvalidInformation() {
    await this.firstName.fill(invalidFirstName);
    await this.lastName.fill(invalidLastName);
    await this.zip.fill(invalidZip);
    await this.continueButton.click();
    await expect(this.errorMessage).toBeVisible();
  }
}
module.exports = { CheckoutPage };

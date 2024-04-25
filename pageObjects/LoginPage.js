const { expect } = require("@playwright/test");
const validUser = "standard_user";
const validPass = "secret_sauce";
const invalidUser = "standard_users";
const invalidPass = "secret_sauces";
class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.getByPlaceholder("Username");
    this.password = page.getByPlaceholder("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.errorMessage = page.getByText("Epic sadface");
    this.loginForm = page.locator(".login-box");
  }

  async goToLoginPage() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async validLogin() {
    await this.username.fill(validUser);
    await this.password.fill(validPass);
    await this.loginButton.click();
  }
  async invalidLogin() {
    await this.username.fill(invalidUser);
    await this.password.fill(invalidPass);
    await this.loginButton.click();
    await expect(this.errorMessage).toBeVisible();
  }

  async validateLoginPage() {
    await expect(this.loginForm).toBeVisible();
  }
}

module.exports = { LoginPage };

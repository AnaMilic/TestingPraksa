const { expect } = require("@playwright/test");
class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.getByPlaceholder("Username");
    this.password = page.getByPlaceholder("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.errorMessage = page.locator(".error-message-container");
    this.loginForm = page.locator(".login-box");
  }

  async goToLoginPage() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async validLogin(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async invalidLogin(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
    await expect(this.errorMessage).toContainText("Epic sadface");
  }

  async validateLoginPage() {
    await expect(this.loginForm).toBeVisible();
  }
}

module.exports = { LoginPage };

const { expect } = require("@playwright/test");
const user = "standard_user";
const pass = "secret_sauce";
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
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginButton.click();
  }
  async invalidLogin() {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginButton.click();
    await expect(this.errorMessage).toBeVisible();
  }

  async validateLoginPage() {
    await expect(this.loginForm).toBeVisible();
  }
}

module.exports = { LoginPage };

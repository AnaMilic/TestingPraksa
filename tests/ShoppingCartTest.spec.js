const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pageObjects/LoginPage");
const { HomePage } = require("../pageObjects/HomePage");

test.beforeEach("Login to the home page", async ({ page }) => {
  const username = "standard_user";
  const password = "secret_sauce";
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  await loginPage.goToLoginPage();
  await loginPage.validLogin(username, password);
  await homePage.validateHomePage();
});

test("Add item to the shopping cart test 1", async ({ page }) => {
  const homePage = new HomePage(page);
  const itemLabel = "Sauce Labs Onesie";
  const removeBtn = "#remove-sauce-labs-onesie";
  await homePage.addItemToTheCart(itemLabel);
  await homePage.visibleRemoveButton(removeBtn);
});

test("Add item to the shopping cart test 2", async ({ page }) => {
  const itemLabel = "Sauce Labs Onesie";
  const homePage = new HomePage(page);
  await homePage.addItemToTheCart(itemLabel);
  await homePage.navigateToCart(itemLabel);
});

test.only("Remove item from the shopping cart test 1", async ({ page }) => {
  const itemLabel = "Sauce Labs Onesie";
  const addBtn = "#add-to-cart-sauce-labs-onesie";
  const removeBtn = "#remove-sauce-labs-onesie";
  const homePage = new HomePage(page);
  await homePage.addItemToTheCart(itemLabel);
  await homePage.removeItemFromTheList(addBtn, removeBtn);
});

test("Remove item from the shopping cart test 2", async ({ page }) => {
  const itemLabel = "Sauce Labs Onesie";
  const removeBtn = "#remove-sauce-labs-onesie";
  const homePage = new HomePage(page);
  await homePage.addItemToTheCart(itemLabel);
  await homePage.navigateToCart(itemLabel);
  await homePage.removeItemFromTheCart(removeBtn, itemLabel);
});

//napraviti za ceo flow - login, add, checkout - sve do kraja sto ima

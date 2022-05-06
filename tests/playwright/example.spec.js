const { test, expect } = require('@playwright/test');
const baseUrl = 'http://localhost:4200';

test.describe('All Tests', () => {

    test.beforeEach(async ({ page }) => {
        // Go to the starting url before each test.
        await page.goto(baseUrl);
        await expect(page).toHaveURL(baseUrl);

      });

    test('Test 01 | Visiting Home Page', async ({ page }) => {
        
        await expect(page.locator('nav')).toHaveClass('menu');
        await expect(page.locator('h1')).toHaveText('MagicCastles');
        await expect(page.locator('h2')).toHaveText('Welcome to Magic Castles!');
        await expect(page.locator('.jumbo a.button')).toHaveText('About Us');
        await page.locator('.jumbo a.button').click();
        await expect(page).toHaveURL(baseUrl + '/about');
    });

    test('Test 02 | navigating using the nav-bar', async ({ page }) =>  {
        // await page.goto(baseUrl);
        // await expect(page).toHaveURL(baseUrl);
        await expect(page.locator('nav')).toHaveClass('menu');

        await expect(page.locator('nav a.menu-index')).toHaveText('MagicCastles');
        await expect(page.locator('nav a.menu-about')).toHaveText('About');
        await expect(page.locator('nav a.menu-contact')).toHaveText('Contact');

        await page.locator('nav a.menu-about').click();
        await expect(page).toHaveURL(baseUrl + '/about');

        await page.locator('nav a.menu-contact').click();
        await expect(page).toHaveURL(baseUrl + '/getting-in-touch');

        await page.locator('nav a.menu-index').click();
        await expect(page).toHaveURL(baseUrl);
    });

    test('Test 03 | updates the results based on search query', async ({ page }) =>   {
    
        await expect(page.locator('.rentals')).toBeVisible();
        await expect(page.locator('.rentals input')).toBeVisible();
        
        await page.fill('.rentals input', 'Fortress');
        await expect(page.locator('.rentals > .results')).toBeVisible();
        await expect(page.locator('.rentals > .results li')).toHaveCount(1);
        await expect(page.locator('.rentals > .results li')).toContainText('Grand Old Fortress');

        await page.fill('.rentals input', 'Stronghold');
        await expect(page.locator('.rentals > .results')).toBeVisible();
        await expect(page.locator('.rentals > .results li')).toHaveCount(1);
        await expect(page.locator('.rentals > .results li')).toContainText('Urban Stronghold');

        await page.fill('.rentals input', 'Citadel');
        await expect(page.locator('.rentals > .results')).toBeVisible();
        await expect(page.locator('.rentals > .results li')).toHaveCount(1);
        await expect(page.locator('.rentals > .results li')).toContainText('Downtown Citadel');
   
      });

  });


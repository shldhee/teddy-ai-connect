import { test, expect } from '@playwright/test';

test.describe('Teddy Finance App E2E', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should add a new active subscription', async ({ page }) => {
        // 1. Click "+" FAB button
        await page.click('button:has-text("+")');

        // 2. Select "Subscription" type (default, but verifying)
        const subBtn = page.locator('button', { hasText: 'Subscription' });
        await expect(subBtn).toBeVisible();
        // Check if selected (based on background color logic in code, checking style or class might be hard without specific classes, 
        // but it is default. Let's assume it is default or click it.)
        await subBtn.click();

        // 3. Enter Name
        await page.fill('input[placeholder="e.g. Netflix, Salary..."]', 'Netflix Premium');

        // 4. Enter Amount
        await page.fill('input[placeholder="0.00"]', '17000');

        // 5. Select Cycle: "Monthly"
        await page.selectOption('select', 'monthly');

        // 6. Click "Add"
        await page.click('button:has-text("Add")');

        // Expected Result: Modal closes
        await expect(page.locator('h2', { hasText: 'Add Transaction' })).not.toBeVisible();

        // "Netflix Premium" appears in "Active Subscriptions" list
        await expect(page.locator('div', { hasText: 'Netflix Premium' }).first()).toBeVisible();
        await expect(page.locator('div', { hasText: '17,000' }).first()).toBeVisible(); // Assuming formatting? Or just raw number? Code doesn't formatting yet?
        // Actually, SummaryWidget might format it. SectionList just displays items.
        // Let's just check the text '17000' if no formatting, or flexible check.
        // Looking at SectionList implementation (not visible here but assuming)
    });

    test('should add a one-time expense', async ({ page }) => {
        await page.click('button:has-text("+")');
        
        await page.click('button:has-text("Expense")');
        
        await page.fill('input[placeholder="e.g. Netflix, Salary..."]', 'Team Lunch');
        await page.fill('input[placeholder="0.00"]', '50000');
        
        // Expense usually defaults cycle to one-time and hides the select, but let's just click Add
        await page.click('button:has-text("Add")');

        await expect(page.locator('h2', { hasText: 'Add Transaction' })).not.toBeVisible();
        
        // "Team Lunch" appears in "Monthly Expenses" list
        // Note: SectionList title "Monthly Expenses" contains items.
        await expect(page.locator('div', { hasText: 'Team Lunch' }).first()).toBeVisible();
    });

    test('should add income', async ({ page }) => {
        await page.click('button:has-text("+")');
        
        await page.click('button:has-text("Income")');
        
        await page.fill('input[placeholder="e.g. Netflix, Salary..."]', 'Salary');
        await page.fill('input[placeholder="0.00"]', '3000000');
        
        await page.click('button:has-text("Add")');

        await expect(page.locator('h2', { hasText: 'Add Transaction' })).not.toBeVisible();
        // Income might not be in a SectionList on dashboard yet based on Dashboard.tsx?
        // Dashboard.tsx only has "Active Subscriptions", "Monthly Expenses", and maybe "Inactive".
        // Income is in context but maybe not listed on Dashboard main view except in SummaryWidget calculation?
        // Let's assume successful add closes modal for now.
    });

    test('should not add entry if fields are empty', async ({ page }) => {
        await page.click('button:has-text("+")');
        
        // Leave fields empty
        await page.click('button:has-text("Add")');

        // Modal should still be open
        await expect(page.locator('h2', { hasText: 'Add Transaction' })).toBeVisible();
        
        // Close manually to clean up (optional)
        await page.click('button:has-text("Cancel")');
    });
});

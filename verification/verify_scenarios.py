from playwright.sync_api import sync_playwright, expect

def verify_scenario_switching(page):
    page.goto('http://localhost:5173')

    # Wait for the app to load
    page.wait_for_selector('h3:has-text("Scenario")')

    # 1. Verify "Empty Month" scenario is loaded by default

    # In 'empty-month', selectedDate is the 1st.
    # We want to verify that the cell for '1' is selected.
    # CSS modules mangle names but typically vite handles them.
    # However, since we are using CSS modules, the class names in DOM will be hashed.
    # But we can look for styles or assume partial match if not mangled too much,
    # OR better: use the structure.
    # The 'selected' class is conditionally applied.

    # Let's inspect the page source structure via screenshot if this fails,
    # but let's try to target the cell that contains '1' and check if it looks selected.
    # Actually, we can check for the data attribute or computed style if needed,
    # but let's rely on the fact that the 'selected' class is appended to the className string.
    # If using CSS modules, 'styles.selected' resolves to something like '_selected_xxxxx'.

    # Wait for ANY day cell to appear
    page.wait_for_selector('[class*="_dayCell_"]')

    # Find the day cell with text "1"
    cell_1 = page.locator('[class*="_dayCell_"]').filter(has_text="1").first

    # Check if it has a class containing "selected"
    # Note: CSS module classes usually start with the name of the file or class.
    # Let's just screenshot first to see what's going on.
    page.screenshot(path='verification/debug_start.png')

    # 2. Switch to "Busy Month"
    page.select_option('select:has-text("Empty Month")', value='busy-month')

    # Wait for update. "Busy Month" selects the 8th.
    cell_8 = page.locator('[class*="_dayCell_"]').filter(has_text="8").first

    # Check for dots. The dots div has class 'eventDots' in source,
    # likely '_eventDots_...' in DOM.
    expect(cell_8.locator('[class*="_eventDots_"]')).to_be_visible()

    # Take a screenshot of the busy state
    page.screenshot(path='verification/2-busy-scenario.png')

if __name__ == '__main__':
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify_scenario_switching(page)
            print("Verification successful!")
        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path='verification/error.png')
        finally:
            browser.close()

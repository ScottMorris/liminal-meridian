from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:5173")

    # Wait for the app to load - using a selector that exists in the new UI
    # The text "Top: 1600 x 960" might have been replaced by the actual TopSurface content.
    # I should check for content inside TopSurface, e.g., "Image / Artwork" or "Next Up"
    try:
        page.wait_for_selector('text=Image / Artwork', timeout=5000)
    except:
        print("Could not find 'Image / Artwork', dumping page content...")
        print(page.content())

    # Take a screenshot
    page.screenshot(path="verification/simulator.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)

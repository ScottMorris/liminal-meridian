from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:5173")

    # Wait for the app to load
    try:
        page.wait_for_selector('text=Image / Artwork', timeout=5000)
    except:
        print("Could not find 'Image / Artwork', dumping page content...")
        print(page.content())

    # 1. Default State
    page.screenshot(path="verification/simulator_default.png")
    print("Screenshot saved: verification/simulator_default.png")

    # 2. Enable Bezel Crop
    page.get_by_label("Enable Bezel Crop").check()
    page.wait_for_timeout(500) # Wait for re-render
    page.screenshot(path="verification/simulator_cropped.png")
    print("Screenshot saved: verification/simulator_cropped.png")

    # 3. Custom Insets
    page.get_by_label("Left Inset (px)").fill("100")
    page.get_by_label("Right Inset (px)").fill("50")
    page.wait_for_timeout(500)
    page.screenshot(path="verification/simulator_custom_insets.png")
    print("Screenshot saved: verification/simulator_custom_insets.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)

import time
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        # iPhone 12 Pro dimensions: 390x844
        iphone = p.devices['iPhone 12 Pro']
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(**iphone)
        page = context.new_page()

        page.on("console", lambda msg: print(f"Console: {msg.text}"))

        print("Navigating...")
        for i in range(10):
            try:
                page.goto("http://localhost:5173")
                break
            except:
                time.sleep(1)

        print("Page loaded")
        time.sleep(2)

        try:
            page.wait_for_selector(".board-wrapper", timeout=10000)
        except Exception as e:
            print(f"Selector not found: {e}")
            page.screenshot(path="debug_page.png")
            print("Screenshot saved to debug_page.png")
            print(page.content())
            browser.close()
            return

        # Cell (3,3) is index 3*15 + 3 = 48
        cell_index = 3 * 15 + 3
        cells = page.locator("rect")
        count = cells.count()
        print(f"Found {count} rects")

        if count <= cell_index:
             print("Not enough rects found!")
             return

        cell = cells.nth(cell_index)

        # Get cell bounding box before click
        box_before = cell.bounding_box()
        print(f"Cell before: {box_before}")

        # Click
        print("Clicking cell...")
        cell.click()

        # Wait for animation (0.4s)
        time.sleep(1)

        # Get cell bounding box after click
        box_after = cell.bounding_box()
        print(f"Cell after: {box_after}")

        # Get wrapper bounding box
        wrapper = page.locator(".board-wrapper")
        wrapper_box = wrapper.bounding_box()
        print(f"Wrapper: {wrapper_box}")

        # Check if cell center matches wrapper center
        cell_center_x = box_after['x'] + box_after['width'] / 2
        cell_center_y = box_after['y'] + box_after['height'] / 2

        wrapper_center_x = wrapper_box['x'] + wrapper_box['width'] / 2
        wrapper_center_y = wrapper_box['y'] + wrapper_box['height'] / 2

        print(f"Cell center: ({cell_center_x}, {cell_center_y})")
        print(f"Wrapper center: ({wrapper_center_x}, {wrapper_center_y})")

        diff_x = abs(cell_center_x - wrapper_center_x)
        diff_y = abs(cell_center_y - wrapper_center_y)

        print(f"Diff: ({diff_x}, {diff_y})")

        # Screenshot
        page.screenshot(path="reproduce_issue.png")

        browser.close()

if __name__ == "__main__":
    run()

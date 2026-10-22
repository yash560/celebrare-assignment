import os
import time
import subprocess
from playwright.sync_api import sync_playwright

def record():
    temp_video_dir = '/tmp/celebrare_walkthrough_raw'
    os.makedirs(temp_video_dir, exist_ok=True)
    out_video_path = '/home/opc/brane/memory/assets/assignments/celebrare/celebrare_walkthrough.mp4'
    audio_path = '/tmp/celebrare_audio/narration_full.mp3'

    print("Launching Playwright to capture presentation video...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={'width': 1440, 'height': 900},
            record_video_dir=temp_video_dir,
            record_video_size={'width': 1440, 'height': 900}
        )
        page = context.new_page()

        print("Navigating to http://localhost:3999...")
        page.goto("http://localhost:3999", wait_until="networkidle")

        # --- SECTION 1: INTRO (~37s) ---
        print("Running Section 1: Intro...")
        page.wait_for_selector("#gallery-grid", timeout=10000)
        time.sleep(5)
        # Smooth scroll through top header and hero
        page.mouse.wheel(0, 300)
        time.sleep(5)
        page.mouse.wheel(0, 400)
        time.sleep(5)
        page.mouse.wheel(0, -700)
        time.sleep(10)
        time.sleep(12)

        # --- SECTION 2: DEMO (~75s) ---
        print("Running Section 2: Interactive Demo...")
        # Search filter typing
        search_input = page.locator("#author-search-input")
        search_input.click()
        time.sleep(1)
        search_input.type("Alejandro", delay=120)
        time.sleep(4)
        # Clear search
        page.locator("#clear-search-btn").click()
        time.sleep(2)
        search_input.type("Dan", delay=120)
        time.sleep(3)
        page.locator("#clear-search-btn").click()
        time.sleep(2)

        # Toggle favourites on 3 cards
        print("Toggling favourites...")
        cards = page.locator("[data-testid^='photo-card-']")
        cards.nth(0).locator("[data-testid^='favourite-btn-']").click()
        time.sleep(1.5)
        cards.nth(1).locator("[data-testid^='favourite-btn-']").click()
        time.sleep(1.5)
        cards.nth(4).locator("[data-testid^='favourite-btn-']").click()
        time.sleep(2)

        # Switch to favourites tab
        page.locator("#filter-favourites-btn").click()
        time.sleep(4)
        page.mouse.wheel(0, 200)
        time.sleep(3)
        page.mouse.wheel(0, -200)
        time.sleep(2)

        # Refresh page to prove persistence
        print("Refreshing page to demonstrate localStorage persistence...")
        page.reload(wait_until="networkidle")
        time.sleep(3)
        page.locator("#filter-favourites-btn").click()
        time.sleep(3)
        page.locator("#filter-all-btn").click()
        time.sleep(2)

        # Dark mode toggle
        print("Toggling dark/light modes...")
        theme_btn = page.locator("#theme-toggle-btn")
        theme_btn.click() # to light
        time.sleep(3)
        theme_btn.click() # to dark
        time.sleep(3)

        # Open Photo Lightbox Modal
        print("Opening photo preview modal...")
        cards.nth(0).click()
        time.sleep(4)
        page.locator("#modal-close-btn").click()
        time.sleep(2)
        time.sleep(20)

        # --- SECTION 3: USEFETCHPHOTOS HOOK (~49s) ---
        print("Running Section 3: useFetchPhotos hook walkthrough...")
        page.locator("#explainer-btn").click()
        time.sleep(2)
        page.locator("button:has-text('2. useFetchPhotos')").click()
        time.sleep(6)
        page.mouse.wheel(0, 150)
        time.sleep(8)
        page.mouse.wheel(0, 150)
        time.sleep(10)
        time.sleep(23)

        # --- SECTION 4: USEREDUCER (~49s) ---
        print("Running Section 4: useReducer state walkthrough...")
        page.locator("button:has-text('3. useReducer vs State')").click()
        time.sleep(5)
        page.mouse.wheel(0, 150)
        time.sleep(8)
        page.mouse.wheel(0, 150)
        time.sleep(10)
        time.sleep(26)

        # --- SECTION 5: USECALLBACK & USEMEMO (~57s) ---
        print("Running Section 5: useCallback and useMemo walkthrough...")
        page.locator("button:has-text('4. useCallback & useMemo')").click()
        time.sleep(5)
        page.mouse.wheel(0, 150)
        time.sleep(8)
        page.mouse.wheel(0, 150)
        time.sleep(12)
        time.sleep(32)

        # --- SECTION 6: TECHNICAL CHALLENGE (~56s) ---
        print("Running Section 6: Technical Challenge walkthrough...")
        page.locator("button:has-text('5. Technical Challenge')").click()
        time.sleep(6)
        page.mouse.wheel(0, 150)
        time.sleep(10)
        page.locator("button:has-text('Close Guide')").click()
        time.sleep(3)
        page.mouse.wheel(0, -600)
        time.sleep(15)
        time.sleep(22)

        # Finalize video recording
        print("Closing browser context...")
        page.close()
        context.close()
        browser.close()

    # Find the recorded webm file
    recorded_files = [f for f in os.listdir(temp_video_dir) if f.endswith('.webm')]
    if not recorded_files:
        raise RuntimeError("No recorded video found in temp dir")

    raw_video = os.path.join(temp_video_dir, recorded_files[0])
    print(f"Raw video recorded at {raw_video}")

    # Multiplex with narration audio using ffmpeg
    print("Muxing video with narration audio track...")
    cmd = f"ffmpeg -y -i {raw_video} -i {audio_path} -c:v libx264 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest {out_video_path}"
    subprocess.run(cmd, shell=True, check=True)
    print(f"✅ Final video generated at: {out_video_path}")

if __name__ == '__main__':
    record()

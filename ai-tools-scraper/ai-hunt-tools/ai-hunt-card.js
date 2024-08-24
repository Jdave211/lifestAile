import { launch } from 'puppeteer';
import { writeFileSync, readFileSync } from 'fs';
// import { tree } from 'next/dist/build/templates/app-page';

// Helper function to wait for a specified time
const waitForTimeout = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

(async () => {
  const browser = await launch({ headless: true });
  const page = await browser.newPage();

  // Read categories from the categories.json file
  const categories = JSON.parse(readFileSync('categories.json', 'utf-8'));
  const allData = new Set();
  let globalSerialNumber = 1; // Global serial number counter

  for (const category of categories) {
    const url = `https://www.aitoolhunt.com/?category=${category}`;
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 70000 }); // Increased timeout to 70 seconds

      let previousHeight;
      while (true) {
        previousHeight = await page.evaluate('document.body.scrollHeight');
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
        await waitForTimeout(3000); // Wait for new content to load
        const newHeight = await page.evaluate('document.body.scrollHeight');
        if (newHeight === previousHeight) break;
      }

      const data = await page.evaluate((globalSerialNumber) => {
        const result = [];
        document.querySelectorAll(".relative.bg-foreground").forEach((item, index) => {
          const titleElement = item.querySelector('h3 a');
          const name = titleElement ? titleElement.textContent.trim() : '';
          const imgElement = item.querySelector("img");
          const imgUrl = imgElement ? imgElement.src : "";
          const cardUrl = item.querySelector("a")?.href || "";
          const cardDesc = item.querySelector(".text-general_text.leading-relaxed")?.textContent.trim() || "";
          const toolUrl = item.querySelector(".text-center.rounded.cursor-pointer.font-normal")?.href || "";

          if (imgUrl && name) {
            result.push({
              toolNo: globalSerialNumber + index,
              name,
              cardDesc,
              cardUrl,
              imgUrl,
              toolUrl
            });
          }
        });
        return result;
      }, globalSerialNumber);

      data.forEach((item) => allData.add(JSON.stringify({ ...item, category })));

      globalSerialNumber += data.length; // Update the global serial number counter

      console.log(`Category ${category} scraped`);
    } catch (error) {
      console.error(`Error scraping category ${category}:`);
      continue; 
   // Skip the category if an error occurs
    }
  }

  const structuredData = Array.from(allData).map((item) => JSON.parse(item));

  writeFileSync('ai-tool-hunt-card.json', JSON.stringify(structuredData, null, 2));

  console.log('All data has been saved to ai-tool-hunt-card-data.json');

  await browser.close();
})();

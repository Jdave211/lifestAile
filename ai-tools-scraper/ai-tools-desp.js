import { launch } from 'puppeteer';
import { readFileSync, writeFileSync } from 'fs';

(async () => {
  const browser = await launch({ headless: true });
  const page = await browser.newPage();
  const toolsData = JSON.parse(readFileSync('ai-tools-scrap-data.json', 'utf-8'));
  const allData = [];
  let errorCount = 0;

  const navigateToPage = async (url) => {
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    } catch (error) {
      console.error(`Navigation to ${url} failed:`, error);
      return false;
    }
    return true;
  };

  try {
    for (let i = 0; i < toolsData.length; i++) {
      const { name: toolName, cardUrl, price, rating, category, subcategory, imgUrl, cardDesc } = toolsData[i];
      const pageLoaded = await navigateToPage(cardUrl);
      if (!pageLoaded) {
        console.log(`Skipping ${toolName} due to loading issues.`);
        continue;
      }
      try {
        const data = await page.evaluate((toolName, price, rating, category, subcategory, imgUrl, cardDesc) => {
          const name = toolName;
          const descElement = document.querySelector('.tools-rich-text');
          const desc = descElement ? descElement.textContent.trim().replace(/\n/g, '') : '';
          const links = Array.from(document.querySelectorAll('.cms-link'));
          const correctLink = links.find(link => link.textContent.includes('Visit Tool') || link.getAttribute('data-role') === 'primary-link');
          const toolUrl = correctLink ? correctLink.href : null;
          return { name, desc, toolUrl, price, rating, category, subcategory, imgUrl, cardDesc };
        }, toolName, price, rating, category, subcategory, imgUrl, cardDesc);

        if (data.toolUrl) {
          allData.push(data);
          console.log(`Tool ${toolName} scraped: ${i}`);
        } else {
          console.log(`Skipping ${toolName} due to missing URL.`);
        }
      } catch (error) {
        console.error(`Error finding necessary elements on ${toolName} page: ${errorCount++}`, error);
        continue;
      }
    }
    writeFileSync('ai-tools-desp-data.json', JSON.stringify(allData, null, 2));
  } catch (error) {
    console.error(`Error during scraping: ${errorCount++}`, error);
  } finally {
    await browser.close();
  }
})();

import { launch } from 'puppeteer';
import { writeFileSync, readFileSync } from 'fs';

(async () => {
  const browser = await launch({ headless: false });
  const page = await browser.newPage();


  const existingData = JSON.parse(readFileSync('ai-tool-hunt-card-data.json', 'utf-8'));
  const newData = [];

  for (const tool of existingData) {
    try {
      await page.goto(tool.cardUrl, { waitUntil: 'domcontentloaded', timeout: 70000 }); 
      const scrapedData = await page.evaluate(() => {
        const descElement = document.querySelector('.px-4.py-3.pt-5.pb-8.rounded-lg p');
        const description = descElement ? descElement.textContent.trim() : '';
        return { description };
      });

      newData.push({
        name: tool.name,
        imgUrl: tool.imgUrl,
        cardDesc: tool.cardDesc,
        toolUrl: tool.toolUrl,
        desc: scrapedData.description,
        category: tool.category,
        subcategory: tool.subcategory || '',
        price: tool.price || '', 
        rating: tool.rating || '', 
      });

      console.log(`Scraped data for ${tool.name}`);
    } catch (error) {
      console.error(`Error scraping data for ${tool.name} (${tool.cardUrl}):`);
      continue; 
    }
  }

  writeFileSync('ai-hunt-tools-details.json', JSON.stringify(newData, null, 2));

  console.log('All data has been saved to ai-tools-details.json');

  await browser.close();
})();

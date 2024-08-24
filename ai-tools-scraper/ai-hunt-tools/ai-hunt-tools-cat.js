
import { launch } from 'puppeteer';
import fs from 'fs';

(async () => {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto('https://www.aitoolhunt.com/');

   
    const categories = await page.$$eval('label.text-sidebar_text.block.w-full.text-left', divs => {
        return divs.flatMap(div => {
           
            const paragraphs = div.querySelectorAll('p');
            return Array.from(paragraphs).flatMap(p => {
                return p.textContent.split(',').map(cat => cat.replace(/^[^\w\s]*/, '').trim());
            });
        });
    });

  
    fs.writeFile('categories.json', JSON.stringify(categories, null, 2), (err) => {
        if (err) throw err;
        console.log('Data has been written to categories.json');
    });

    await browser.close();
})();
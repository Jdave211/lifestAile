// import { launch } from "puppeteer";
// import { writeFileSync } from "fs";

// (async () => {
//   const browser = await launch({ headless: true });
//   const page = await browser.newPage();

//   const allData = new Set();
//   const totalPages = 47;

//   for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
//     const url = `https://allthingsai.com/marketplace?22022970_page=${pageNumber}`;
//     await page.goto(url, { waitUntil: "domcontentloaded" });
//     const data = await page.evaluate(() => {
//       const result = [];
//       document.querySelectorAll(".tool-card-v3").forEach((item, index) => {
//         const imgElement = item.querySelector("img");
//         const imgUrl = imgElement ? imgElement.src : "";
//         const name =
//           item.querySelector(".text-style-1lines")?.textContent.trim() || "";
//         const cardDesc =
//           item.querySelector(".text-style-2lines")?.textContent.trim() || "";
//         const cardUrl =
//           item.querySelector(".cms-link.w-inline-block")?.href || "";
//         const category =
//           item
//             .querySelector(".text-size-small:not(.text-style-2lines)")
//             ?.textContent.trim() || "";
//         const subcategoryContainer = item.querySelector(
//           ".marketplace-tags-list"
//         );
//         const subcategory = subcategoryContainer
//           ? Array.from(
//               subcategoryContainer.querySelectorAll(".text-size-tiny")
//             ).map((sub) => sub.textContent.trim())
//           : [];
//         const priceElement = item.querySelector(".text-size-regular");
//         const price = priceElement ? priceElement.textContent.trim() : "N/A";
//         const ratingElement = item.querySelector(".card-rating");
//         const activeStars = ratingElement
//           ? Array.from(
//               ratingElement.querySelectorAll(".fs_starrating_main")
//             ).filter(
//               (star) =>
//                 star.classList.contains("is-active-starrating") &&
//                 !star.classList.contains("w-condition-invisible")
//             ).length
//           : 0;
//         const rating = activeStars;

//         if (name && cardUrl) {
//           result.push({
//             name,
//             cardDesc,
//             cardUrl,
//             category,
//             subcategory,
//             imgUrl,
//             rating,
//             price,
//           });
//         }
//       });
//       return result;
//     });

//     data.forEach((item) => allData.add(JSON.stringify(item)));

//     console.log(`Page ${pageNumber} scraped`);
//   }

//   const structuredData = Array.from(allData).map((item) => JSON.parse(item));

//   writeFileSync("ai-tools-scrap-data.json", JSON.stringify(structuredData, null, 2));

//   console.log("All data has been saved to ai-tools-data.json");

//   await browser.close();
// })();


import { launch } from 'puppeteer';
import { writeFileSync, readFileSync } from 'fs';

(async () => {
  const browser = await launch({ headless: false });
  const page = await browser.newPage();

  // Read categories from the categories.json file
  const categories = JSON.parse(readFileSync('categories.json', 'utf-8'));
  const allData = new Set();

  for (const category of categories) {
    const url = `https://www.aitoolhunt.com/?category=${category}`;
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const data = await page.evaluate(() => {
            const result = [];
            document.querySelectorAll(".relative.bg-foreground").forEach((item, index) => {
              const titleElement = item.querySelector('h3 a');
        const name = titleElement ? titleElement.textContent.trim() : '';
              const imgElement = item.querySelector("img");
              const imgUrl = imgElement ? imgElement.src : "";
              const cardDesc = item.querySelector(".text-general_text.leading-relaxed")?.textContent.trim() || "";
              const cardUrl = item.querySelector("a")?.href || "";
             
              if (imgUrl && name) {
                result.push({
                 
                  serialNumber: index + 1,
                  name,
                  cardDesc,
                  cardUrl,
                  imgUrl,
                });
              }
            });
            return result;
          });
    data.forEach((item) => allData.add(JSON.stringify({ ...item, category })));

    console.log(`Category ${category} scraped`);
  }

  const structuredData = Array.from(allData).map((item) => JSON.parse(item));

  writeFileSync('ai-tool-hunt-card-data.json', JSON.stringify(structuredData, null, 2));

  console.log('All data has been saved to ai-tools-data.json');

  await browser.close();
})();



// import { launch } from 'puppeteer';
// import fs from 'fs';

// (async () => {
//     const browser = await launch();
//     const page = await browser.newPage();
//     await page.goto('https://www.aitoolhunt.com/');

//     // Select all `div` elements with class `real_cat` that contain `p` tags with categories
//     const categories = await page.$$eval('label.text-sidebar_text.block.w-full.text-left', divs => {
//         return divs.flatMap(div => {
//             // Get all `p` tags within the current `div`
//             const paragraphs = div.querySelectorAll('p');
//             // Extract and process text content of `p` tags
//             return Array.from(paragraphs).flatMap(p => {
//                 // Use regex to remove emojis or icons at the beginning of the text
//                 return p.textContent.split(',').map(cat => cat.replace(/^[^\w\s]*/, '').trim());
//             });
//         });
//     });

//     // Store the data into a JSON file
//     fs.writeFile('categories.json', JSON.stringify(categories, null, 2), (err) => {
//         if (err) throw err;
//         console.log('Data has been written to categories.json');
//     });

//     await browser.close();
// })();


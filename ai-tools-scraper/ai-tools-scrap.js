import { launch } from "puppeteer";
import { writeFileSync } from "fs";

(async () => {
  const browser = await launch({ headless: true });
  const page = await browser.newPage();

  const allData = new Set();
  const totalPages = 47;

  for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
    const url = `https://allthingsai.com/marketplace?22022970_page=${pageNumber}`;
    await page.goto(url, { waitUntil: "domcontentloaded" });
    const data = await page.evaluate(() => {
      const result = [];
      document.querySelectorAll(".tool-card-v3").forEach((item, index) => {
        const imgElement = item.querySelector("img");
        const imgUrl = imgElement ? imgElement.src : "";
        const name =
          item.querySelector(".text-style-1lines")?.textContent.trim() || "";
        const cardDesc =
          item.querySelector(".text-style-2lines")?.textContent.trim() || "";
        const cardUrl =
          item.querySelector(".cms-link.w-inline-block")?.href || "";
        const category =
          item
            .querySelector(".text-size-small:not(.text-style-2lines)")
            ?.textContent.trim() || "";
        const subcategoryContainer = item.querySelector(
          ".marketplace-tags-list"
        );
        const subcategories = subcategoryContainer
          ? Array.from(
              subcategoryContainer.querySelectorAll(".text-size-tiny")
            ).map((sub) => sub.textContent.trim())
          : [];
        const priceElement = item.querySelector(".text-size-regular");
        const price = priceElement ? priceElement.textContent.trim() : "N/A";
        const ratingElement = item.querySelector(".card-rating");
        const activeStars = ratingElement
          ? Array.from(
              ratingElement.querySelectorAll(".fs_starrating_main")
            ).filter(
              (star) =>
                star.classList.contains("is-active-starrating") &&
                !star.classList.contains("w-condition-invisible")
            ).length
          : 0;
        const rating = activeStars;

        if (name && cardUrl) {
          result.push({
            name,
            cardDesc,
            cardUrl,
            category,
            subcategories,
            imgUrl,
            rating,
            price,
          });
        }
      });
      return result;
    });

    data.forEach((item) => allData.add(JSON.stringify(item)));

    console.log(`Page ${pageNumber} scraped`);
  }

  const structuredData = Array.from(allData).map((item) => JSON.parse(item));

  writeFileSync("ai-tools-scrap-data.json", JSON.stringify(structuredData, null, 2));

  console.log("All data has been saved to ai-tools-data.json");

  await browser.close();
})();

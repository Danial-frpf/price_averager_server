import puppeteer from "puppeteer";
import getPageAvgPrice from "./getPageAvgPrice.js";
import hasNoPagination from "./hasNoPagination.js";
import isLastPage from "./isLastPage.js";
import makeSearch from "./makeSearch.js";

const getPagesAvgPrice = async (search, maxPages = 1) => {
    // Launch browser and page
    const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setDefaultTimeout(360000);

    // Goto amazon and make search
    await makeSearch(page, search);

    // Sum prices of all items
    let total = 0;
    let checkedPages = 0;
    for (let i = 0; i < maxPages; i++) {
        total += await getPageAvgPrice(page);
        checkedPages++;
        // Break if on last page
        if ((await hasNoPagination(page)) || (await isLastPage(page))) break;
    }

    // Close Browser
    await browser.close();

    // Calculate and return average as string
    return parseFloat(total / checkedPages).toFixed(2);
};

export default getPagesAvgPrice;

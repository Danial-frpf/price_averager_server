import getPageAvgPrice from "./getPageAvgPrice.js";
import hasNoPagination from "./hasNoPagination.js";
import isLastPage from "./isLastPage.js";
import makeSearch from "./makeSearch.js";

const getPagesAvgPrice = async (page, search, maxPages = 1) => {
    await page.setDefaultTimeout(60000);

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

    // Calculate and return average as string
    return parseFloat(total / checkedPages).toFixed(2);
};

export default getPagesAvgPrice;

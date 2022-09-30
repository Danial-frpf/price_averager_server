import getAveragePrice from "../helpers/getAveragePrice.js";

const getPageAvgPrice = async (page) => {
    // Amazon constants
    const AMAZON_PRICE_INT_CLASS = ".a-price-whole";
    const AMAZON_PRICE_FRAC_CLASS = ".a-price-fraction";
    const AMAZON_NEXT_PAGE_BUTTON = ".s-pagination-next";

    await page.waitForSelector(AMAZON_PRICE_INT_CLASS);
    await page.waitForSelector(AMAZON_PRICE_FRAC_CLASS);

    // Sometimes there is not pagination so don't throw an error
    try {
        await page.waitForSelector(AMAZON_NEXT_PAGE_BUTTON);
    } catch (error) {}

    // Calculate average price of this page
    const averagePrice = await page.evaluate(getAveragePrice);

    // Returns a float
    return parseFloat(averagePrice);
};

export default getPageAvgPrice;

const makeSearch = async (page, search) => {
    // Amazon constants
    const AMAZON_URL = "https://www.amazon.com/";
    const AMAZON_SEARCH_BAR = "#twotabsearchtextbox";
    const AMAZON_SEARCH_BUTTON = "#nav-search-submit-button";

    // Search
    await page.goto(AMAZON_URL);
    await page.waitForSelector(AMAZON_SEARCH_BAR);
    await page.type(AMAZON_SEARCH_BAR, search);
    await page.click(AMAZON_SEARCH_BUTTON);
};

export default makeSearch;

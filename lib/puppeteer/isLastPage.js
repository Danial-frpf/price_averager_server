const isLastPage = async (page) => {
    // Amazon constants
    const AMAZON_NEXT_PAGE_BUTTON = ".s-pagination-next";

    // See if next page button is disabled (disabled = false)
    const lastPage = await page.evaluate(() => {
        // Amazon constants
        const AMAZON_NEXT_PAGE_BUTTON = ".s-pagination-next";
        const AMAZON_NEXT_BUTTON_DISABLED = "s-pagination-disabled";

        const nextButton = document.querySelector(AMAZON_NEXT_PAGE_BUTTON);
        return nextButton.classList.contains(AMAZON_NEXT_BUTTON_DISABLED);
    });

    // If not disabled then click the next page button
    if (!lastPage) await page.click(AMAZON_NEXT_PAGE_BUTTON);

    // Return true if button exists else false
    return lastPage;
};

export default isLastPage;

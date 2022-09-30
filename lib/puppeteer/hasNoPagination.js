const hasNoPagination = async (page) => {
    // Check whether the page has pagination
    const exists = await page.evaluate(() => {
        // Amazon constants
        const AMAZON_NEXT_PAGE_BUTTON = ".s-pagination-next";

        document.querySelector(AMAZON_NEXT_PAGE_BUTTON);
    });

    // Return false if pagination exists and vice versa
    return exists ? false : true;
};

export default hasNoPagination;

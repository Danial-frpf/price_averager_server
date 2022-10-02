import getPagesAvgPrice from "../puppeteer/getPagesAvgPrice.js";

const amazonSearch = (socket, browser) => {
    // Signals web socket
    const SOCKET_AMAZON_SEARCH = "amazon-search";
    const SOCKET_AMAZON_AVG_PRICE = "average-price";

    // Make search when data is received
    socket.on(SOCKET_AMAZON_SEARCH, async ({ search, maxPages }) => {
        try {
            // Calculate average
            const page = await browser.newPage();
            const averagePrice = await getPagesAvgPrice(
                page,
                search,
                parseInt(maxPages)
            );
            await page.close();

            // Send back success results
            socket.emit(SOCKET_AMAZON_AVG_PRICE, { averagePrice });
            socket.disconnect();
        } catch (e) {
            console.log(e);

            // Send back error results
            socket.emit(SOCKET_AMAZON_AVG_PRICE, {
                message: "Either no product for search or server error",
            });
            socket.disconnect();
        }
    });
};
export default amazonSearch;

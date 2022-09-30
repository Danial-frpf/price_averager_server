const getAveragePrice = () => {
    // Amazon constants
    const AMAZON_PRICE_INT_CLASS = "a-price-whole";
    const AMAZON_PRICE_FRAC_CLASS = "a-price-fraction";

    // DOM elements
    const prices = document.getElementsByClassName(AMAZON_PRICE_INT_CLASS);
    const pricesFractions = document.getElementsByClassName(
        AMAZON_PRICE_FRAC_CLASS
    );

    total = 0;

    // Add all the prices together
    for (let i = 0; i < prices.length; i++) {
        fraction = parseFloat(pricesFractions[i].innerText) / 100;
        price = parseFloat(prices[i].innerText.split("\n")[0]);
        total += fraction + price;
    }

    // Calculate average and convert it into string
    total = parseFloat(total / prices.length).toFixed(2);
    return total;
};

export default getAveragePrice;

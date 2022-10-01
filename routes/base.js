import express from "express";
import puppeteer from "puppeteer";
import getPagesAvgPrice from "../lib/puppeteer/getPagesAvgPrice.js";

// Launch headless browser
const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const baseRouter = express.Router();

// Check whether the server is active
baseRouter.get("/", (_req, res) => {
    res.send("server is running");
});

// For easy testing
baseRouter.get("/:maxPages/:search", async (req, res) => {
    const { search, maxPages } = req.params;

    try {
        // Check wether the max page number is valid
        if (!parseInt(maxPages) || parseInt(maxPages) < 0) {
            res.status(300).json({
                message: "Max page should be a positive number",
            });
            return;
        }

        // Calculate average price
        const page = await browser.newPage();

        const averagePrice = await getPagesAvgPrice(
            page,
            search,
            parseInt(maxPages)
        );
        await page.close();
        res.json({ message: "Yay", averagePrice });
        return;
    } catch (e) {
        console.log(e);
        res.json({
            message: "Either no product for search or server error",
        });
        return;
    }
});

// 404 links
baseRouter.get("*", (_req, res) => {
    res.status(404).json({ message: "Not available" });
});

export default baseRouter;

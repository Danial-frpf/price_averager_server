import express from "express";
import cors from "cors";
import getPagesAvgPrice from "./lib/puppeteer/getPagesAvgPrice.js";
import puppeteer from "puppeteer";

const app = express();

const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
const page = await browser.newPage();

// Heroku Port
const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin: "*",
        methods: ["GET"],
    })
);

app.get("/", (_req, res) => {
    res.send("server is running");
});

app.get("/:maxPages/:search", async (req, res) => {
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
        const averagePrice = await getPagesAvgPrice(
            page,
            search,
            parseInt(maxPages)
        );
        res.json({ message: "Yay", averagePrice });
        return;
    } catch (e) {
        console.log(e);
        res.json({
            message: "Either no product for search or server error",
            error: e.message,
        });
        return;
    }
});

app.get("*", (_req, res) => {
    res.status(404).json({ message: "Not available" });
});

app.listen(PORT);

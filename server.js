import express from "express";
import cors from "cors";
import getPagesAvgPrice from "./lib/puppeteer/getPagesAvgPrice.js";
import puppeteer from "puppeteer";
import http from "http";
import { Server } from "socket.io";

//Initialization
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Launch browser and page
const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

// Heroku Port
const PORT = process.env.PORT || 3000;

// Allow cross-origin-connections on get requests
app.use(
    cors({
        origin: "*",
        methods: ["GET"],
    })
);

// Check whether the server is active
app.get("/", (_req, res) => {
    res.send("server is running");
});

// For easy testing
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
app.get("*", (_req, res) => {
    res.status(404).json({ message: "Not available" });
});

io.on("connection", (socket) => {
    console.log("a user connected");
    // Keeps connection alive
    socket.on("refresh", (response) => {});

    // Make search when data is received
    socket.on("amazon-search", async ({ search, maxPages }) => {
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
            socket.emit("average-price", { averagePrice });
        } catch (e) {
            console.log(e);

            // Send back error results
            socket.emit("average-price", {
                message: "Either no product for search or server error",
            });
        }
    });
});

// Deploy server
server.listen(PORT);

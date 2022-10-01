import express from "express";
import cors from "cors";
import puppeteer from "puppeteer";
import http from "http";
import { Server } from "socket.io";
import baseRouter from "./routes/base.js";
import refresh from "./lib/socket_io/refresh.js";
import amazonSearch from "./lib/socket_io/amazonSearch.js";

//Initialization
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Allow cross-origin-connections on get requests
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "DELETE", "PATCH"],
    })
);

app.use("/", baseRouter);

// Launch headless browser
const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

// Heroku Port
const PORT = process.env.PORT || 5000;

// On successful socket connection
io.on("connection", (socket) => {
    console.log("user connected: ", socket.id);
    // Keeps connection alive
    refresh(socket);

    // Makes search when data is received and send back respond
    amazonSearch(socket, browser);
});

// Deploy server
server.listen(PORT);

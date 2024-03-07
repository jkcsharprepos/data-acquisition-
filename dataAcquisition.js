const extractMediaExpertPosts = require("./utils/extractMediaExpertPosts");
const extractEuroPosts = require("./utils/extractEuroPosts");

const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const { executablePath } = require("puppeteer");
const express = require("express");
const _ = require("lodash");
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT =4000;

puppeteer.use(StealthPlugin());

(async () => {

        const app = express();
        app.use(cors());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json({ limit: "150mb" }));

        app.get("/mediaexpert/search/:productName",async (req,res)=>{
            console.log("Process Mediaexpert Starting...");
            await new Promise(resolve => setTimeout(resolve, 1000));
            let browser = await puppeteer.launch({
                headless: true,
                executablePath: executablePath()
            });

            let page = await browser.newPage();
            await page.setViewport({width: 1920, height: 1080});
            page.setDefaultTimeout(60000);

            let minPrice = _.toNumber(req.query.minPrice) || 0;
            let maxPrice = _.toNumber(req.query.maxPrice) ||0;
            let sort= _.isString(req.query.sort) ? req.query.sort : "";


            let productUrl =`search?query%5Bmenu_item%5D=&query%5Bquerystring%5D=${req.params.productName}+&priceFilter%5Bmin%5D=${minPrice}&priceFilter%5Bmax%5D=${maxPrice}`;

            if(!!sort) productUrl = productUrl+`&sort=${sort}`;

            let extractedPosts = null;
            try {
                extractedPosts = await extractMediaExpertPosts  (page, productUrl);
                console.log("Success Mediaexpert process");
            } catch {
                console.log("fail...");
            }
            res.send(JSON.stringify(extractedPosts));

            await browser.close();
        });

        app.get("/euro/search/:productName",async (req,res)=>{
            console.log("Process Euro Starting...");
                await new Promise(resolve => setTimeout(resolve, 500));
            let browser = await puppeteer.launch({
                headless: false,
                executablePath: executablePath()
            });

            let page = await browser.newPage();
            await page.setViewport({width: 1920, height: 1080});
            page.setDefaultTimeout(120000);

            let productUrl = `${req.params.productName}`;

            let extractedPosts = null;
            try {
                extractedPosts = await extractEuroPosts(page, productUrl);
                console.log("Success Euro process");
            } catch {
                console.log("fail...");
            }
            res.send(JSON.stringify(extractedPosts));

            await browser.close();

        });

        app.get("*", (req, res) => {
            res.status(200).send({});
        });

        app.listen(PORT, async err => {
            if (err) throw err;

            console.log(`> Ready on http://localhost:${PORT}`);
        });

    }
)();




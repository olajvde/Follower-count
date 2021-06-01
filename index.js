const path = require("path");
const puppeteer = require("puppeteer");
const express = require("express");
const app = express();

//middleware
app.use(express.static("public"));
app.use(express.json());

//route
app.get("/", (_, res) => {
  res.send("Hello");
});

app.post("/", async (req, res) => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();

  await page.goto("https://mobile.twitter.com/olajvde?lang=en");
  const twitterCount = await page.evaluate(() => {
    let count = document.querySelector(
      "#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > div:nth-child(2) > div > div > div:nth-child(1) > div > div.css-1dbjc4n.r-13awgt0.r-18u37iz.r-1w6e6rj > div:nth-child(2) > a > span.css-901oao.css-16my406.r-1fmj7o5.r-poiln3.r-b88u0q.r-bcqeeo.r-qvutc0 > span"
    ).innerText;
    return parseInt(count.replace(",", ""));
  });

  await page.goto("https://www.instagram.com/quidink/");
  const instacount = await page.evaluate(() => {
    let count = document.querySelector(
      "#react-root > section > main > div > header > section > ul > li:nth-child(2) > a > span"
    ).innerText;
    return parseInt(count);
  });
  let subCount = {
    twitterCount,
    instacount,
  };
  console.log(instacount, twitterCount);
  await browser.close();

  res.json(subCount);
});
app.listen(3000, () => console.log("App Started"));

const puppeteer = require("puppeteer");

module.exports.scraper = async (url, callBack) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.setUserAgent(
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",
    );

    await page.setViewport({ width: 1200, height: 768 });

    function wait(ms) {
        return new Promise((resolve) => setTimeout(() => resolve(), ms));
    }

    await page.goto(`${url}`, {
        waitUntil: "networkidle0",
    });

    async function autoScroll(page) {
        await page.evaluate(async () => {
            await new Promise((resolve, reject) => {
                let totalHeight = 0;
                let distance = 100;
                let timer = setInterval(() => {
                    let scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;
                    if (document.querySelectorAll('#products > section > div').length > 200) {
                        window.scrollTo(0, 0); clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
        });
    }

    // Get the height of the rendered page
    const bodyHandle = await page.$("body");
    const { height } = await bodyHandle.boundingBox();
    await bodyHandle.dispose();


    await wait(2000);
    await page.type('input[name=keyword]', 'Tshirts', { delay: 20 })
    await wait(2000);
    await page.keyboard.press('Enter');
    await page.waitForNavigation();
    await wait(2000);
    await autoScroll(page);
    await wait(2000);
    let data = await page.evaluate(async () => {
        let products = [];
        let productElements = document.querySelectorAll("#products > section > div");

        productElements.forEach((productElement) => {
            let productJson = {};
            try {
                productJson.productDiscription = productElement.childNodes[5].childNodes[1].childNodes[1].childNodes[1].innerText;
                productJson.productImageUrl = productElement.childNodes[3].childNodes[1].childNodes[3].childNodes[1].srcset;
                productJson.productPrice = productElement.childNodes[5].childNodes[1].childNodes[1].childNodes[3].childNodes[1].innerText;
                productJson.productDiscount = productElement.childNodes[5].childNodes[1].childNodes[1].childNodes[3].childNodes[3].innerText;
            } catch (e) {
                console.log(e);
            }
            products.push(productJson);
        });
        return products;
    });

    await wait(800);
    callBack(data, true);
    await browser.close();
};




var webdriver = require('selenium-webdriver');

// Input capabilities
var capabilities = {
 'browserName' : 'Chrome',
 'browser_version' : '72.0',
 'os' : 'Windows',
 'os_version' : '10',
 'resolution' : '1920x1080',
 'browserstack.local' : 'true',
 'browserstack.user' : process.env.BS_USER,
 'browserstack.key' : process.env.BS_ACCESS_KEY
}

var driver = new webdriver.Builder().
  usingServer('http://hub-cloud.browserstack.com/wd/hub').
  withCapabilities(capabilities).
  build();

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

async function run() {
  try
  {
    await driver.get(process.env.URL);
    await driver.wait(webdriver.until.elementLocated(webdriver.By.name('email')), 10 * 1000);

    await sleep(1000);

    var title = await driver.getTitle();
    var url = await driver.getCurrentUrl();
    console.log(title + " " + url);

    var inputemail = await driver.findElement(webdriver.By.name('email'))
    inputemail.sendKeys(process.env.EMAIL;
    var inputpassword = await driver.findElement(webdriver.By.name('password'));
    inputpassword.sendKeys(process.env.PASSWORD);

    await sleep(3000);

    var btn = await driver.findElement(webdriver.By.className('btn'));
    await btn.click();

    await driver.wait(webdriver.until.elementLocated(webdriver.By.className('device')), 10 * 1000);
    var cards = await driver.findElements(webdriver.By.className('card-header'));

    var exitBtn = await driver.findElement(webdriver.By.className('icon-icon_navigation_menu'));
    await exitBtn.click();
    await sleep(1000);

    // var exitBtn = await driver.findElement(webdriver.By.xpath("//a[contains(text(),'Portal')]"));
    var exitBtn = await driver.findElement(webdriver.By.partialLinkText("Portal"));
    await exitBtn.click();

    await sleep(5000);

    for (i = 0; i < cards.length; i++) { 
      var ret = await cards[i].getText();
      console.log(ret);
      if (ret === process.env.DEVICE_NAME) {
        await cards[i].click();
      }
    }

    await driver.wait(webdriver.until.elementLocated(webdriver.By.className('close-link')), 10 * 1000);
    await sleep(5000);

    var extendBtn = await driver.findElement(webdriver.By.className('icon-icon_control_arrow_right'));
    await extendBtn.click();

    await driver.wait(webdriver.until.elementLocated(webdriver.By.className('closebutton')), 10 * 1000);
    await sleep(5000);

    var closeBtn = await driver.findElement(webdriver.By.className('close-link'));
    await closeBtn.click();
    await sleep(5000);

    var exitBtn = await driver.findElement(webdriver.By.className('close-link'));
    await exitBtn.click();
    await sleep(5000);

    var exitBtn = await driver.findElement(webdriver.By.xpath("//a[contains(text(),'Portal')]"));
    await exitBtn.click();

    await sleep(10000);
    driver.quit();
  }
  catch (e) {
    console.log(e);
    driver.quit();
  }
}

run();
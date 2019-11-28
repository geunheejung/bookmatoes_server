import { Builder, By, Key, until } from 'selenium-webdriver';
import cheerio from 'cheerio';

export const crawl = async () => {
  const driver = new Builder().forBrowser('chrome').build();

  try {
    const re = await driver.get('http://www.google.com');
    const res = await driver.findElement(By.className('iblpc'));  
    console.log('res->', res); 
  } finally {
    await driver.quit();
  }
};


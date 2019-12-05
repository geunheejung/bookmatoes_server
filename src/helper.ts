import { Builder, By, WebDriver, WebElement } from 'selenium-webdriver';
import { ISellerRes } from '../type/api';

type Worker<T> = (driver: WebDriver) => Promise<T>;

enum SiteName {
  INTER_PARK = '인터파크도서',
  KYOBO = '교보문고',
  YES24 = 'YES24',  
}

class ApiError extends Error {
  constructor(m: string) {
    super(m);

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

const findElement = async (
  driver: WebDriver | WebElement, 
  xpath: string, 
  attr: string = 'innerText'
) => {
  const webElement: WebElement = await driver.findElement(By.xpath(xpath));
  const text = await webElement.getAttribute(attr);
  return text;
};

export const selenum = async <T>(
  url: string,
  worker: Worker<T>,
) => {
  if (!url) return;
  
  const driver = await new Builder().forBrowser('firefox').build();
  
  try {        
    await driver.get(encodeURI(url));        
    const response = await worker(driver);        
    return response;
  } catch (e) { 
    console.log(e);
  } finally {
    await driver.quit();
  }
};

export const getSellerLinkList = async (url: string) => {
  const getSellerInfo = async (webElement: WebElement) => {

    const url = await webElement.getAttribute('href');
    const siteName = await webElement.getAttribute('innerText');
  
    return {
      siteName,
      url,
    };
  };

  const worker = async (driver: WebDriver) => {
    try {
      const xpath = `//ul[@class='list_sale']/li/a`;
      const sellerList = await driver.findElements(By.xpath(xpath));
      const sellerInfoList = await Promise.all(sellerList.map(getSellerInfo));
      return sellerInfoList;
    } catch (error) {
      throw new ApiError('[getSellerLinkList] - Error');
    };
  };
  
  return await selenum<ISellerRes[]>(url, worker);
};

export const getRating = (siteName: SiteName, url: string) => {
  switch (siteName) {
    case SiteName.INTER_PARK:
      return selenum(url, async (driver: WebDriver) => ({
        count: await findElement(driver, `//div[@class='titleSet1']/span[@class='star_count']`),
        totalCount: await findElement(driver, `//div[@class='titleSet1']/span[@class='total_count']`),
      }));    
    case SiteName.KYOBO:
      return selenum(url, async (driver: WebDriver) => ({
        count: await findElement(driver, `//div[@class='review_klover']/div[@class='popup_load']/em`),
        totalCount: await findElement(driver, `//div[@class='review_klover']/div[@class='popup_load']`),
      }));
    default:
      break;
  }  
}
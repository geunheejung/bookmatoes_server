import { Builder, By, WebDriver } from 'selenium-webdriver';

type Worker<T> = (driver: WebDriver) => Promise<T>;

class ApiError extends Error {
  constructor(m: string) {
    super(m);

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export const selenum = async <T>(
  url: string,
  worker: Worker<T>,
) => {
  const driver = await new Builder().forBrowser('chrome').build();
  
  try {
    await driver.get(encodeURI(url));
    return await worker(driver);
  } finally {
    driver.quit();
  }
};

export const getSellerLinkList = async (url: string) => {
  const worker = async (driver: WebDriver) => {
    try {
      const xpath = `//ul[@class='list_sale']/li/a`;
      const sellerList = await driver.findElements(By.xpath(xpath));
      const hrefList = await Promise.all(
        sellerList.map(
          webElement => webElement.getAttribute('href')
        ),
      );
      return hrefList;
    } catch (error) {
      throw new ApiError('[getSellerLinkList] - Error');
    };
  };
  
  return await selenum<string[]>(url, worker);
};

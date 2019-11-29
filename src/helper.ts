import request from 'request';
import cheerio from 'cheerio';

// .info_section > ul.list_sale > a['href'];

export const getSellerList = (url: string) => {
  request(url, (err, res, body) => {
    console.group('--');
    console.log(body);
    console.groupEnd();
    
  });
};
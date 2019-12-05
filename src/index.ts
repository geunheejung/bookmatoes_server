import _uniqBy from 'lodash/uniqBy';
import app from './app';
import { getSellerLinkList, getRating } from './helper';
import HttpStatusCode from '../type/HttpStatusCode';
import { ISellerRes } from '../type/api';

enum EndPoint {
  // https://app.gitbook.com/@geuni1013/s/bookmatoes-api-spec/~/drafts/-LuqeqpDMXKQq6ls-DT8/@drafts
  SELLER = '/seller/:bookId',
  RATING = '/rating',
}

app.get(EndPoint.SELLER, async (req, res) => {
  const { params: { bookId } } = req;
  const url = `https://search.daum.net/search?w=bookpage&bookId=${bookId}`;
  const sellerUrlList = await getSellerLinkList(url);
  const response = _uniqBy(sellerUrlList, (raw: ISellerRes) => raw.siteName);
  res.status(HttpStatusCode.OK).json(response);
});

app.get(EndPoint.RATING, async (req, res) => {
  const { siteName, url } = req.query;
  const rating = await getRating(siteName, url);  
  res.status(HttpStatusCode.OK).send(rating);
});
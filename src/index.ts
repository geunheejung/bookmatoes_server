import app from './app';
import { getSellerLinkList } from './helper';
import HttpStatusCode from '../type/HttpStatusCode';

enum EndPoint {
  // https://app.gitbook.com/@geuni1013/s/bookmatoes-api-spec/~/drafts/-LuqeqpDMXKQq6ls-DT8/@drafts
  SELLER = '/seller/:bookId',
}

app.get(EndPoint.SELLER, async (req, res) => {
  const { params: { bookId } } = req;
  const url = `https://search.daum.net/search?w=bookpage&bookId=${bookId}`;
  const sellerUrlList = await getSellerLinkList(url);    
  res.status(HttpStatusCode.OK).json(sellerUrlList);
});

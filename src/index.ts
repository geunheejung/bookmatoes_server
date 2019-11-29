import app from './app';
import { getSellerLinkList } from './helper';


app.get('/rating/:bookId', async (req, res) => {
  const { params: { bookId } } = req;  
  const url = `https://search.daum.net/search?w=bookpage&bookId=${bookId}`;

  const sellerUrlList = await getSellerLinkList(url);

  res.status(200).json({
    status: 200,
    response: []
  });
});
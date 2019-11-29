import app from './app';
import { getSellerList } from './helper';


app.get('/rating/:bookId', (req, res) => {
  const { params: { bookId } } = req;  
  const url = `https://search.daum.net/search?w=bookpage&bookId=${bookId}`;

  getSellerList(url);

  res.status(200).json({
    status: 200,
    response: []
  });
});
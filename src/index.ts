import express from 'express';
import { crawl } from './crawling';

const app = express();

app.get('/crawl', (req, res) => {
  crawl();
  return res.send('hello');
});

app.get('/rating/:bookId', (req, res) => {
  const { params: { bookId } } = req;
  console.log('bookId -->', bookId); 
});

app.listen(8080, () => {
  console.log('server started!');
});

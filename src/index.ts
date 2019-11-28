import express from 'express';
import axios from 'axios';
import { crawl } from './crawling';

const app = express();

app.get('/rating/:bookId', (req, res) => {
  const { params: { bookId } } = req;  
  const url = `https://search.daum.net/search?w=bookpage&bookId=${bookId}`;

  res.status(200).json({
    status: 200,
    response: []
  });
});

app.listen(8080, () => {
  console.log('server started!');
});

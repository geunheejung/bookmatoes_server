const axios = require('axios');

const request = async (url, success) => {
  const response = await axios.get(url);
  console.log('response ->', response)
  success(response);  
}

describe('getRating', () => {  
  test(
    `검색결과가 존재하지 않을 경우 빈 배열을 반환한다.`,
    (done) => {      
      const url = 'http://localhost:8080/rating/hello';
      request(url, (response) => {
        const { data } = response;
        expect(data).toEqual({          
          response: [],
          status: 200
        });
        done();
      });
    }
  );

  
});


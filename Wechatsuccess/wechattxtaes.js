const Aes = require('aes-256-gcm');
const crypto = require('crypto');

const keys= "bindo1501977491201806261600bindo"// var sign = crypto.createSign("RSA-SHA256");
// const plaintext='+vQgNj96GMq7wHNu4D2vO3DXPLepQyIf1pe8PifO6T3Q/reltgDX5BnxTkyei3dMQAGlK4RHJNCG9tNQ/TeXZjN91hxlkZ0xDpb7q6Grml5665LA88ws3ZKjdi7hA+1gqwiEWJGGAA1Mt/oq1mjt6V+yZYgeOLB+j0yyTOHoLFDzmAwgJaPmNz8m9HSIaP3VzpxojsNXtJYfhKou3FAHQFoDq6OuFdyguhfAy9y0LP2g7JHmctn4BtuhK4iDrVWcj47afaNdzDZJqh57ZXpzplx9t9o/z/fUkCNM4kyt3xtKV/ZVqlVyORgJgOVyd6F4wo5S3LiVi/nRamljW2dNp8mtQUPkBC7lCultXh13v1EgOcKwtfELMoIpglDsBfF1eqUoRfsvXT8i4wHuHuIQU0qb2oi99KUbSGElf933vMYVN7pNyMzK09vJ/RPFq/lBaZY6CLgvWaUKnMCJc+9DQdyHxnR1fmFdUnuMf6tHagpWzJ+g0/Q6bpWYxU5wFez3MkBwGCPa/Z2p8WGZJ/EIfTwjf/JjY6XJZ6XZ2xSD/aOkWrnz7cZMFvYqZKWkkzHNfzEHTqidjdaXGD1mt/1OrAKisQtx8dHoFsLjZ2F64NrGAUGva9fRV2vepL+NK5MN60Zq6CqGdJMzjxSGp+EnBAT6YsbF1OLeYWEJ8Sr3kG18YZ/Yj5w6JtDJE7J5wtJ8w6D/4A2fGYo/ZVF8tr9Pscj5M8yRfSbCsQUUJo9U1XRBoCtGswd0bVYJ435B4mekAzU7eyJM4fKMgSu25VIxQznevMO0xBzfSiNU23xyCeq4xrS2JR3Lwk2KsWqXx0CI+ik4dTo6hBYXTFawRTJ9A0ow9BB4wg5Lemgg7gHdlRqBOTiqzlt/fY70nIFjEHY96Ap8GEcrCAdgy5KO4Kq22g4Ez8ZVJweJqsf5Qhoaye9R9f46qwjBr/yZ/WTgPXU7iQLc5JOmb6GCnjCgP6qIxE5XHQ7GH8/la0MlLFyI7tRvYF9t1TsdgJc8SrnVIm4qk0Rnz7hwtJUzmeDdurigZ7NEil/aMmtdKqimduV6ambC2ZGqpF6brqxyqjUAKXNaxS8bU4jz68V6/6lV6BIs4kyG0uB0P/TICanoF0nwq8H0BPoHnmFkPfnSwFNcs9WzY7Ku9QcSsu3wMeADYkdTM6tCd8SfWIW9CPrRv9nx1RCSqL23LmTJyDEIALhjJwZJcxrxG+ZZ/qCpq1pDOZJWHaUqN5KcC7GmdS8OR6FRmsf+jW9cK/6tCptfbkO/nslJDo3WdZlpljoMm13QAtqy9ZkFjr89k9hsomooIf8WtDNiGYdzawMjDj+Yly8suOOyZsQLUs6LdFeKiPwcc7Tl9ZcuKHOdekADc5+4Tu7WHsQfT/QFJhhdkXzYVCtMbByb1jn8ZcTx5mro+Hth7WvY8fI+20pGnk7iviaV4WsBxeaXeFAFkpZm9fiIw3I7lOOsei2TBwTH2DWTO3gDbmcDxR/CIFoxmltSSPvhtTUHVHLc0PMQFDj2Od1FsjSO9SNwYCspP30+x63kjPgCVcLlykU+PWSvjn2SWaoPPsFaahi+x4w+989iamRcCvoV3/hEV/BrwyA0PqwD1UWHZYhEeatXnFzNq4gUPj25Fd4Rw2hV+eHMqzahv9ClDL9jGRcDD9dosVTPKYT17YRxC/yAaXvXcOfDJZF12hWWHTMaGKxedupCNLyOEBMQi3n/L3Hh4rTU4kPNY2M0QVGIJhmNWH3Ibk0lFihzHn3Uaxc2Vsw5qkYHl1BrzeqYFXzPUPbhGy38gd+Jw9pW2XrjqByqeKNK3+5JuBqxbg+NNVN7aw8GkAQF+I8wpEcAFFoFi3Wz0RUugjMnPh0/JbY9dyLKQ+0LnI72Jw=='
// const associated_data='certificate'
// const nonce ="c6d4bd9b30e8"
// const algorithm="AEAD_AES_256_GCM"
// //???????????????key  ?????????????????????key,????????????iv ??????nonce,????????????plaintext????????????add ?????? associated_data
// const key_in_bytes = Buffer.from(key, 'base64')
// //var cdata = new Buffer(plaintext,'base64').toString('binary');
// console.log(key_in_bytes)
// // let cleartext =Aes.decrypt(key_in_bytes,cdata,nonce,associated_data)

const  clearEncoding = 'binary';
const algorithm = 'aes-256-gcm';
const iv='aa875abbe02c';
const cipherEncoding='hex';
var cipherChunks = [];
var cdata='ZhNHOnGti9SAdCMnci2R0EM6wE5HZkkgM4+8hkV9scQAQq0VnMZxYk0OAOT3BJPaV+Z0h3iPGvngiaLklLtobcd5OPDQVNkbyumnfakKGzHurZ2PcX0OA8JC39wTNjGvYzYVwtiSEjU7I5WwtSbNmm7Cqp7RW05afn6ejxY17TknGk9Z/nBo/s7eFgJi7HOLjHgGbh0xJUvZhrhNfeYvY0BLUN9tDcdZicpKN2Gg9OleMPM4LM4rxImzk3l0Y59o2DjmcPL52sAPwxOulOecXuWb4OIAQR0gywEB7DT9NGJAFEC+bnLthjQ7UD8r/WrTwz6bjCJq76Prd8Nn8jNJNIf0vNZKb/lsUe32JKfaMuS+x1jDOi2DY422uDONzCystkQ5h3L74Es/n8Y0D25jQfC2F9d+jk3TBXgy9Yh1afzAFFN90VeBxsttuF62LMLwWlysUHrUrOVN4l89ebcUdn/mbX2o5BjyTUiSHMZX9Hl8/Hb005/YSWd7L1yy4SAt6+nUl5Zc0cqk7rxxqxDE9rWPl60hOSY8gUfM2YqC2VOTOtu4fF/qzbLyXZhGmOKX7OlXXGPIpXx1dI8s7y1q1QePzF93IwhAZIX0nUEvfTJhyw0oTBtUEEsqkAS3oGnnhhfQctvtVrR5wL6B7mFEejvhMwqy67vRXsevZw+iB9mGxjCJsZv6/tYgZY5/7LgKqf6UqFnhb4qNFKorsMz9fDM0TtSPu/A1wERp3RUIDd/y5B6dknbeYXvoSqQRDyeu7PWwDqH8nxnWvUqGxeauCUuHTGWuIMOG9vxsI7O6unoguFuIDEb/AyW5Kb8GLcCk/mpTPWL7EXA/dbR6Hrxi26O/5jKw9+vK7tXBex+zcn7B+WexufyuR+73BQTGHxkyzbDSiTF/vC+C87/8gKEyFMbbnDnPn8rdj74MbXzsiLW4e/0Vm+ClUCAZy2J4McG/AuVaeOzq2vl5Kju1B2E+DH9BavvK4FUR8k9oPIAvjdgODOIpW2D9MktuoUFTn0HvOFN/m+AK81A+jzG6CQ01hOBpaMy2acrNzKIwmBD4ipswUEkJQQndIS51pmhsGO4laKf2sfTXSwOlsXbRKHPHr0nH42/9Hr4hwrGRMqZGZA2wXK1ceWcQUbayxGhzeHrr8JOuMI4hsEaI7lEFPrDVQ6UKfaDIRVmnZG1A1uftmsrxM8zWOkMuaL8IzLOzfjw3NHc4bz/TZDstMQX8V4oQm4KpWKnnMnfYDLNrLycdAOCAuwEwOdhdNmu+0hWOXyjlF5vh/WtCvHbniIEuDkEimA62GX0TzvxfKvG7J7LnFdXzZfMO2PyEq3hvsPhAWefxLr76I86g8ZdcCxpFdR974mtgW0W4iLVZjFXKZc9LeI/AatXGyNNK+EfDLh6lHjpFZQtOLfEmaJb3mxmHpr2ALXIaNdUkTNupv+loEHFjUxXnWbO5DUY+yGRjD6hDX7Ccr7UdTABwWigGWVxuOymf+Sg1RpIdhWNIGU4bLnp5fN+VAFRalgL9xQiFxmaZ+13/IQCo7ESpemtuQHSOZJ4Kzx+RZW+S1lAJIKV8cYUvwJiVd0g6p/a+JlaZAmOXOk7pTx6DlG7fBWmhPwFMg3+hHZYrMyfR59OKD+RWT3lljmGDwP8UHJ4RjWQF2AGD2IIJ5N3o/3I4eH36qLUv0Ls3hqrsqjCdJNOSWvP/iwQGzYUk5sJDGDF89iqkJU3Pa2HRUwR189FD+sAE1Avfa3Kgh5uZ/gArJi+0CnCkLtmfqx8zJYqVTkt/1L49E2xd7D2ibkHu6S/5ufpUsTGpRBr6DuL08hYSgTNOGftwroeORtKN8z7eQs4b9SZEZeGqex+KuIJ6MjGAQUPlOQJTetOzIxk2YYw8+Q=='
cdata = new Buffer(cdata,'base64').toString('binary');

var decipher = crypto.createDecipheriv(algorithm, new Buffer(keys, clearEncoding), new Buffer(iv, clearEncoding));
decipher.setAutoPadding(true);
console.log(decipher)
decipher.setAAD(new Buffer("certificate", clearEncoding))
var data = new Buffer(cdata,clearEncoding);

var rtn = decipher.update(data, clearEncoding, "utf-8").toString("utf8");
//???????????????????????????????????????????????????????????????????????????????????????????????????????????????
//rtn += decipher.final("utf-8");
rtn = rtn.split('-----END CERTIFICATE-----')[0] + '-----END CERTIFICATE-----';
rtn = rtn.replace(/\n/g,'\n')
//5??????????????????????????????????????????????????????????????????????????????????????????
console.log(rtn);

//
// crypto.constants.RSA_PKCS1_OAEP_PADDING
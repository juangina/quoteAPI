const express = require('express');
const morgan = require('morgan');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
  const randomQuote = getRandomElement(quotes);
  //delete randomQuote.person;
  const quoteObject = {quote: randomQuote};
  //console.log(quoteObject);
  res.send(quoteObject);
});

app.get('/api/quotes', (req, res, next) => {
  const quotePerson = req.query.person;
  //console.log(quotePerson);
  if(quotePerson) {
    const newQuotes = quotes.filter( (arr) => {
      return arr.person === quotePerson;
    });
    //console.log(newQuotes);
    const quoteObjects = {quotes: newQuotes};
    res.send(quoteObjects);
  } else {
    const quoteObjects = {quotes: quotes};
    //console.log(quoteObjects);
    res.send(quoteObjects);
  }
});

app.post('/api/quotes', (req, res, next) => {
  const newText = req.query.quote;
  const newPerson = req.query.person;
  //console.log(`${newText}, ${newPerson}`);
  if(newText && newPerson) {
    const newQuote = {quote: newText, person: newPerson};
    //console.log(newQuote);
    quotes.push(newQuote);
    const quoteObject = {quote: newQuote};
    //console.log(quoteObject);
    res.send(quoteObject);
  } else {
    res.status(400).send();
  }
})

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
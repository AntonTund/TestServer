var express = require('express');
var router = express.Router();

const fs = require("fs");

let data = [];
let highscores = [];

fs.readFile("highscore.txt", { encoding: 'utf8' }, function (err, d) {
  if (err) {
    highscores = 
    { entries: [
      {
        name: "Soltorg",
        score: 10
      },
      {
        name: "Soltorg",
        score: 9
      },
      {
        name: "Soltorg",
        score: 8
      },
      {
        name: "Soltorg",
        score: 7
      },
      {
        name: "Soltorg",
        score: 6
      },
      {
        name: "Soltorg",
        score: 5
      },
      {
        name: "Soltorg",
        score: 4
      },
      {
        name: "Soltorg",
        score: 3
      },
      {
        name: "Soltorg",
        score: 2
      },
      {
        name: "Soltorg",
        score: 1
      }
    ]};
  } else {
    highscores = JSON.parse(d);
  }
});

fs.readFile("datafil.txt", { encoding: 'utf8' }, function (err, d) {
  if (err) {
    data = [{
      namn: "Nisse Nisseson",
      adress: "Nisselinagatan 42",
      postnummer: 666,
      postort: "Borlänge"
    }];
  } else {
    data = JSON.parse(d);
  }
});

/* GET home page. */
router.get('/', function (req, res, next) {
  let namn = req.query.namn;
  let adress = req.query.adress;

  let tal = 42;

  let response = `Talet är ${tal}`;

  response += "Hello " + namn + " på " + adress;

  res.send(response);
});

router.get('/clock', function (req, res, next) {
  let date = new Date().toLocaleTimeString();

  let foo = `
  <head>
    <meta http-equiv="Refresh" content="1; URL=http://localhost:3000/clock">
  </head>
  <body>
    ${date}
  </body>
`;

  res.send(foo);
});

router.get('/data', function (req, res, next) {

  console.log(data);

  let json = JSON.stringify(data);

  res.send(json);
});

router.get('/set', function (req, res, next) {
  data = JSON.parse(req.query.data);

  console.log(data);

  fs.writeFile("datafil.txt", JSON.stringify(data), { encoding: 'utf8' }, function (err, d) {
    if (err) {
      console.log(`Kunde inte skriva till filen.`)
    }
  });

  res.send("OK");
});

router.get('/gethighscore', function (req, res, next) {
  res.send(JSON.stringify(highscores));
});

router.get('/sethighscore', function (req, res, next) {
  let name = req.query.name;
  let score = req.query.score;

  let newscore = {name: name, score: score};

  highscores.entries.push(newscore);

  highscores.entries.sort((s1, s2) => s2.score - s1.score);

  highscores.entries.pop();

  fs.writeFile("highscore.txt", JSON.stringify(highscores), { encoding: 'utf8' }, function (err, d) {
    if (err) {
      console.log(`Kunde inte skriva till filen.`)
    }
  });

  res.send(JSON.stringify(highscores));
});

module.exports = router;

const express = require("express");
const cors = require("cors");
const secretInfo = require("./config.js")();
const app = express();
const pgp = require("pg-promise")();
const eS = require("express-session");
const expressSession = eS(secretInfo.secret);
const db = pgp(secretInfo.connect)


app.use(expressSession);
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//routes


app.post("/donation", async(req, res) => {
  let insertion = await db.none(
    `INSERT INTO donations (name, amount, institution, date) VALUES ($1, $2, $3, $4)`,
    [req.body.name, req.body.donation_amount, req.body.institution, req.body.date]
  );
});

app.post("/dollarpledge", async(req, res) => {
  console.log(req.body)
  let insertion = await db.none(
    `INSERT INTO dollarBasedPledge (name, institution, match_amount, donor_amount, cap, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [req.body.name, req.body.institution, req.body.match_amount, req.body.donor_amount, req.body.cap, req.body.start_date, req.body.end_date]
  );
});

app.post("/donorpledge", async(req, res) => {
  console.log(req.body)
  let insertion = await db.none(
    `INSERT INTO donorBasedPledge (name, institution, match_amount, donor_number, cap, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [req.body.name, req.body.institution, req.body.match_amount, req.body.donor_number, req.body.cap, req.body.start_date, req.body.end_date]
  );
});

app.post("/findschoolpledges", async(req, res) => {
  console.log(req.body)
  
  let donorBasedPledges = await db.manyOrNone(
    `SELECT * FROM donorBasedPledge where institution= '${req.body.institution}'`
  );
  let dollarBasedPledges = await db.manyOrNone(
    `SELECT * FROM dollarBasedPledge where institution= '${req.body.institution}'`
  );

  let all_pledges = donorBasedPledges.concat(dollarBasedPledges)

  res.send(all_pledges)
})

app.post("/getdonations", async(req, res) => {
  console.log(req.body)
  let donations = await db.manyOrNone(
    `SELECT * FROM donations where date between '${req.body.start_date}' and '${req.body.end_date}' and institution = '${req.body.institution}'`
  );
  
  res.send(donations)
})


app.listen(7000);
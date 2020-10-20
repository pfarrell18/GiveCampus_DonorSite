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
    `INSERT INTO donations (email, amount, institution, date) VALUES ($1, $2, $3, $4)`,
    [req.body.donor_email, req.body.donation_amount, req.body.institution, req.body.date]
  );
});


app.post("/pledge", async(req, res) => {
  console.log(req.body)
  let insertion = await db.none(
    `INSERT INTO pledges (name, email, institution, match_amount, divisor, cap, start_date, end_date, donor_based, date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    [req.body.name, req.body.email, req.body.institution, req.body.match_amount, req.body.divisor, req.body.cap, req.body.start_date, req.body.end_date, req.body.donor_based, req.body.date]
  );
});

app.post("/findschoolpledges", async(req, res) => {
  console.log(req.body)
  
  let pledges = await db.manyOrNone(
    `SELECT name, institution, match_amount, divisor, start_date, end_date, donor_based FROM pledges where institution= '${req.body.institution}'`
  );

 for (pledge of pledges){
  if (new Date(pledge.end_date) > new Date()){
    pledge["expired"]=false
  }else{
    pledge["expired"]=true
  }
 }

  res.send(pledges)
})

app.post("/getdonations", async(req, res) => {
  console.log(req.body)
  let donations = await db.manyOrNone(
    `SELECT * FROM donations where date between '${req.body.start_date}' and '${req.body.end_date}' and institution = '${req.body.institution}'`
  );
  
  res.send(donations)
})


app.listen(7000);
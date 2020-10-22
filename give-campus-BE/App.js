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
    `INSERT INTO donations (email, amount, institution_id, date) VALUES ($1, $2, $3, $4)`,
    [req.body.donor_email, req.body.donation_amount, req.body.institution_id, req.body.date]
  );
  res.send({"json":"format"})
});


app.post("/pledge", async(req, res) => {
  let insertion = await db.none(
    `INSERT INTO pledges (name, email, institution_id, match_amount, divisor, cap, start_date, end_date, donor_based, date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    [req.body.name, req.body.email, req.body.institution_id, req.body.match_amount, req.body.divisor, req.body.cap, req.body.start_date, req.body.end_date, req.body.donor_based, req.body.date]
  );
  res.send({"json":"format"})
});

app.post("/findschoolpledges", async(req, res) => {
  let pledges = await db.manyOrNone(
    `SELECT name, match_amount, divisor, start_date, end_date, donor_based, cap FROM pledges where institution_id= '${req.body.institution_id}'`
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


app.post("/findschoolinfo", async(req, res) => {
  let info = await db.oneOrNone(
    `SELECT * FROM institutions where id= '${req.body.institution_id}'`
  );
  res.send(info)
})

app.post("/getdonation", async(req, res) => {
  let donations = await db.manyOrNone(
    `SELECT * FROM donations where date between '${req.body.start_date}' and '${req.body.end_date}' and institution_id = '${req.body.institution_id}'`
  );
  res.send(donations)
})

app.get("/getinstitutions", async(req, res) => {
  let institutions = await db.manyOrNone(
    `SELECT id, institution FROM institutions`
  );
  res.send(institutions)
})

app.listen(7000);
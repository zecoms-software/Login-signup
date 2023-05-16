const express = require("express");
const app = express();
const port = 5000;
require("./db/conn");
const SignUps = require("./models/signup");
const path = require("path");
const hbs = require("hbs");
const staticPath = path.join(__dirname, "../public");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(staticPath));
app.set("view engine", "hbs");


app.get("/", (req, res) => {
  res.render("index");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  try {
    const SignupData = new SignUps({
      name: req.body.sname,
      email: req.body.email,
      password: req.body.password
    });
    const saveData = await SignupData.save();
    res.render("submit", { name: req.body.sname, email: req.body.email });

  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", async (req, res) => {
  try {
    const check = await SignUps.findOne({ email: req.body.email });
    if (check.email === req.body.email) {
      // req.toast('Error: Login Successfully!!');
      res.render('submit', { name: check.name, email: check.email });
    } else {
      // req.toast('Error: Incorrect username or password');
      res.redirect('/login');
    }
  } catch (err) {
    res.status(400).send(err);
  }
})

app.listen(port, () => { console.log(`listening from the port no ${port}`) });
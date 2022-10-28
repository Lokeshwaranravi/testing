const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});


const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "demo_test",
  password: "123",
  port: 5432,
});

client.connect();

const query = `
CREATE TABLE demo_test_2 (
    id serial,
    productName varchar,
    productQty varchar
);`;

client
  .query(query)
  .then((res) => {
    console.log("Table is successfully created");
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    client.end();
  });

// const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post("/add",(req,res)=>{

    const {id,productName,productQty}=req.body;
    const query = `
INSERT INTO demo_test_2 (id,productName,productQty)
VALUES ($1, $2, $3)
`[id, productName, productQty];
client.query(query, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Data insert successful');
    client.end();
});
})

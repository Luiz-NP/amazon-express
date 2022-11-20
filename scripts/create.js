const db = require('../src/db/pool');
require("../src/db/connect");

db.query(`CREATE TABLE tb_customer(
architect_id integer NOT NULL,
id serial PRIMARY KEY,
customer_name VARCHAR (50) UNIQUE NOT NULL)`, (err) => {
  if (err) console.log(err);

  console.log("tb_customer created.");

  db.query(`CREATE TABLE tb_construction(
    customer_id integer NOT NULL,
    id serial PRIMARY KEY,
    construction_name VARCHAR (50) UNIQUE NOT NULL)`, (err) => {
      if (err) console.log(err);
    
      console.log("tb_construction created.");
    
      process.exit();
    })
})



// db.query(`CREATE TABLE tb_client_jobsite(
// client_id integer NOT NULL,
// jobsite_id integer NOT NULL,
// PRIMARY KEY (client_id, jobsite_id),
// FOREIGN KEY (client_id) REFERENCES tb_client (id),
// FOREIGN KEY (jobsite_id) REFERENCES tb_jobsite (id)
// )`)
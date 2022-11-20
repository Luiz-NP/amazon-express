const db = require('../src/db/pool');
require("../src/db/connect");

db.query(`DROP TABLE tb_customer`, (err) => {
  if (err) console.log(err);

  console.log("tb_customer droped.");

  db.query(`DROP TABLE tb_construction`, (err) => {
    if (err) console.log(err);
  
    console.log("tb_construction droped.");
  
    process.exit();
  })
})




// db.query(`DROP TABLE tb_client_jobsite CASCADE`)
const db = require("./pool");

db.connect((err) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    
    console.log("connected");
})
// 
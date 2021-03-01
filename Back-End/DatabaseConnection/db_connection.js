const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'lab1-splitwise-rn.c2tiaptrhgwl.us-east-1.rds.amazonaws.com',
  port: '3306',
  user: 'shakthivel',
  password: 'Sunshine123',
  database: 'dbsplitwise',
});

con.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

module.exports = con;

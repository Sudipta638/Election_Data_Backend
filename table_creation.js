let mysql = require('mysql2');
const connection = mysql.createConnection(
    "mysql://root:ASRlGlCTabVxdUKTvvhDkEoBWNTbBXVR@roundhouse.proxy.rlwy.net:50118/railway"
   );

   connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL server!');
  });


connection.query(`
create table parlementary_election (
  ind int primary key,
  st_name VARCHAR(35),
  Year FLOAT,
  pc_no INT,
  pc_name VARCHAR(28),
  pc_type VARCHAR(5),
  cand_name VARCHAR(98),
  cand_sex CHAR(1),
  partyname VARCHAR(60),
  partyabbre VARCHAR(11),
  totvotpoll BIGINT,
  electors BIGINT
);
`, (err, results) => {
  if (err) throw err;
 // console.log(results[0]['COUNT(*)']);
  console.log('Table created');
});

connection.query(`
create table assembly_election (
    ind int primary key,
    st_name VARCHAR(35),
    Year FLOAT,
    ac_no INT,
    ac_name VARCHAR(28),
    ac_type VARCHAR(5),
    cand_name VARCHAR(98),
    cand_sex CHAR(1),
    partyname VARCHAR(60),
    partyabbre VARCHAR(11),
    totvotpoll BIGINT,
    electors BIGINT
);

`, (err, results) => {
  if (err) throw err;
 // console.log(results[0]['COUNT(*)']);
  console.log('Table created');
});







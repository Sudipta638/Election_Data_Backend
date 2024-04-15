let mysql = require('mysql2');
// const data = require('./parlementary_election.js'
// const data = require('./data.json');
const data = require('./pcdata.json');
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



  data.forEach((item, index) => {
    const sql = `INSERT INTO parlementary_election (ind, st_name, Year, pc_no, pc_name, pc_type, cand_name, cand_sex, partyname, partyabbre, totvotpoll, electors) VALUES (${index + 51740}, '${item.st_name}', ${item.year}, ${item.pc_no}, '${item.pc_name}', '${item.pc_type}', "${item.cand_name}", '${item.cand_sex}', "${item.partyname}", '${item.partyabbre}', ${item.totvotpoll}, ${item.electors});`;
    connection.query(sql, (err, results) => {
      if (err) throw err;
     console.log(index, 'Data inserted');
    });
  });
    // });
  // });
// data.forEach((item) => {
//   connection.query(item.sql, (err, results) => {
//     if (err) throw err;
//     console.log('Data inserted');
//   });
// })
  // connection.query("delete  from parlementary_election", (err, results) => {
  //       if (err) throw err;
  //       console.log('Data inserted');
  //     });
  // data.forEach((item) => {
    
  //   connection.query(item.sql, (err, results) => {
  //     if (err) throw err;
  //     console.log('Data inserted');
  //   });
  // });






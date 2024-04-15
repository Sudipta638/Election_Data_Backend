
  // let mysql = require('mysql2');
  let mysql = require('mysql');
const quaries = require('./quaries');
let connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password:'sudipta@638',
  database: 'project',
});

//  connection = mysql.createConnection(
//  "mysql://root:ASRlGlCTabVxdUKTvvhDkEoBWNTbBXVR@roundhouse.proxy.rlwy.net:50118/railway"
// );

// connection.connect((err) => {
//   if (err) return console.error(err.message);

//   console.log('Connected to the MySQL server.');
// });

// const connection = mysql.createConnection({
//   host: 'your_host',
//   user: 'your_user',
//   password: 'your_password',
//   database: 'your_database',
// });

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL server!');
});

const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());




//New Codes

//Total year present in database
app.get('/api/years', (req, res) => {
  connection.query(quaries.distinctYears, (err, results) => {
    if (err) {
      console.error(err.message);
      res.status(500).send(err);
    } else {
      const years = results.map(result => result.Year);
      res.status(200).json(years);
    }
  });
});


//Total number of states present in database
app.get('/api/states', (req, res) => {
  connection.query(quaries.distinctStates, (err, results) => {
    if (err) {
      console.error(err.message);
      res.status(500).send(err);
    } else {
      const states = results.map(result => result.st_name);
      res.status(200).json(states);
    }
  });
});

//Total number of Pc in a State
app.get('/api/pc_count/:state',(req,res)=>{
  connection.query(quaries.totalpcinStateinLatestyear ,[req.params.state ,req.params.state],(err,results)=>{
    if (err) {
      console.error(err.message);
      res.status(500).send(err);
    } else {
    //  console.log(results[0]['COUNT(*)']);
      res.status(200).json(results[0]['COUNT(DISTINCT pc_name)']);
    }
  });
})

//Total number of Ac in a State
app.get('/api/ac_count/:state',(req,res)=>{
  connection.query(quaries.totalacinStateinLatestyear,[req.params.state,req.params.state],(err,results)=>{
    if (err) {
      console.error(err.message);
      res.status(500).send
      (err);
    } else {
      console.log(results[0]['COUNT(DISTINCT ac_name)']);
      res.status(200).json(results[0]['COUNT(DISTINCT ac_name)']);
    }
  });
})


app.get('/api/votepoll/:state',(req,res)=>{
  connection.query(quaries.totalvotepollinStateLatestyear,[req.params.state,req.params.state],(err,results)=>{
    if (err) {
      console.error(err.message);
      res.status(500).send(err);
    } else {
      console.log(results[0]['SUM(totvotpoll)']);
      res.status(200).json(results[0]['SUM(totvotpoll)']);
    }
  });
})



app.get('/api/electors/:state',(req,res)=>{
  connection.query(quaries.totalelectorsinaStaeLatestyear,[req.params.state,req.params.state],(err,results)=>{
    if (err) {
      console.error(err.message);
      res.status(500).send(err);
    } else {
      console.log("lll"+results);
      res.status(200).json(results[0]['SUM(DISTINCT electors)']);
    }
  });
})

app.get('/api/LokShobaWinner/:state',(req,res)=>{
  connection.query(quaries.LokShobaWinnerInaState,[req.params.state ,req.params.state],(err,results)=>{
    if(err){
      console.error(err.message)
      res.status(500).send(err);
    }
    else{
     // console.log(results)
      res.status(200).json(results);
    }
  })
}
);

app.get('/api/BidhanShobaWinner/:state',(req,res)=>{
  connection.query(quaries.BidhanShobhaWinnerInaState,[req.params.state ,req.params.state],(err,results)=>{
    if(err){
      console.error(err.message)
      res.status(500).send(err);
    }
    else{
      console.log(results)
      res.status(200).json(results);
    }
  })
}
);

app.get('/api/UniqueAcNames/:state',(req,res)=>{
  connection.query(quaries.UniqueAcNamesInaStateInLastestYear,[req.params.state ,req.params.state],(err,results)=>{
    if(err){
      console.error(err.message)
      res.status(500).send(err);
    }
    else{
      console.log(results)
      res.status(200).json(results);
    }
  })
}
);

app.get('/api/TotalVotepollbyaCandidateinaac/:state/:ac_name',(req,res)=>{
  connection.query(quaries.TotalVotepollbyaCandidateinaac,[req.params.ac_name ,req.params.state],(err,results)=>{
    if(err){
      console.error(err.message)
      res.status(500).send(err);
    }
    else{
      console.log(results)
      res.status(200).json(results);
    }
  })
});

app.get('/api/UniquePcNames/:state',(req,res)=>{
  connection.query(quaries.UniquePcNamesInaStateInLastestYear,[req.params.state ,req.params.state],(err,results)=>{
    if(err){
      console.error(err.message)
      res.status(500).send(err);
    }
    else{
      console.log(results)
      res.status(200).json(results);
    }
  })
}
);

app.get("api/UniqueAcNames/:state",(req,res)=>{
  connection.query(quaries.UniqueAcNamesInaStateInLastestYear,[req.params.state ,req.params.state],(err,results)=>{
    if(err){
      console.error(err.message)
      res.status(500).send(err);
    }
    else{
      console.log(results)
      res.status(200).json(results);
    }
  })
}
);

app.get('/api/TotalVotepollbyaCandidateinapc/:state/:pc_name',(req,res)=>{
  connection.query(quaries.TotalVotepollbyaCandidateinapc,[req.params.pc_name ,req.params.state],(err,results)=>{
    if(err){
      console.error(err.message)
      res.status(500).send(err);
    }
    else{
      console.log(results)
      res.status(200).json(results);
    }
  })
});

app.get('/api/TotalVotepollbyaCandidateinaac/:state/:pc_name',(req,res)=>{
  connection.query(quaries.TotalVotepollbyaCandidateinaac,[req.params.pc_name ,req.params.state],(err,results)=>{
    if(err){
      console.error(err.message)
      res.status(500).send(err);
    }
    else{
      console.log(results)
      res.status(200).json(results);
    }
  })
});
app.get('/api/TotalVotepollbyaCandidateinaac/:state/:pc_name',(req,res)=>{
  connection.query(quaries.TotalVotepollbyaCandidateinaac,[req.params.pc_name ,req.params.state],(err,results)=>{
    if(err){
      console.error(err.message)
      res.status(500).send(err);
    }
    else{
      console.log(results)
      res.status(200).json(results);
    }
  })
});

app.get('/api/partynames',(req,res)=>{
  connection.query(quaries.UnionofPartynameinStateandNationalElectionsortedbyAlaphabet,(err,results)=>{
    if(err){
      console.error(err.message)
      res.status(500).send(err);
    }
    else{
    
      res.status(200).json(results);
    }
});
});

app.get('/api/pc_won_by_party_yearwise/:party', (req, res) => {
  connection.query(quaries.pcWonByPartyYearwise, [req.params.party], (err, results) => {
    if (err) {
      console.error(err.message);
      res.status(500).send(err);
      
    } else {
      console.log(results)
      res.status(200).json(results);
    }
  });
});

app.get('/api/ac_won_by_party_yearwise/:party', (req, res) => {
  connection.query(quaries.acWonByPartyYearwise, [req.params.party], (err, results) => {
    if (err) {
      console.error(err.message);
      res.status(500).send(err);
    } else {
      console.log(results)
      res.status(200).json(results);
    }
  });
});

app.get('/api/total_male_and_female_candidates_yearwise', (req, res) => {
  connection.query(quaries.TotalMaleandFemaleCandidatesInnationalelctionYearwise, (err, results) => {
    if (err) {
      console.error(err.message);
      res.status(500).send(err);
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/api/caste_wise_candidates_yearwise', (req, res) => {
  connection.query(quaries.CasteWiseCandidatesInnationalelctionYearwise, (err, results) => {
    if (err) {
      console.error(err.message);
      res.status(500).send(err);
    } else {
      res.status(200).json(results);
    }
  });
});


app.get('/api/votes_percentage_yearwise', (req, res) => {
  connection.query(quaries.VoteGivenPercentageInNationalElectionYearwise, (err, results) => {
    if (err) {
      console.error(err.message);
      res.status(500).send(err);
    }
    else {
      res.status(200).json(results);
    }
  }
  );
}
);

app.get('/api/total_male_and_female_candidates_yearwiseinstate/:state', (req, res) => {
  connection.query(quaries.TotalMaleandFemaleCandidatesInstateelectionYearwiseinSpecificstate, [req.params.state, req.params.state], (err, results) => {
    if (err) {
      console.error(err.message);
      res.status(500).send(err);
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/api/caste_wise_candidates_yearwiseinstate/:state', (req, res) => {
  connection.query(quaries.CasteWiseCandidatesInnationalelctionYearwiseinSpecificstate, [req.params.state, req.params.state], (err, results) => {
    if (err) {
      console.error(err.message);
      res.status(500).send(err);
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/api/votes_percentage_yearwiseinstate/:state', (req, res) => {
  connection.query(quaries.VoteGivenPercentageInstateElectionYearwiseinSpecificstate, [req.params.state, req.params.state], (err, results) => {
    if (err) {
      console.error(err.message);
      res.status(500).send(err);
    }
    else {
      res.status(200).json(results);
    }
  }
  );
});

app.get('/api/AverageVotePercentageinPc',(req,res)=>{
  connection.query(quaries.AverageVotePercentageinPc,(err, results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send(err);
    }
    else{
      res.status(200).json(results);
    }
  })
})


app.get('/api/MaxVotePercentageinPc',(req,res)=>{
  connection.query(quaries.Maxvotepercentage,(err, results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send(err);
    }
    else{
      res.status(200).json(results);
    }
  })
})

app.get('/api/MinVotePercentageinPc',(req,res)=>{
  connection.query(quaries.Minvotepercentage,(err, results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send(err);
    }
    else{
      res.status(200).json(results);
    }
  })
})

app.get('/api/VotePercentageinApcPCyearwise/:state/:pc_name',(req,res)=>{
  connection.query(quaries.VotePercentageinApcPCyearwise,[req.params.pc_name ,req.params.state],(err,results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send(err);
    }
    else{
      res.status(200).json(results);
    }
  })
})
app.get('/api/VotePercentageinApcACyearwise/:state/:pc_name',(req,res)=>{
  connection.query(quaries.VotePercentageinApcACyearwise,[req.params.pc_name ,req.params.state],(err,results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send(err);
    }
    else{
      res.status(200).json(results);
    }
  })
})
app.get('/api/vote_percentage_latest_year/:pc_name/:st_name', (req, res) => {
  connection.query(quaries.VotePercentageinLastestYearinSpeficyear, 
    [req.params.pc_name, req.params.st_name], 
    (err, results) => {
      if (err) {
        console.error(err.message);
        res.status(500).send(err);
      } else {
        console.log(results)
        res.status(200).json(results);
      }
    }
  );
});

app.get('/api/latest_yearinpc/:pc_name/:st_name', (req, res) => {
  connection.query(quaries.LatestYaerInSpeficPc, 
    [req.params.pc_name, req.params.st_name], 
    (err, results) => {
      if (err) {
        console.error(err.message);
        res.status(500).send(err);
      } else {
        console.log(results)
        res.status(200).json(results);
      }
    }
  );
});
app.get('/api/MinVotePercentageinApcPCyearwise/:state/:pc_name',(req,res)=>{
  connection.query(quaries.MinVotePercentageinApcPCyearwise,[req.params.pc_name ,req.params.state],(err,results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send(err);
    }
    else{
      res.status(200).json(results);
    }
  })
})



app.get('/api/MaxVotePerCentageinApcPCyearwise/:state/:pc_name',(req,res)=>{
  connection.query(quaries.MaxVotePerCentageinApcPCyearwise,[req.params.pc_name ,req.params.state],(err,results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send(err);
    }
    else{
      res.status(200).json(results);
    }
  })
})


app.get('/api/AvgVotePerCentangeinApcPCyearwise/:state/:pc_name',(req,res)=>{
  connection.query(quaries.AvgVotePerCentangeinApcPCyearwise,[req.params.pc_name ,req.params.state],(err,results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send(err);
    }
    else{
      res.status(200).json(results);
    }
  })
})

app.get('/api/AvgFemaleandMaleRatioacrossPcinLatestYear',(req,res)=>{
  connection.query(quaries.AvgFemaleandMaleRatioacrossPcinLatestYear,(err, results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send(err);
    }
    else{
      res.status(200).json(results);
    }
  })
})

app.get('/api/AvgFemaleandMaleRatioacrossPcinLatestYear',(req,res)=>{
  connection.query(quaries.AvgFemaleandMaleRatioacrossPcinLatestYear,(err, results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send(err);
    }
    else{
      res.status(200).json(results);
    }
  })
})



app.get('/api/MaxFemaleandMaleRatioacrossPcinLatestYear',(req,res)=>{
  connection.query(quaries.MaxFemaleandMaleRatioacrossPcinLatestYear,(err, results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send(err);
    }
    else{
      res.status(200).json(results);
    }
  })
})

app.get('/api/MinFemaleandMaleRatioacrossPcinLatestYear',(req,res)=>{
  connection.query(quaries.MinFemaleandMaleRatioacrossPcinLatestYear,(err, results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send(err);
    }
    else{
      res.status(200).json(results);
    }
  })
})


app.get('/api/FemaleandMaleRationinApcPCyearwise/:state/:pc_name',(req,res)=>{
  connection.query(quaries.FemaleandMaleRationinApcPCyearwise,[req.params.pc_name ,req.params.state],(err,results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send(err);
    }
    else{
      res.status(200).json(results);
    }
  })
})

app.get('/api/FemaleandMaleRationinApcACyearwise/:state/:pc_name',(req,res)=>{
  connection.query(quaries.FemaleandMaleRationinApcACyearwise,[req.params.pc_name ,req.params.state],(err,results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send(err);
    }
    else{
      res.status(200).json(results);
    }
  })
})


app.get('/api/AvgFemaleandMaleRationinApcPCyearwise/:state/:pc_name',(req,res)=>{
  connection.query(quaries.AvgFemaleandMaleRationinApcPCyearwise,[req.params.pc_name ,req.params.state],(err,results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send(err);
    }
    else{
      res.status(200).json(results);
    }
  })
})


app.get('/api/MaxFemaleandMaleRationinApcPCyearwise/:state/:pc_name',(req,res)=>{
  connection.query(quaries.MaxFemaleandMaleRationinApcPCyearwise,[req.params.pc_name ,req.params.state],(err,results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send(err);
    }
    else{
      res.status(200).json(results);
    }
  })
})


app.get('/api/MinFemaleandMaleRationinApcPCyearwise/:state/:pc_name',(req,res)=>{
  connection.query(quaries.MinFemaleandMaleRationinApcPCyearwise,[req.params.pc_name ,req.params.state],(err,results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send(err);
    }
    else{
      res.status(200).json(results);
    }
  })
})

app.get('/api/candidate_status/:state/:pc_name', (req, res) => {
  connection.query(quaries.Candidatesdetailsinpcanalysis, 
    [req.params.pc_name, req.params.state, req.params.pc_name, req.params.state], 
    (err, results) => {
      if (err) {
        console.error(err.message);
        res.status(500).send(err);
      } else {
        res.status(200).json(results);
      }
    }
  );
});
app.get('/api/candidate_statusinac/:state/:pc_name', (req, res) => {
  connection.query(quaries.Candidatesdetailsinacanalysis, 
    [req.params.pc_name, req.params.state, req.params.pc_name, req.params.state], 
    (err, results) => {
      if (err) {
        console.error(err.message);
        res.status(500).send(err);
      } else {
        res.status(200).json(results);
      }
    }
  );
});


app.get('/api/winner_latest_year/:state/:pc_name', (req, res) => {
  connection.query(
    quaries.PcDetails, 
    [req.params.pc_name, req.params.state, req.params.pc_name, req.params.state], 
    (err, results) => {
      if (err) {
        console.error(err.message);
        res.status(500).send(err);
      } else {
        res.status(200).json(results);
      }
    }
  );
});
app.get('/api/winner_latest_yearinac/:state/:pc_name', (req, res) => {
  connection.query(
    quaries.AcDetails, 
    [req.params.pc_name, req.params.state, req.params.pc_name, req.params.state], 
    (err, results) => {
      if (err) {
        console.error(err.message);
        res.status(500).send(err);
      } else {
        res.status(200).json(results);
      }
    }
  );
});


app.get("/api/pcseatwonsinlatestyear/:state/:partyname",(req,res)=>{
  connection.query(quaries.pcWonByASpecififcpartyinlatestyear,[req.params.state,req.params.partyname],(err,results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send(err);
    }
    else{
      res.status(200).json(results);
    }
  }
  )
}
)
app.get("/api/acseatwonsinlatestyear/:state/:partyname",(req,res)=>{
  connection.query(quaries.acWonByASpecififcpartyinlatestyear,[req.params.state,req.params.partyname],(err,results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send(err);
    }
    else{
      res.status(200).json(results);
    }
  }
  )
}
)


app.get("/api/latestyearinparticipatedbyaparty/:partyname",(req,res)=>{
  connection.query(quaries.LastParticiptingyearofapartyinunionofsatateandnationalelection,[req.params.partyname , req.params.partyname],(err,results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send
      (err);
    }
    else{
      res.status(200).json(results);
    }
  }
  )
}
)

app.get("/api/CurrentlyPresentState/:partyname",(req,res)=>{
  connection.query(quaries.CurrentlyPresentstatesforSpecificpartyinLatestYear,[req.params.partyname,req.params.partyname ],(err,results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send
      (err);
    }
    else{
      res.status(200).json(results);
    }
  }
  )
} 
)

app.get("/api/wonAssemblyStates/:partyname",(req,res)=>{
  connection.query(quaries.WonAssemblyElectionStatesbyaSpecificParty,[req.params.partyname ],(err,results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send
      (err);
    }
    else{
      res.status(200).json(results);
    }
  }
  )
}
)


app.get("/api/OppostionPartyStatus/:partyname",(req,res)=>{
  connection.query(quaries.OppostionPartyStatusStates,[req.params.partyname ],(err,results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send
      (err);
    }
    else{
      res.status(200).json(results);
    }
  }
  )
}
)

app.get("/api/pcelectionwonyears/:partyname",(req,res)=>{
  connection.query(quaries.PcElectionWonYears,[req.params.partyname ,req.params.partyname],(err,results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send
      (err);
    }
    else{
      res.status(200).json(results);
    }
  }
  )
})


app.get("/api/acelectionwonyearwise/:st_name/:partyname",(req,res)=>{
  connection.query(quaries.AcSeatwonYearwiseinSpecificState,[req.params.st_name ,req.params.partyname],(err,results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send
      (err);
    }
    else{
      console.log(results)
      res.status(200).json(results);
    }
  }
  )
})

app.get("/api/pcelectionwonyearwise/:st_name/:partyname",(req,res)=>{
  connection.query(quaries.PcSeatwonYearwiseinSpecificState,[req.params.st_name ,req.params.partyname],(err,results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send
      (err);
    }
    else{
      console.log(results)
      res.status(200).json(results);
    }
  }
  )
})


app.get("/api/acparticipationyaerwise/:partyname",(req,res)=>{
  connection.query(quaries.AcSeatParticipateYearwise,[req.params.partyname],(err,results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send
      (err);
    }
    else{
      console.log(results)
      res.status(200).json(results);
    }
  }
  )
})

app.get("/api/pcparticipationyaerwise/:partyname",(req,res)=>{
  connection.query(quaries.AcSeatParticipateYearwise,[req.params.partyname],(err,results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send
      (err);
    }
    else{
      console.log(results)
      res.status(200).json(results);
    }
  }
  )
})

app.get("/api/candidatedetailsinpc/:partyname",(req,res)=>{
  connection.query(quaries.partycandidatedetailsinpe,[req.params.partyname],(err,results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send
      (err);
    }
    else{
      console.log(results)
      res.status(200).json(results);
    }
  }
  )
})

app.get("/api/candidatedetailsinac/:partyname",(req,res)=>{
  connection.query(quaries.partycandidatedetailsinse,[req.params.partyname],(err,results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send
      (err);
    }
    else{
      console.log(results)
      res.status(200).json(results);
    }
  }
  )
}) 
 

app.get("/api/iscandidatepresent/:candidate",(req,res)=>{
  connection.query(quaries.Iscandidatepresent,[req.params.candidate ],(err,results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send
      (err);
    }
    else{
      console.log(results)
      res.status(200).json(results);
    }
  }
  )
})


app.get("/api/candidatedetailsonpc/:candidate",(req,res)=>{
  connection.query(quaries.CandidatedetailsinPC,[req.params.candidate],(err,results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send
      (err);
    }
    else{
      console.log(results)
      res.status(200).json(results);
    }
  }
  )
})

app.get("/api/candidatedetailsonac/:candidate",(req,res)=>{
  connection.query(quaries.CandidatedetailsinAC,[req.params.candidate],(err,results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send
      (err);
    }
    else{
      console.log(results)
      res.status(200).json(results);
    }
  }
  )
}
)

app.get("/api/candidatedetails/:candidate",(req,res)=>{
  connection.query(quaries.Candidategenderandsex,[req.params.candidate ,req.params.candidate],(err,results)=>{
    if(err){
      console.error(err.message);
      res.status(500).send
      (err);
    }
    else{
      console.log(results)
      res.status(200).json(results);
    }
  }
  )
})
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
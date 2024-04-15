// queries.js

const queries = {
  totalyaers:
    "const qCOUNT(ueries = year) AS total_years FROM national_elections",
  totalstates:
    "SELECT COUNT(DISTINCT st_)total_ FROM national_elections",
  countTypes:
    'SELECT COUNT(CASE WHEN pc_type = "GEN" THEN 1 END) AS general,COUNT(CASE WHEN pc_type = "SC" THEN 1 END) AS sc, COUNT(CASE WHEN pc_type = "ST" THEN 1 END) AS st FROM national_elections WHERE st_name = "Bihar" AND year = 1999',
  countScCandidates:
    'SELECT COUNT(*) FROM  national_elections WHERE pc_type = "SC"',
  distinctYears: "SELECT DISTINCT Year FROM national_elections",
  distinctStates: "SELECT DISTINCT st_name FROM national_elections",
  totalpcinState: "SELECT COUNT(*) FROM national_elections WHERE st_name =?",
  totalacinState: "SELECT COUNT(*) FROM state_elections WHERE st_name =?",
  totalpcinStateinLatestyear:
    "SELECT COUNT(DISTINCT pc_name) FROM national_elections WHERE st_name =? AND year = (SELECT MAX(year) FROM national_elections WHERE st_name =?)",
  totalacinStateinLatestyear:
    "SELECT COUNT(DISTINCT ac_name) FROM state_elections WHERE st_name = ? AND year = (SELECT MAX(year) FROM state_elections WHERE st_name = ?)",
  totalvotepollinStateLatestyear:
    "SELECT SUM(totvotpoll) FROM national_elections WHERE st_name = ? AND year = (SELECT MAX(year) FROM national_elections WHERE st_name = ?)",
  totalelectorsinaStaeLatestyear:
    "SELECT SUM(DISTINCT electors) FROM national_elections WHERE st_name = ? AND year = (SELECT MAX(year) FROM national_elections WHERE st_name = ?)",
  LokShobaWinnerInaState: `
    SELECT ne1.cand_name, ne1.year,ne1.partyname AS party, ne1.pc_name AS pc_name, ne1.pc_no AS pc_no, (ne1.totvotpoll / ne2.total_votes) * 100 AS vote_percentage
FROM national_elections ne1
JOIN (
  SELECT year, pc_no, MAX(totvotpoll) AS max_votes
  FROM national_elections
where st_name = ?
  GROUP BY year, pc_no
) subquery ON ne1.year = subquery.year AND ne1.pc_no = subquery.pc_no AND ne1.totvotpoll = subquery.max_votes
JOIN (
  SELECT year, pc_no, SUM(totvotpoll) AS total_votes
  FROM national_elections
where st_name = ?
  GROUP BY year, pc_no
) ne2 ON ne1.year = ne2.year AND ne1.pc_no = ne2.pc_no
  `,

  BidhanShobhaWinnerInaState: `
  SELECT ne1.cand_name, ne1.year, ne1.partyname AS party ,ne1.ac_name AS ac_name, ne1.ac_no AS ac_no, (ne1.totvotpoll / ne2.total_votes) * 100 AS vote_percentage
FROM state_elections ne1
JOIN (
  SELECT year, ac_no, MAX(totvotpoll) AS max_votes
  FROM state_elections
where st_name = ?
  GROUP BY year, ac_no
) subquery ON ne1.year = subquery.year AND ne1.ac_no = subquery.ac_no AND ne1.totvotpoll = subquery.max_votes
JOIN (
  SELECT year, ac_no, SUM(totvotpoll) AS total_votes
  FROM state_elections
where st_name = ?
  GROUP BY year, ac_no
) ne2 ON ne1.year = ne2.year AND ne1.ac_no = ne2.ac_no
  `,
  UniqueAcNamesInaStateInLastestYear:
    "SELECT DISTINCT ac_name FROM state_elections WHERE st_name = ? AND year = (SELECT MAX(year) FROM state_elections WHERE st_name = ?)",
  TotalVotepollbyaCandidateinaac:
    "select  year , totvotpoll , partyname ,cand_name from state_elections where ac_name =? and st_name = ? ",
  UniquePcNamesInaStateInLastestYear:
    "SELECT DISTINCT pc_name FROM national_elections WHERE st_name = ? AND year = (SELECT MAX(year) FROM national_elections WHERE st_name = ?)",
    UniqueAcNamesInaStateInLastestYear:
    "SELECT DISTINCT ac_name FROM state_elections WHERE st_name = ? AND year = (SELECT MAX(year) FROM state_elections WHERE st_name = ?)",
  TotalVotepollbyaCandidateinapc:
    "select  year , totvotpoll , partyname ,cand_name from national_elections where pc_name =? and st_name = ? ",
  TotalVotepollbyaCandidateinaac:
    "select  year , totvotpoll , partyname ,cand_name from state_elections where ac_name =? and st_name = ? ",
  UnionofPartynameinStateandNationalElectionsortedbyAlaphabet:
    "SELECT partyname FROM national_elections  INTERSECT SELECT partyname FROM state_election",
  pcWonByPartyYearwise: `
  SELECT year, COUNT(*) AS pc_won
  FROM (
    SELECT year, pc_no, RANK() OVER (PARTITION BY year, pc_no ORDER BY totvotpoll DESC) as rank_number
    FROM national_elections
    WHERE partyname = ?
  ) subquery
  WHERE rank_number = 1
  GROUP BY year
  `,
  acWonByPartyYearwise: `
  SELECT year, COUNT(*) AS ac_won
FROM (
  SELECT year, ac_no, RANK() OVER (PARTITION BY year, ac_no ORDER BY totvotpoll DESC) as rank_number
  FROM state_elections
  WHERE partyname = ?
) subquery
WHERE rank_number = 1
GROUP BY year
  `,
  TotalMaleandFemaleCandidatesInnationalelctionYearwise: `
SELECT year,  cand_sex, COUNT(*) AS total_candidates
FROM national_elections
WHERE cand_sex IN ('M', 'F')
GROUP BY year,  cand_sex
`,
  CasteWiseCandidatesInnationalelctionYearwise: `
SELECT year, pc_type, COUNT(*) AS total_candidates
FROM national_elections
WHERE pc_type IN ('GEN', 'SC', 'ST')
GROUP BY year, pc_type
`,

  VoteGivenPercentageInNationalElectionYearwise: `
SELECT ne.year, SUM(ne.totvotpoll) / (SELECT SUM(distinct_electors.electors) FROM (SELECT DISTINCT year, pc_no, electors FROM national_elections) as distinct_electors WHERE distinct_electors.year = ne.year) * 100 AS vote_percentage
FROM national_elections ne 
GROUP BY ne.year
`,
  TotalMaleandFemaleCandidatesInstateelectionYearwiseinSpecificstate: `
SELECT year,  cand_sex, COUNT(*) AS total_candidates
FROM state_elections
WHERE cand_sex IN ('M', 'F') and st_name = ?
GROUP BY year,  cand_sex

`,

  CasteWiseCandidatesInnationalelctionYearwiseinSpecificstate: `
SELECT year, ac_type, COUNT(*) AS total_candidates
FROM state_elections
WHERE ac_type IN ('GEN', 'SC', 'ST') and st_name = ?
GROUP BY year, ac_type
`,
  VoteGivenPercentageInstateElectionYearwiseinSpecificstate: `
SELECT ne.year, SUM(ne.totvotpoll) / (SELECT SUM(distinct_electors.electors) FROM (SELECT DISTINCT year,  electors FROM state_elections) as distinct_electors WHERE distinct_electors.year = ne.year) * 100 AS vote_percentage
FROM state_elections ne 
WHERE st_name = ?
GROUP BY ne.year
`,
  AverageVotePercentageinPc: `
SELECT AVG(vote_percentage) AS avg_vote_percentage
FROM (
  SELECT ne.pc_no, (SUM(ne.totvotpoll) / electors) * 100 AS vote_percentage
  FROM national_elections ne
  WHERE ne.year = (SELECT MAX(year) FROM national_elections)
  GROUP BY ne.pc_no, electors
) subquery
`,

  Maxvotepercentage: `
SELECT MAX(vote_percentage) AS max_vote_percentage
FROM (
  SELECT ne.pc_no, (SUM(ne.totvotpoll) / electors) * 100 AS vote_percentage
  FROM national_elections ne
  WHERE ne.year = (SELECT MAX(year) FROM national_elections)
  GROUP BY ne.pc_no, electors
) subquery
`,
  Minvotepercentage: `
SELECT Min(vote_percentage) AS min_vote_percentage
FROM (
  SELECT ne.pc_no, (SUM(ne.totvotpoll) / electors) * 100 AS vote_percentage
  FROM national_elections ne
  WHERE ne.year = (SELECT MAX(year) FROM national_elections)
  GROUP BY ne.pc_no, electors
) subquery
`,
  VotePercentageinApcPCyearwise: `
SELECT year, pc_name, (SUM(totvotpoll) / electors) * 100 AS vote_percentage
FROM national_elections
WHERE pc_name = ? and st_name = ?
GROUP BY year, pc_name, electors

`,
VotePercentageinApcACyearwise:
`
SELECT year, ac_name, (SUM(totvotpoll) / electors) * 100 AS vote_percentage
FROM state_elections
WHERE ac_name = ? and st_name = ?
GROUP BY year, ac_name, electors


`,

  MinVotePercentageinApcPCyearwise: `
SELECT Min(vote_percentage) AS min_vote_percentage
FROM (
  SELECT year, pc_name, (SUM(totvotpoll) / electors) * 100 AS vote_percentage
  FROM national_elections
  WHERE pc_name = ? and st_name = ?
  GROUP BY year, pc_name, electors
) subquery
`,
  MaxVotePerCentageinApcPCyearwise: `
SELECT Max(vote_percentage) AS max_vote_percentage
FROM (
  SELECT year, pc_name, (SUM(totvotpoll) / electors) * 100 AS vote_percentage
  FROM national_elections
  WHERE pc_name = ? and st_name = ?
  GROUP BY year, pc_name, electors
) subquery
`,

  AvgVotePerCentangeinApcPCyearwise: `
SELECT AVG(vote_percentage) AS avg_vote_percentage
FROM (
  SELECT year, pc_name, (SUM(totvotpoll) / electors) * 100 AS vote_percentage
  FROM national_elections
  WHERE pc_name = ? and st_name = ?
  GROUP BY year, pc_name, electors
) subquery
`,
VotePercentageinLastestYearinSpeficyear:
`
SELECT  (SUM(totvotpoll) / electors) * 100 AS vote_percentage
FROM national_elections
WHERE year = (SELECT MAX(year) FROM national_elections) AND pc_name = ? and st_name = ?
GROUP BY pc_name, electors
`,
LatestYaerInSpeficPc:`
SELECT MAX(year) AS latest_year
FROM national_elections
WHERE pc_name = ? and st_name =?

`,
  MaxFemaleandMaleRatioacrossPcinLatestYear: `
SELECT year, Max(IF(cand_sex = 'F', 1, 0)) / AVG(IF(cand_sex = 'M', 1, 0)) AS avg_female_to_male_ratio
FROM national_elections
WHERE year = (SELECT MAX(year) FROM national_elections)
GROUP BY year
`,
  MinFemaleandMaleRatioacrossPcinLatestYear: `
SELECT year, Min(IF(cand_sex = 'F', 1, 0)) / AVG(IF(cand_sex = 'M', 1, 0)) AS avg_female_to_male_ratio
FROM national_elections
WHERE year = (SELECT MAX(year) FROM national_elections)
GROUP BY year
`,
  FemaleandMaleRationinApcPCyearwise: `
SELECT year, pc_name, SUM(IF(cand_sex = 'F', 1, 0)) / SUM(IF(cand_sex = 'M', 1, 0)) AS female_to_male_ratio
FROM national_elections
WHERE pc_name = ? and st_name = ?
GROUP BY year, pc_name
`,
  FemaleandMaleRationinApcACyearwise: `
SELECT year, pc_name, SUM(IF(cand_sex = 'F', 1, 0)) / SUM(IF(cand_sex = 'M', 1, 0)) AS female_to_male_ratio
FROM national_elections
WHERE pc_name = ? and st_name = ?
GROUP BY year, pc_name
`,
FemaleandMaleRationinApcACyearwise:
`
SELECT year, ac_name, SUM(IF(cand_sex = 'F', 1, 0)) / SUM(IF(cand_sex = 'M', 1, 0)) AS female_to_male_ratio
FROM state_elections
WHERE ac_name = ? and st_name = ?
GROUP BY year, ac_name
`,
  AvgFemaleandMaleRationinApcPCyearwise: `
SELECT AVG(female_to_male_ratio) AS avg_female_to_male_ratio
FROM (
  SELECT year, pc_name, SUM(IF(cand_sex = 'F', 1, 0)) / SUM(IF(cand_sex = 'M', 1, 0)) AS female_to_male_ratio
FROM national_elections
WHERE pc_name = ? and st_name = ?
GROUP BY year, pc_name
) subquery
`,
  MaxFemaleandMaleRationinApcPCyearwise: `
SELECT Max(female_to_male_ratio) AS max_female_to_male_ratio
FROM (
  SELECT year, pc_name, SUM(IF(cand_sex = 'F', 1, 0)) / SUM(IF(cand_sex = 'M', 1, 0)) AS female_to_male_ratio
FROM national_elections
WHERE pc_name = ? and st_name = ?
GROUP BY year, pc_name
) subquery
`,
  MinFemaleandMaleRationinApcPCyearwise: `
SELECT Min(female_to_male_ratio) AS min_female_to_male_ratio
FROM (
  SELECT year, pc_name, SUM(IF(cand_sex = 'F', 1, 0)) / SUM(IF(cand_sex = 'M', 1, 0)) AS female_to_male_ratio
FROM national_elections
WHERE pc_name = ? and st_name = ?
GROUP BY year, pc_name
) subquery
`,

Candidatesdetailsinpcanalysis:
`
SELECT ne.cand_name, ne.year ,ne.pc_type , (ne.totvotpoll / electors) * 100 AS vote_percentage, 
       IF(ne.totvotpoll = subquery.max_votes, 'Win', 'Lose') AS status
FROM national_elections ne
JOIN (
  SELECT year, pc_no, MAX(totvotpoll) AS max_votes
  FROM national_elections
  WHERE pc_name = ?  AND st_name = ?
  GROUP BY year, pc_no
) subquery ON ne.year = subquery.year AND ne.pc_no = subquery.pc_no
WHERE ne.pc_name = ? AND ne.st_name = ?
`,
Candidatesdetailsinacanalysis:
`
SELECT ne.cand_name, ne.year ,ne.pc_type , (ne.totvotpoll / electors) * 100 AS vote_percentage, 
       IF(ne.totvotpoll = subquery.max_votes, 'Win', 'Lose') AS status
FROM national_elections ne
JOIN (
  SELECT year, pc_no, MAX(totvotpoll) AS max_votes
  FROM national_elections
  WHERE pc_name = ?  AND st_name = ?
  GROUP BY year, pc_no
) subquery ON ne.year = subquery.year AND ne.pc_no = subquery.pc_no
WHERE ne.pc_name = ? AND ne.st_name = ?
`,
Candidatesdetailsinacanalysis:
`
SELECT se.cand_name, se.year ,se.ac_type , (se.totvotpoll / electors) * 100 AS vote_percentage,
        IF(se.totvotpoll = subquery.max_votes, 'Win', 'Lose') AS status
FROM state_elections se
JOIN (
  SELECT year, ac_no, MAX(totvotpoll) AS max_votes
  FROM state_elections
  WHERE ac_name = ?  AND st_name = ?
  GROUP BY year, ac_no
) subquery ON se.year = subquery.year AND se.ac_no = subquery.ac_no
WHERE se.ac_name = ? AND se.st_name = ? 
`,
  TotalVoteRecivedByaCandidateinNationalElectioninLatestyear:
    "SELECT SUM(totvotpoll) AS total_votes FROM national_elections WHERE cand_name = ? AND year = (SELECT MAX(year) FROM national_elections)",

  TotalVoteRecivedByaCandidateinStateElectioninLatestyear:
    "SELECT SUM(totvotpoll) AS total_votes FROM state_elections WHERE cand_name = ? AND year = (SELECT MAX(year) FROM state_elections)",

  TotalVoteRecivedByaCandidateinNationalElectioninLatestyear:
    "SELECT SUM(totvotpoll) AS total_votes FROM national_elections WHERE cand_name = ? AND year = (SELECT MAX(year) FROM national_elections)",

  TotalVoteRecivedByaCandidateinStateElectioninLatestyear:
    "SELECT SUM(totvotpoll) AS total_votes FROM state_elections WHERE cand_name = ? AND year = (SELECT MAX(year) FROM state_elections)",

  TotalVoteRecivedByaCandidateinNationalElectioninLatestyear:
    "SELECT SUM(totvotpoll) AS total_votes FROM national_elections WHERE cand_name = ? AND year = (SELECT MAX(year) FROM national_elections)",

  TotalVoteRecivedByaCandidateinStateElectioninLatestyear:
    "SELECT SUM(totvotpoll) AS total_votes FROM state_elections WHERE cand_name = ? AND year = (SELECT MAX(year) FROM state_elections)",

  TotalVoteRecivedByaCandidateinNationalElectioninLatestyear:
    "SELECT SUM(totvotpoll) AS total_votes FROM national_elections WHERE cand_name = ? AND year = (SELECT MAX(year) FROM national_elections)",

  TotalVoteRecivedByaCandidateinStateElectioninLatestyear:
    "SELECT SUM(totvotpoll) AS total_votes FROM state_elections WHERE cand_name = ? AND year = (SELECT MAX(year) FROM state_elections)",



 PcDetails:
 `
 SELECT ne.cand_name, ne.partyname, ne.totvotpoll, subquery.total_votes
FROM national_elections ne
JOIN (
  SELECT year, pc_no, MAX(totvotpoll) AS max_votes, SUM(totvotpoll) AS total_votes
  FROM national_elections
  WHERE pc_name = ? 
 AND st_name = ?   AND year = (SELECT MAX(year) FROM national_elections)
  GROUP BY year, pc_no
) subquery ON ne.year = subquery.year AND ne.pc_no = subquery.pc_no AND ne.totvotpoll = subquery.max_votes
WHERE ne.pc_name =  ?  AND ne.st_name = ? 
 `,
 AcDetails:
 `
  SELECT se.cand_name, se.partyname, se.totvotpoll, subquery.total_votes
FROM state_elections se
JOIN (
  SELECT year, ac_no, MAX(totvotpoll) AS max_votes, SUM(totvotpoll) AS total_votes
  FROM state_elections
  WHERE ac_name = ?
  AND st_name = ?   AND year = (SELECT MAX(year) FROM state_elections)
  GROUP BY year, ac_no
) subquery ON se.year = subquery.year AND se.ac_no = subquery.ac_no AND se.totvotpoll = subquery.max_votes
WHERE se.ac_name = ?  AND se.st_name = ?

 `,
 pcWonByASpecififcpartyinlatestyear:
 `

 SELECT COUNT(*) AS seats_won
 FROM (
   SELECT ne.pc_no
   FROM national_elections ne
   JOIN (
     SELECT year, pc_no, MAX(totvotpoll) AS max_votes
     FROM national_elections
     WHERE year = (SELECT MAX(year) FROM national_elections) AND st_name =?
     GROUP BY year, pc_no
   ) subquery ON ne.year = subquery.year AND ne.pc_no = subquery.pc_no AND ne.totvotpoll = subquery.max_votes
   WHERE ne.partyname = ?
 ) final_subquery;
 
 `,
 acWonByASpecififcpartyinlatestyear:
`
SELECT COUNT(*) AS seats_won
FROM (
  SELECT se.ac_no
  FROM state_elections se
  JOIN (
    SELECT year, ac_no, MAX(totvotpoll) AS max_votes
    FROM state_elections
    WHERE year = (SELECT MAX(year) FROM state_elections) AND st_name = ?
    GROUP BY year, ac_no
  ) subquery ON se.year = subquery.year AND se.ac_no = subquery.ac_no AND se.totvotpoll = subquery.max_votes
  WHERE se.partyname = ?
) final_subquery

`,
LastParticiptingyearofapartyinunionofsatateandnationalelection:
`
SELECT MAX(year) AS last_participating_year
FROM (
  SELECT year
  FROM national_elections
  WHERE partyname = ?
  UNION
  SELECT year
  FROM state_elections
  WHERE partyname = ?
) subquery
`,
 
CurrentlyPresentstatesforSpecificpartyinLatestYear:
`
SELECT DISTINCT st_name AS states
FROM (
  SELECT st_name
  FROM national_elections
  WHERE partyname = ? AND year = (SELECT MAX(year) FROM national_elections)
  UNION
  SELECT st_name
  FROM state_elections
  WHERE partyname = ? AND year = (SELECT MAX(year) FROM state_elections)
) subquery
`,
 TotalVoteRecivedByaPartyinNationalElectioninLatestyear:
 `
  SELECT SUM(totvotpoll) AS total_votes
  FROM national_elections
  WHERE partyname = ? AND year = (SELECT MAX(year) FROM national_elections)


 `,

  TotalVoteRecivedByaPartyinStateElectioninLatestyear:
  `
    SELECT SUM(totvotpoll) AS total_votes
    FROM state_elections
    WHERE partyname = ? AND year = (SELECT MAX(year) FROM state_elections)
  `,
  WonAssemblyElectionStatesbyaSpecificParty:
  `
  SELECT DISTINCT se.st_name
FROM state_elections se
JOIN (
  SELECT st_name, ac_no, MAX(totvotpoll) AS max_votes
  FROM state_elections
  WHERE year IN (SELECT MAX(year) FROM state_elections GROUP BY st_name)
  GROUP BY st_name, ac_no
) subquery ON se.st_name = subquery.st_name AND se.ac_no = subquery.ac_no AND se.totvotpoll = subquery.max_votes
WHERE se.partyname = ?

  `,
  OppostionPartyStatusStates:
  `
  SELECT st_name AS state
  FROM (
    SELECT
      se.st_name,
      se.partyname,
      RANK() OVER(PARTITION BY se.st_name, se.year ORDER BY COUNT(*) DESC) as party_rank
    FROM state_elections se
    JOIN (
      SELECT st_name, MAX(year) AS max_year
      FROM state_elections
      GROUP BY st_name
    ) subquery ON se.st_name = subquery.st_name AND se.year = subquery.max_year
    GROUP BY se.st_name, se.partyname, se.year
  ) final_subquery
  WHERE party_rank = 2 AND partyname = ?`,

 PcElectionWonYears:
 `
 SELECT year
FROM (
  SELECT year, partyname, COUNT(pc_no) as pc_count
  FROM national_elections
  GROUP BY year, partyname
) as counts
WHERE pc_count IN (
  SELECT MAX(pc_count)
  FROM (
    SELECT year, partyname, COUNT(pc_no) as pc_count
    FROM national_elections
    GROUP BY year, partyname
  ) as max_counts
  WHERE partyname = ?
)
AND partyname = ?
 `,
AcSeatwonYearwiseinSpecificState:
`
SELECT year, COUNT(*) AS seats_won
FROM (
  SELECT se.year, se.ac_no
  FROM state_elections se
  JOIN (
    SELECT year, ac_no, MAX(totvotpoll) AS max_votes
    FROM state_elections
    WHERE st_name = ?
    GROUP BY year, ac_no
  ) subquery ON se.year = subquery.year AND se.ac_no = subquery.ac_no AND se.totvotpoll = subquery.max_votes
  WHERE se.partyname = ?
) final_subquery
GROUP BY year
`,
PcSeatwonYearwiseinSpecificState:
`
SELECT year, COUNT(*) AS seats_won
FROM (
  SELECT ne.year, ne.pc_no
  FROM national_elections ne
  JOIN (
    SELECT year, pc_no, MAX(totvotpoll) AS max_votes
    FROM national_elections
    WHERE st_name = ?
    GROUP BY year, pc_no
  ) subquery ON ne.year = subquery.year AND ne.pc_no = subquery.pc_no AND ne.totvotpoll = subquery.max_votes
  WHERE ne.partyname = ?
) final_subquery
GROUP BY year
`,
AcSeatParticipateYearwise:
`
SELECT year, COUNT(*) AS seats_participated
FROM state_elections
WHERE partyname = ?
GROUP BY year
`,
PcSeatParticipateYearwise:
`
SELECT year, COUNT(*) AS seats_participated
FROM state_elections
WHERE partyname = ?
GROUP BY year
`
,
partycandidatedetailsinpe:
`
SELECT ne.year,ne.st_name, ne.pc_name as Seatname , ne.cand_name, ne.partyname,ne.cand_sex, ne.pc_type as Sex,
  CASE WHEN ne.totvotpoll = subquery.max_votes THEN 'Win' ELSE 'Lose' END AS status,
  (ne.totvotpoll / subquery.total_votes) * 100 AS vote_percentage
FROM national_elections ne
JOIN (
  SELECT year, pc_no, MAX(totvotpoll) AS max_votes, SUM(totvotpoll) AS total_votes
  FROM national_elections
  GROUP BY year, pc_no
) subquery ON ne.year = subquery.year AND ne.pc_no = subquery.pc_no
WHERE ne.partyname = ?
`,
partycandidatedetailsinse:
`
SELECT se.year, se.st_name, se.ac_name as Seatname, se.cand_name, se.partyname,se.cand_sex, se.ac_type as Sex,
  CASE WHEN se.totvotpoll = subquery.max_votes THEN 'Win' ELSE 'Lose' END AS status,
  (se.totvotpoll / subquery.total_votes) * 100 AS vote_percentage
FROM state_elections se
JOIN (
  SELECT year, ac_no, MAX(totvotpoll) AS max_votes, SUM(totvotpoll) AS total_votes
  FROM state_elections
  GROUP BY year, ac_no
) subquery ON se.year = subquery.year AND se.ac_no = subquery.ac_no
WHERE se.partyname = ?
`,
Iscandidatepresent:
`
SELECT 
  (SELECT COUNT(*) FROM national_elections WHERE cand_name ="Jagannath Prasad" ) +
  (SELECT COUNT(*) FROM state_elections WHERE cand_name = "Jagannath Prasad") AS presence
`,
CandidatedetailsinPC:
`
SELECT ne.pc_no, ne.pc_name as seatname, ne.st_name, ne.partyname,ne.Year, 
  (ne.totvotpoll / subquery.total_votes) * 100 AS vote_percentage,
  CASE WHEN ne.totvotpoll = subquery.max_votes THEN 'Win' ELSE 'Lose' END AS status
FROM national_elections ne
JOIN (
   SELECT year, pc_no,st_name, MAX(totvotpoll) AS max_votes, SUM(totvotpoll) AS total_votes
  FROM national_elections
  GROUP BY year, pc_no,st_name
) subquery ON ne.year = subquery.year AND ne.pc_no = subquery.pc_no AND ne.st_name = subquery.st_name
WHERE ne.cand_name = ?
`
,
CandidatedetailsinAC:
`
SELECT se.ac_no, se.ac_name as seatname, se.st_name, se.partyname,se.Year, 
  (se.totvotpoll / subquery.total_votes) * 100 AS vote_percentage,
  CASE WHEN se.totvotpoll = subquery.max_votes THEN 'Win' ELSE 'Lose' END AS status
FROM state_elections se
JOIN (
   SELECT year, ac_no,st_name, MAX(totvotpoll) AS max_votes, SUM(totvotpoll) AS total_votes
  FROM state_elections
  GROUP BY year, ac_no,st_name
) subquery ON se.year = subquery.year AND se.ac_no = subquery.ac_no AND se.st_name = subquery.st_name
WHERE se.cand_name = ?
`,
Candidategenderandsex:
`
SELECT cand_sex, pc_type as cand_gender
FROM national_elections
WHERE cand_name = ?
UNION
SELECT cand_sex,ac_type as cand_gender
FROM state_elections
WHERE cand_name = ?
LIMIT 1

`

};



module.exports = queries;

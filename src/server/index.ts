import express from "express";
import fs from "fs";
import path from "path";
import csvParser from 'csv-parser';
import cors from 'cors';
import bodyParser from "body-parser";

export interface Influencer {
  'Influencer insta name': string,
  'instagram name': string,
  category_1: string,
  category_2: string,
  Followers: string,
  'Audience country(mostly)': string,
  'Authentic engagement': string,
  'Engagement avg': string,
}

interface InfluencerWithNumbers extends Influencer{
  FollowersNum: number,
  'Authentic engagement num': number,
  'Engagement avg num': number,

}

const gerNumFromString = (num: string): number => {
  switch (num.at(-1)) {
    case 'K':
      return parseFloat(num) * 1000;
    case 'M':
      return parseFloat(num) * 1000000;
    case 'B':
      return parseFloat(num) * 1000000000;
    default:
      return parseFloat(num);
  }
}

const app = express();
app.use(bodyParser.json())
app.use(cors());

const PORT = 3000;

const dataFilePath = path.join(__dirname, "..", "..", "data", "instagram_influencers.csv");

function topInfluencersByCategory(data: Influencer[]) {
  const influencersByCategory = data.reduce((acc: {[category: string]: Influencer[]}, curr: InfluencerWithNumbers) => {
    curr.FollowersNum = gerNumFromString(curr.Followers);
    const categories = curr.category_1.split('/').concat(curr.category_2.split('/'));
    categories.forEach((category: string) => {
      if (category) {
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(curr);
      }
    });
    return acc;
  }, {});

  // Get top influencer in each category
  const topInfluencers: {[category: string]: Influencer} = {};
  for (const category in influencersByCategory) {
    const influencers = influencersByCategory[category];
    influencers.sort((a: InfluencerWithNumbers, b: InfluencerWithNumbers) => b.FollowersNum - a.FollowersNum);
    topInfluencers[category] = influencers[0];
  }

  return topInfluencers;
}

function topInfluencersPerCountryByEngagement(data: Influencer[]) {
  const influencersByCountry = data.reduce((acc: {[category: string]: Influencer[]}, curr: InfluencerWithNumbers) => {
    curr['Engagement avg num'] = gerNumFromString(curr['Engagement avg']);
    const country = curr["Audience country(mostly)"]
    if (country) {
      if (!acc[country]) {
        acc[country] = [];
      }
      acc[country].push(curr);
    }
    return acc;
  }, {});

  // Get top influencer in each category
  const topInfluencers: {[category: string]: Influencer} = {};
  for (const country in influencersByCountry) {
    const influencers = influencersByCountry[country];
    influencers.sort((a: InfluencerWithNumbers, b: InfluencerWithNumbers) => b['Engagement avg num'] - a['Engagement avg num']);
    topInfluencers[country] = influencers[0];
  }

  return topInfluencers;
}

app.get("/", (req, res) => {
  const data: Influencer[] = [];
  fs.createReadStream(dataFilePath)
    .pipe(csvParser())
    .on('data', (row: Influencer) => {
      data.push(row);
    })
    .on('end', () => {
      if (req.query.filter === 'category') {
        res.send(topInfluencersByCategory(data))
        return;
      }

      if (req.query.filter === 'country') {
        res.send(topInfluencersPerCountryByEngagement(data))
        return;
      }
      res.send(data);
    });
});

app.post("/instagram-influencers", (req, res) => {
  const data: Influencer[] = [{ ...req.body }];
  fs.createReadStream(dataFilePath)
    .pipe(csvParser())
    .on('data', (row: Influencer) => {
      data.push(row);
    })
    .on('end', () => {
      res.send(data);
    });
});

app.put("/instagram-influencers/:influencer_name", (req, res) => {
  const data: Influencer[] = [];
  fs.createReadStream(dataFilePath)
    .pipe(csvParser())
    .on('data', (row: Influencer) => {
      if (row["Influencer insta name"] === req.params.influencer_name) {
        row = { ...row, ...req.body }
      }
      data.push(row);
    })
    .on('end', () => {
      res.send(data);
    });
});

app.delete("/instagram-influencers/:influencer_name", (req, res) => {
  const data: Influencer[] = [];
  fs.createReadStream(dataFilePath)
    .pipe(csvParser())
    .on('data', (row: Influencer) => {
      if (row["Influencer insta name"] !== req.params.influencer_name) {
        data.push(row);
      }
    })
    .on('end', () => {
      res.send(data);
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

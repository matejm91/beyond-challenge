import express from "express";
import fs from "fs";
import path from "path";
import csvParser from 'csv-parser';
import cors from 'cors';
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json())
app.use(cors());

const PORT = 3000;

const dataFilePath = path.join(__dirname, "..", "..", "data", "instagram_influencers.csv");

app.get("/", (req, res) => {
  const data: any[] = [];
  fs.createReadStream(dataFilePath)
    .pipe(csvParser())
    .on('data', (row) => {
      data.push(row);
    })
    .on('end', () => {
      res.send(data);
    });
});

app.post("/instagram-influencers", (req, res) => {
  const data: any[] = [{...req.body}];
  fs.createReadStream(dataFilePath)
    .pipe(csvParser())
    .on('data', (row) => {
      data.push(row);
    })
    .on('end', () => {
      res.send(data);
    });
});

app.put("/instagram-influencers/:influencer_name", (req, res) => {
  const data: any[] = [];
  fs.createReadStream(dataFilePath)
    .pipe(csvParser())
    .on('data', (row) => {
      if (row["Influencer insta name"] === req.params.influencer_name) {
        row = {...row, ...req.body}
      }
      data.push(row);
    })
    .on('end', () => {
      res.send(data);
    });
});

app.delete("/instagram-influencers/:influencer_name", (req, res) => {
  const data: any[] = [];
  fs.createReadStream(dataFilePath)
    .pipe(csvParser())
    .on('data', (row) => {
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

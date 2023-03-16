import express from "express";
import fs from "fs";
import path from "path";
import csvParser from 'csv-parser';
import cors from 'cors';

const app = express();
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
      console.log('data .............................', data);
      res.send(data);
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const PORT = 3000;
const dataFilePath = path_1.default.join(__dirname, "..", "..", "data", "instagram_influencers.csv");
app.get("/", (req, res) => {
    const data = [];
    fs_1.default.createReadStream(dataFilePath)
        .pipe((0, csv_parser_1.default)())
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
//# sourceMappingURL=index.js.map
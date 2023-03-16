"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const fetchHook_1 = __importDefault(require("./fetchHook"));
const App = () => {
    const { data, loading, error } = (0, fetchHook_1.default)('http://localhost:3000');
    if (error) {
        console.log(error);
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        loading && react_1.default.createElement("div", null, "Loading..."),
        data && react_1.default.createElement("div", null, data.map((item) => react_1.default.createElement("div", null, item)))));
};
exports.default = App;
//# sourceMappingURL=index.js.map
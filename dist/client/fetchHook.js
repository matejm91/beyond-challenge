"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
function useFetch(url) {
    const [data, setData] = (0, react_1.useState)(null);
    const [error, setError] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        (function () {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    setLoading(true);
                    const response = yield axios_1.default.get(url);
                    setData(response.data);
                }
                catch (err) {
                    setError(err);
                }
                finally {
                    setLoading(false);
                }
            });
        })();
    }, [url]);
    return { data, error, loading };
}
exports.default = useFetch;
//# sourceMappingURL=fetchHook.js.map
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var fetchHook_1 = require("./fetchHook");
var App = function () {
    var _a = (0, fetchHook_1["default"])('http://localhost:3000'), data = _a.data, loading = _a.loading, error = _a.error;
    if (error) {
        console.log(error);
    }
    return (<>
      {loading && <div>Loading...</div>}
      {data && <div>{data.map(function (item) { return <div key={item.followers}>{item.category_1}</div>; })}</div>}
    </>);
};
exports["default"] = App;

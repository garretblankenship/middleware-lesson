const express = require("express");
const app = express();
const morgan = require("morgan");
const celebrate = require("celebrate");

global.HttpError = class HttpError extends Error {
    constructor(statusCode, message) {
        super(message);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, HttpError);
        }

        this.name = "HttpError";
        this.statusCode = statusCode;
    }
}

app.use(express.urlencoded());
app.use(express.json());

app.use(morgan());

app.use((req, res, next) => {
    console.log("Method", req.method);
    console.log("URL", req.url);
    console.log("Body", req.body || {});
    console.log("\n\n");
    next();
});

app.use(require("./routes"));

app.use((err, req, res, next) => {
    if (err && err.name === "HttpError") {
        return res.status(err.statusCode).send(err.message);
    }

    return next(err);
});

app.use((err, req, res, next) => {
    console.log("my 2nd error level middleware");
    next(err);
});

app.use(celebrate.errors());

module.exports = app;
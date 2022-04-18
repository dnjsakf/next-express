const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const morgan = require("morgan");
const createError = require("http-errors");

const { logger, stream } = require("./../config/logging");

module.exports = function(nextApp){
    const app = express();

    // Set parser
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SECRET_KEY,
        cookie: {
            httpOnly: true,
            secure: false,
        },
    }));

    // Set CORS
    app.use(cors());

    // Set compression, .gzip
    app.use(compression());

    // Set logger
    app.use(morgan('combined', { stream }));

    // Error Handler
    /*
    app.use((req, res, next)=>{
        next(createError(404, "Not Found"));
    });
    app.use((err, req, res)=>{
        res.locals.message = err.message;
        res.locals.error = req.app.get("env") === "development" ? err : {};
        res.status(err.status || 500);
        res.render("error");
    });
    */

    // Set routes
    app.use("/api/posts", require("./posts")(nextApp));

    return app;
}
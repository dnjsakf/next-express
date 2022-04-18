require("dotenv").config();

const dev = process.env.NODE_ENV !== "production";
const next = require("next");
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(()=>{
    const server = require("./routes")(app);

    server.all("*", (req, res)=>{
        return handle(req, res);
    });

    server.listen(parseInt(process.env.EXPRESS_PORT||3000), (err) => {
        if (err) throw err;
        console.log("Listening to 3000");
    });
});

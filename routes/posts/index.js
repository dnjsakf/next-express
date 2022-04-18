const { Router } = require("express");
const UserModel = require("./../../models/user");

module.exports = function(app){
    const posts = Router();

    const userModel = new UserModel();

    posts.get("/", async function(req, res) {
        const data = {
            rows: await userModel.getAll()
        };
        // return app.render(req, res, "/", data);
        return res.send(data);
    });
    
    return posts;
}
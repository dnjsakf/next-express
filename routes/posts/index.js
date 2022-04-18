const { Router } = require("express");

module.exports = function(app){
  const posts = Router();

  posts.get("/", function(req, res) {
    const data = {
      data: [
        { id: "1", title: "hellow~~~" }
      ]
    }
    return app.render(req, res, "/", data);
  });
  
  return posts;
}
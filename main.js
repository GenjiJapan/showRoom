var express = require("express");
var app = express();

app.set("view engine", "ejs");

var router = express.Router();

router.use(express.static("public"));

var webconfig = require("./webconfig");

function controller(name) {
  return require("./controllers/" + name + "-controller");
}

router.get("/", function (request, response) {
  controller("home").get(request, response, webconfig, model);
});

var datasource = require("./datasource/simple-datasource");
var model = require("./model/model").create(datasource);

// Setup web app

app.use(require("cookie-parser")());
var multer = require('multer');
var upload = multer({dest: 'tmp/'})


var urlencodeParser = require("body-parser").urlencoded({ extended: false });

router.get("/", function (request, response) {
  controller("home").get(request, response, webconfig, model);
});

router.get("/login", function (request, response) {
  controller("login").get(request, response, webconfig, model);
});

router.post("/login", urlencodeParser, function (request, response) {
  console.log('success')
  controller("login").post(request, response, webconfig, model);
});

router.get("/logout", function (request, response) {
  console.log('success')
  controller("logout").get(request, response, webconfig);
});

router.get("/edit-general-info", function (request, response) {

  controller("edit-general-info").get(request, response, webconfig, model);
});

router.post("/edit-general-info", upload.single('featureImage') , function (request, response) {

  controller("edit-general-info").post(request, response, webconfig,model);
});

app.use(webconfig.root, router);

app.listen(8080, function () {
  console.log("Server started OK!");
});

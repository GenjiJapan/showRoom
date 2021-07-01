var session = require("./session");
console.log('thành công')
function render(response, webconfig, username, errorMessage) {
  model.getGeneralInfo(function(generalInfo) {

    response.render("login", {
      root: webconfig.root,
      logged: false,
      username: username,
      generalInfo : generalInfo,
      errorMessage: errorMessage,
    });
  })
}

exports.get = function (request, response, webconfig, model) {
  if (session.logged(request)) {
    response.redirect(webconfig.root);
  } else {
    render(response, webconfig, "", false, model);
  }
};
exports.post = function (request, response, webconfig, model) {
  var query = request.body;
  model.authenticate(query.username, query.password, function (success) {
    if (success) {
      session.setLogged(response);
      response.redirect(webconfig.root);
    } else {
      render(response, webconfig, query.username, "Wrong login information", model);
    }
  });
};

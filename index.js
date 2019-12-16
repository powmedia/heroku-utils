/**
 * Get the client's remote IP address
 *
 * @param {Request} req
 * 
 * @return {String}
 */
exports.getRemoteIp = function(req) {
  var ip = req.headers['x-forwarded-for'];

  if (ip){
    var list = ip.split(',');
    ip = list[list.length-1];
  } else {
    ip = req.connection.remoteAddress;
  }

  return ip;
};



/**
 * Middleware for forcing HTTPS on Heroku
 */
exports.forceHttps = function(req, res, next) {
  //Get the original protocol (on Heroku HTTPS requests are forwarded on to HTTP)
  var protocol = req.headers['x-forwarded-proto'];

  if (protocol && protocol !== 'https') {
    res.redirect('https://' + req.headers.host + req.url);
  } else {
    next();
  }
}

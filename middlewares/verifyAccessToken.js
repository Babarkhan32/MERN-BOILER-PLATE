module.exports = asyncWrapper(async (request, response, next) => {
    if (!request.headers["authorization"]) {
      return response.status(401).send("Unauthorized");
    }
  
    const bearerHeader = request.headers["authorization"];
  
    const bearer = bearerHeader.split(" ");
  
    const bearerToken = bearer[1];
  
    try {
        const decoded = jwt.verify(bearerToken, config.TOKEN_KEY);
        request.user = decoded;
      } catch (err) {
        return response.status(401).send("Invalid Token");
      }
      return next();
    });
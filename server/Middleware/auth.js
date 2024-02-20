// module.exports = auth
const jwt = require("jsonwebtoken");
const validatetoken = async (req, res, next) => {
  let token;
  let authheader = req.headers.Authorization || req.headers.authorization;
  if (authheader && authheader.startsWith("Bearer")) {
    token = authheader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({ message: "please login" });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.json({ message: "please login" });
  }
};


module.exports = validatetoken;
// kdhoihfihg

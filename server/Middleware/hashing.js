const bcrypt = require("bcrypt");

const saltRounds = 10;

const hashpassword = async (plainPassword) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plainPassword, salt);
    return hash; // Return the complete hash
  } catch (error) {
    throw new Error("Password hashing failed");
  }
};

const hashValidater = async (plainpassword, hashpassword) => {
  try {
    const result = await bcrypt.compare(plainpassword, hashpassword);
    return result;
  } catch (error) {
    throw new Error("Password validation failed");
  }
};

module.exports = { hashpassword, hashValidater };

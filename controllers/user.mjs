import User from "../models/user.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

async function create(req, res) {
  try {
    const createdUser = await User.create(req.body);
    // create a JWT token
    // the token will be a string
    // const token = createJWT(createdUser);
    res.status(200).json(createdUser);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    // query the database to find a user with the email provided
    const user = await User.findOne({ email: req.body.email });
    // if the email does not exist, throw an error
    if (!user) throw new Error("User not found");
    // if we find the user, compare the password, but it is stored encrypted
    // 1st argument is from the credentials that the user typed in
    // 2nd argument is what is stored in the database
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error("Invalid password");
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}
// ===================Helper Function============
function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}
export default { create, createJWT, login };

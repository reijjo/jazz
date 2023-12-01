import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  passwd: String,
  verifycode: String,
});

userSchema.set("toJSON", {
  transform: (_document, returnedUser) => {
    returnedUser.id = returnedUser._id.toString();
    delete returnedUser._id;
    delete returnedUser.__v;
  },
});

const UserModel = mongoose.model("User", userSchema);

export { UserModel };

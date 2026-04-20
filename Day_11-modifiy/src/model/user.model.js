import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username required compulsory"],
  },
  email: {
    type: String,
    required: [true, "email required compulsory"],
    unique: [true, "unique emails"],
  },
  password: {
    type: String,
    required: [true, "email required compulsory"],
    select: false,
  },
});

const usermodel = mongoose.model("user",userSchema);

export default usermodel;

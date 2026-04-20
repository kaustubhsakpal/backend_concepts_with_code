import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select:false
    },
    verify:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return ;

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparepasssword = function (candidatepassword) {
  return bcrypt.compare(candidatepassword, this.password);
};

export const usermodel = mongoose.model("user", userSchema);

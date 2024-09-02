const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const emailRegex =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: [true, "Email is required"],
      validate: {
        validator: (v) => emailRegex.test(v),
        message: (p) => p.value + " is not a valid email",
      },
    },

    password: { type: String, required: [true, "Password is required"] },
    walletBalance: {
      type: Number,
      default: 0.0,
    },
    tickets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Ticket",
      },
    ],
  },
  { timestamps: true }
);

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = model("User", userSchema);
module.exports = User;

const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "name is required"]
    },
    lastName: {
      type: String,
      trim: true
    },
    phoneNumber: {
        type: String,
        trim: true,
        required: [true, "phone is required"],
        validate: {
            validator: function (v) {
              return v.length === 10 && /\d+/.test(v);
            },
            message: (props) =>
              `phone must be 10 digit long`
          }
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "email is required"],
      validate: {
        validator: function (v) {
          return /[a-z][0-9]*@gmail.com/.test(v);
        },
        message: (props) => `${props.value} is not a valid email`
      }
    },

    password: {
      type: String,
      trim: true,
      require: [true, "password field is required"],
      validate: {
        validator: function (v) {
          return v.length > 6 && /\d+/.test(v);
        },
        message: (props) =>
          `password must be 6 characters long and must contain a number`
      }
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

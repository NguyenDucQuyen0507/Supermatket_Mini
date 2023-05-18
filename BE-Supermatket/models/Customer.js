const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Mongoose Datatypes:
// https://mongoosejs.com/docs/schematypes.html
const customerSchema = new Schema({
  firstName: { type: String, required: [true, "First name is not valid"] },
  lastName: { type: String, required: [true, "Last name is require"] },
  avatar: String,
  phoneNumber: {
    type: String,
    validate: {
      validator: function (value) {
        const phoneNumberRegex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
        return phoneNumberRegex.test(value);
      },
      message: `{VALUE} is not a valid phone number Vietnamese`,
    },
  },
  address: { type: String },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(value);
      },
      message: `{VALUE} is not a valid email`,
      // message: (props) => `{props.value} is not a valid email!`,
    },
  },
  password: { type: String },
  birthDay: {
    type: Date,
    validate: {
      validator: function (value) {
        if (!value) return true;
        if (value >= Date.now()) return false;
        return true;
      },
      message: "valid date in the format yyyy/mm/dd",
    },
  },
  active: { type: Boolean, default: true },
  roles: { type: [], default: ["customer"] },
});

// Virtuals
customerSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

customerSchema.set("toJSON", { virtuals: true });
customerSchema.set("toObject", { virtuals: true });

const Customer = model("Customer", customerSchema);

module.exports = Customer;

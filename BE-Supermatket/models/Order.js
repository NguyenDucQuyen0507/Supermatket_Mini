const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const moment = require("moment");
// Mongoose Datatypes:
// https://mongoosejs.com/docs/schematypes.html

// ========================Begin OrderDetail================================

const orderDetailSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, require: true, min: 0 },
});
// Virtual with Populate
orderDetailSchema.virtual("product", {
  ref: "Product",
  localField: "productId",
  foreignField: "_id",
  justOne: true,
});

orderDetailSchema.set("toJSON", { virtuals: true });
orderDetailSchema.set("toObject", { virtuals: true });

const orderSchema = new Schema({
  createdDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  shippedDate: {
    type: Date,
    validate: {
      validator: function (value) {
        if (!value) return true;
        if (value < this.createdDate) {
          return false;
        }
        return true;
      },
      message: `Shipped date: {VALUE} is invalid!`,
    },
  },
  status: {
    type: String,
    required: [true, "Status is require"],
    default: "WAITING CONFIRMATION ORDER",
    validate: {
      validator: (value) => {
        if (
          [
            "WAITING CONFIRMATION ORDER",
            "CONFIRMED ORDER",
            "SHIPPING CONFIRMATION",
            "DELIVERY IN PROGRESS",
            "DELIVERY SUCCESS",
            "RECEIVED ORDER",
            "CANCELED ORDER",
          ].includes(value)
        )
          return true;
        else {
          return false;
        }
      },
      message: `Status: {VALUE} is invalid!`,
    },
  },
  description: String,

  shippingAddress: {
    type: String,
    required: true,
  },
  imageConfirm: {
    type: String,
  },
  paymentType: {
    type: String,
    required: [true, "Hình thức thanh toán bắt buộc phải nhập"],
    default: "CASH",
    validate: {
      validator: (value) => {
        if (["CASH", "MOMO"].includes(value.toUpperCase())) {
          return true;
        }
        return false;
      },
      message: `Hình thức thanh toán: {VALUE} không hợp lệ!`,
    },
  },

  customerId: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: false,
  },

  // tên
  fullName: {
    type: String,
    required: false,
  },

  // số điện thoại
  phoneNumber: {
    type: String,
    required: false,
  },

  employeeId: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    required: false,
  },
  orderDetails: [orderDetailSchema],
});
orderSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.createdDate = ret.createdDate.toISOString().slice(0, 10);
    return ret;
  },
});
// Virtual with Populate
orderSchema.virtual("customer", {
  ref: "Customer",
  localField: "customerId",
  foreignField: "_id",
  justOne: true,
});

orderSchema.virtual("employee", {
  ref: "Employee",
  localField: "employeeId",
  foreignField: "_id",
  justOne: true,
});

orderSchema.set("toJSON", { virtuals: true });
orderSchema.set("toObject", { virtuals: true });

// ========================End Order================================

const Order = model("Order", orderSchema);

module.exports = Order;

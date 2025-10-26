import mongoose from "mongoose";

const bikeSchema = new mongoose.Schema({
  company: {
    type: String,
  },
  model: {
    type: String,
  },
  price: {
    type: Number,
  },
  age: {
    type: Number,
  },
  ownershipProof: {
    type: String,
  },
  status: {
    type: String,
    enum: [
      "not provided for rent",
      "provided for rent",
      "in cart",
      "rented", // Make sure this is included
      "picked up",
      "cancelled",
      "returned",
    ],
    default: "not provided for rent",
  },
  Owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  Renter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  img: {
    type: String,
  },
  // Rename to match your createBooking function
  rentPerHour: {
    type: Number,
  },
  // Keep rentAmount for backward compatibility if needed
  rentAmount: {
    type: Number,
  },
  availableTimeFrom: {
    type: Date,
  },
  availableTimeTill: {
    type: Date,
  },
  availableDateFrom: {
    type: Date,
  },
  availableDateTill: {
    type: Date,
  },
  location: {
    type: String,
  },
  ratings: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      bookingId: {
        type: String, // This matches your booking's custom bookingId field
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      review: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Bike = mongoose.model("Bike", bikeSchema);
export default Bike;


// import mongoose from "mongoose";

// const bikeSchema = new mongoose.Schema({
//   company: {
//     type: String,
//   },
//   model: {
//     type: String,
//   },
//   price: {
//     type: Number,
//   },
//   age: {
//     type: Number,
//   },
//   ownershipProof: {
//     type: String,
//   },
//   status: {
//     type: String,
//     enum: [
//       "not provided for rent",
//       "provided for rent",
//       "in cart",
//       "rented",
//       "picked up",
//       "cancelled",
//       "returned",
//     ],
//     default: "not provided for rent",
//   },

//   Owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
//   Renter: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
//   img: {
//     type: String,
//   },
//   rentAmount: {
//     type: Number,
//   },
//   availableTimeFrom: {
//     type: Date,
//   },
//   availableTimeTill: {
//     type: Date,
//   },
//   availableDateFrom: {
//     type: Date,
//   },
//   availableDateTill: {
//     type: Date,
//   },
//   location: {
//     type: String,
//   },
//   ratings: [
//     {
//       user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//       },
//       rating: {
//         type: Number,
//         required: true,
//         min: 1,
//         max: 5,
//       },
//       review: {
//         type: String,
//         required: true,
//       },
//       timestamp: {
//         type: Date,
//         default: Date.now,
//       },
//     },
//   ],
// });

// const Bike = mongoose.model("Bike", bikeSchema);
// export default Bike;

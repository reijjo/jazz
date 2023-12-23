import mongoose from "mongoose";

const pointsSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      default: "Testiukko",
    },
    points: Number,
  },
  {
    timestamps: true,
  }
);

pointsSchema.set("toJSON", {
  transform: (_document, returnedPoints) => {
    returnedPoints.id = returnedPoints._id.toString();
    delete returnedPoints._id;
    delete returnedPoints.__v;
  },
});

const PointsModel = mongoose.model("Points", pointsSchema);

export { PointsModel };

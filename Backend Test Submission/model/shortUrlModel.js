import mongoose from "mongoose";

const shortURLSchema = new mongoose.Schema({
  url: {
     type: String, 
     required: true 
    },
  shortcode: { 
    type: String,
    unique: true,
    required: true 
  },
  expiry: { 
    type: Date,
    required: true
   },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export const ShortURL = mongoose.model("ShortURL", shortURLSchema);

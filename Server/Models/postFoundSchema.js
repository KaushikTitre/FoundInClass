import mongoose from "mongoose";

const PostFoundSchema = new mongoose.Schema({
    fItemName: { type: String, required: true },
    fCategory: { type: String, required: true },
    fDescription: { type: String, required: true },
    fverificationHint: { type: String , required:true},
    fDateFound: { type: Date, required: true },
    fApproxTime: { type: String, required: true }, // better as string if only time
    fLocation: {type: String , required : true},  
    fImage: { type: String, required: true }, 
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['open','matched','verified','Location_Released','GetPayment','handover'], default: 'open' },
    type: {type:String , default:'found'},
  });
  
 const PostFound = mongoose.model("PostFound", PostFoundSchema);
 export default PostFound;
import mongoose from "mongoose";

const PostLostSchema = new mongoose.Schema({
    lItemName: { type: String, required: true },
    lCategory: { type: String, required: true },
    lDescription: { type: String, required: true },
    lverificationHint: { type: String ,required:true }, 
    lDateLost: { type: Date, required: true },
    lApproxTime: { type: String, required: true }, // better as string if only time
    lLocation: {type: String , required : true}, 
    lImage: { type: String, required: false },     
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['open','matched','resolved'], default: 'open' },
  });
  
const PostLost = mongoose.model("PostLost", PostLostSchema);
export default PostLost;
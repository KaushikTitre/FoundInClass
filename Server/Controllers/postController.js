import PostLost from "../Models/postLostSchema.js";
import PostFound from "../Models/postFoundSchema.js";


export const LostIteam = async (req, res) => {
  try {
    const { lItemName, lCategory, lDescription,lverificationHint, lDateLost, lApproxTime, lLocation, lImage } = req.body;

    // create a new lost item
    const lostItem = new PostLost({
      lItemName,
      lCategory,
      lDescription,
      lverificationHint,
      lDateLost,
      lApproxTime,
      lLocation,
      lImage,
      postedBy: req.user._id,
    });

    // save to MongoDB
    await lostItem.save();
  
    res.status(201).json({ message: "Lost item saved successfully", data: lostItem });
  } catch (err) {
    console.error("Error saving lost item:", err);
    res.status(500).json({ error: "Failed to save lost item" });
  }
};

export const FoundIteam = async (req , res) =>{
  try {
    console.log("FoundIteam - req.user:", req.user); // << add this for debugging

    const { fItemName , fCategory , fDescription, fverificationHint, fDateFound, fApproxTime, fLocation, fImage} = req.body;
    const postedBy= req.user._id;

    if (!postedBy) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // create a new Found item
    const FoundIteam = new PostFound({
      fItemName,
      fCategory,
      fDescription,
      fverificationHint,
      fDateFound,
      fApproxTime,
      fLocation,
      fImage,
      postedBy,
    });

    // save to MongoDB
    await FoundIteam.save();

    res.status(201).json({ message: "Found item saved successfully", data: FoundIteam});

  } catch (error) {
    console.error("Error saving found item:", error);
    res.status(500).json({ error: "Failed to save found item" });
  }
};

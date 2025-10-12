import PostFound from "../Models/postFoundSchema.js";
import PostLost from "../Models/postLostSchema.js";

export const getData = async (req , res) =>{
    try {
        const foundData = await PostFound.find({
            postedBy: req.user._id
        }) 
       
        const lostdata =  await PostLost.find({
            postedBy: req.user._id
        })
        
        const Data = [...foundData, ...lostdata];
        res.status(200).json({
            message: "Data fetched successfully",
            data: Data
          });

    } catch (error) {
       console.error("Error fetching data to dashboard:", error);
        res.status(500).json({ error: "Error fetching data to dashboard" });
    }
             
};

export const fetchAllData = async (req, res) => {
    try {
      const foundItems = await PostFound.find();
      const lostItems = await PostLost.find();
      const allItems = [...foundItems, ...lostItems];

      const matchedItems = allItems.filter(item => item.status === "matched");

      const matchedCount = matchedItems.length;
  
      res.status(200).json({
        message: "All posts fetched successfully",
        foundLength: foundItems.length,
        lostLength: lostItems.length,
        matchLength:matchedCount
      });
    } catch (error) {
      console.error("Error fetching all posts:", error);
      res.status(500).json({ error: "Error fetching all posts" });
    }
  };
  

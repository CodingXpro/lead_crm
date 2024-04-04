import Keyword from "../../models/masterModel/keyWordModel.js";

//CREATE THE NEW INDUSTRY

export const keywordCreate = async (req, res, next) => {
  try {
    const { name } = req.body;

    const existingKeyword = await Keyword.findOne({ where: { name} });
    if (existingKeyword) {
      return res.status(400).json({ message: 'Keyword already exists' });
    }
   
        const newKeyword =  await Keyword.create({
            name
        });
        res.status(201).json({ message: 'Keyword created successfully', keyword: newKeyword });;
    
  } catch (error) {
    next(error);
  }
};



// UPDATE THE INDUSTRY

export const updateKeyword = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
  
      const keyword = await Keyword.findByPk(id);
      if (!keyword) {
        return res.status(404).json({ message: 'Keyword not found' });
      }
  
      // Update the user's fields
      if (name) {
        Keyword.name = name;
      }
      // Save the updated user
      await keyword.save();
  
      res.status(200).json({ message: 'Keyword updated successfully', keyword });
    } catch (err) {
      next(err);
    }
  };
  
  // DELETE THE KEYWORD
  
  export const deleteKeyword = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const keyword = await Keyword.findByPk(id);
      if (!keyword) {
        return res.status(404).json({ message: 'Keyword not found' });
      }
  
      // Delete the user
      await keyword.destroy();
  
      res.status(200).json({ message: 'Keyword has been deleted.' });
    } catch (err) {
      next(err);
    }
  };
  
  //Get all Keyword

  export const getallKeyword=async(req,res)=>{
    try {
      // Fetch all leads
      const keywords = await Keyword.findAll();
      
      // If there are no leads, return 404
      if (keywords.length === 0) {
        return res.status(404).json({ message: 'No keyword found' });
      }
      
      // If leads are found, return them
      res.status(200).json({ keywords });
    } catch (err) {
      next(err);
    }
  }





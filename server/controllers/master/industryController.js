import Industry from '../../models/masterModel/industryModel.js';

export const industryCreate = async (req, res, next) => {
  try {
    const { name } = req.body;

    const existingIndustry = await Industry.findOne({ where: { name } });
    if (existingIndustry) {
      return res.status(400).json({ message: 'Industry already exists' });
    }

    const newIndustry = await Industry.create({ name });
    res.status(201).json({ message: 'Industry created successfully', industry: newIndustry });
  } catch (error) {
    next(error);
  }
};




// UPDATE THE INDUSTRY

export const updateIndustry = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
  
      const industry = await Industry.findByPk(id);
      if (!industry) {
        return res.status(404).json({ message: 'Industry not found' });
      }
  
      // Update the user's fields
      if (name) {
        Industry.name = name;
      }
      // Save the updated user
      await industry.save();
  
      res.status(200).json({ message: 'Industry updated successfully', industry });
    } catch (err) {
      next(err);
    }
  };
  
  // DELETE THE INDUSTRY
  
  export const deleteIndustry = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const industry = await Industry.findByPk(id);
      if (!industry) {
        return res.status(404).json({ message: 'Industry not found' });
      }
  
      // Delete the user
      await industry.destroy();
  
      res.status(200).json({ message: 'Industry has been deleted.' });
    } catch (err) {
      next(err);
    }
  };

  //Get all Keyword

  export const getallIndustry=async(req,res)=>{
    try {
      // Fetch all leads
      const industry = await Industry.findAll();
      
      // If there are no leads, return 404
      if (industry.length === 0) {
        return res.status(404).json({ message: 'No industry found' });
      }
      
      // If leads are found, return them
      res.status(200).json({ industry });
    } catch (err) {
      next(err);
    }
  }
  
  





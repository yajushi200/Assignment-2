let ProductModel = require('../models/product.model');

module.exports.save = async (req, res) => {
    const product = new ProductModel(req.body);
    let result = await product.save();
    res.json(result)
}


// Find a single Result with an id
module.exports.findOne = async (req, res) => {
    try {

        const result = await ProductModel.findById(req.params._id);
        res.status(200).json(result);
}
 catch(error) {
        res.status(404).json({ message: error.message});
    }
};


//({name: '/che/'})

// Update a product by the id in the request
// module.exports.update = async (req, res) => {
//     if(!req.body) {
//         res.status(400).send({
//             message: "Data to update can not be empty!"
//         });
//     }

//         const id = req.params._id;

//         await ProductModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
//         if (!data) {
//             res.status(404).send({
//                 message: `Product not found.`
//             });
//         }else{
//             res.send({ message: "Product updated successfully." })
//         }
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message
//         });
//     });
// };

// Define a route to update a specific document by ID
module.exports.update = async (req, res) => {
    try {
      const id = req.params._id; // Get the ID from the URL parameter
      const updateData = req.body; // Data to update, sent in the request body
  
    //   const updatedDocument = await ProductModel.findByIdAndUpdate(id, updateData, { new: true, runValidators:true });
      const updatedDocument = await ProductModel.findOneAndUpdate({ _id: id }, updateData, { new: true, runValidators:true, overwrite: true });
  
      if (!updatedDocument) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      res.json(updatedDocument);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  };

// Retrieve all products from the database.
module.exports.findAll = async (req, res) => {
    try {
        
        const searchName = req.query.name;
  
      if (searchName) {
  
      const regex = new RegExp(searchName, "i"); // "i" for case-insensitive search
  
      const query = { name: { $regex: regex } };
  
      const products = await ProductModel.find(query);
  
      res.json(products);
      }else{
        const result = await ProductModel.find();
        res.status(200).json(result);
      }
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

// Delete a Product with the specified id in the request
module.exports.destroy = async (req, res) => {
    await ProductModel.findByIdAndRemove(req.params._id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `Product not found.`
          });
        } else {
          res.send({
            message: "Product deleted successfully!"
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
};

// Define a route to delete all data
module.exports.delete =  async (req, res) => {
    try {
      const result = await ProductModel.deleteMany();
      res.json({ message: 'All documents deleted', deletedCount: result.deletedCount });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  };
  

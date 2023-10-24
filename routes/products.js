var express = require('express');
var router = express.Router();
var productController = require('../controllers/product.controller')

/* GET Product listing. */
router
  .get('/', productController.findAll)
  .post('/', productController.save)
  .delete('/', productController.delete);

router.put('/:_id', productController.update);

router.get('/:_id', productController.findOne);

router.delete('/:_id', productController.destroy);



module.exports = router;

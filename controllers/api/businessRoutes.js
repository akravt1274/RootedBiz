const router = require('express').Router();
const { DATE } = require('sequelize');
const { Business, User, Category } = require('../../models');
const withAuth = require('../../utils/auth');
const helpers = require('../../utils/helpers');

router.post('/', withAuth, async (req, res) => {
  try {
    const { category, name, description, address } = req.body;  
    const categoryData = await Category.findOne(
      {
        where: { name: category },       
      });
    const newBusiness = await Business.create({        
        name,        
        description,
        address,
        date_created: new Date(),
        user_id: req.session.user_id,
        category_id: categoryData.id,
      });
    res.status(200).json(newBusiness);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    console.log('req.params.id',req.params.id);
    const businessData = await Business.findByPk(req.params.id);
    const business = businessData.get({ plain: true });    
    res.render('business', {
      business,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const businessData = await Business.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!businessData) {
      res.status(404).json({ message: 'No Business found with this id!' });
      return;
    }
    res.status(200).json(businessData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

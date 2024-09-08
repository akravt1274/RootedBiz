const router = require('express').Router();
const { Business, User, Category } = require('../models');
const withAuth = require('../utils/auth');

// Homepage
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll();
    // Serialize data so the template can read it
    const categories = categoryData.map((category) => category.get({ plain: true }));
    res.render('homepage', { 
      categories, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// List businesses by category
router.get('/category/:id', async (req, res) => {
  try {   
    const businessByCategory = await Business.findAll(
      {
        where: { category_id: req.params.id }
      });
    const businesses = businessByCategory.map((business) => business.get({ plain: true }));
    res.render('category', {
      businesses,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID including business for this user 
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Business }],
    });
    const user = userData.get({ plain: true });
    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

module.exports = router;

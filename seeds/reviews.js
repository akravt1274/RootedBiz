const { Review } = require('../models');

const reviewData = [
  {
    user_id: 1,
    business_id: 1,
    rating: 5,
    review_text: 'Great coffee and cozy atmosphere!',
  },
  {
    user_id: 2,
    business_id: 2,
    rating: 4,
    review_text: 'A wonderful selection of books and friendly staff.',
  },
  {
    user_id: 1,
    business_id: 3,
    rating: 3,
    review_text: 'Good selection of plants, but a bit pricey.',
  },
];

const seedReviews = () => Review.bulkCreate(reviewData);

module.exports = seedReviews;

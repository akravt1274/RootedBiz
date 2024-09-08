const User = require('./User');
const Business = require('./Business');
const Category = require('./Category');
// const Review = require('./Review');

User.hasMany(Business);
Business.belongsTo(User);

Category.hasMany(Business);
Business.belongsTo(Category);

module.exports = { User, Business, Category };

// module.exports = { User, Project, Category, Review};

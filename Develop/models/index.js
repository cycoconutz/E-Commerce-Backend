// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});
// Categories have many Products
Categories.hasMany(Product, {
  foreignKey: 'product_id',
});
// Products belongToMany Tags (through ProductTag)
Products.belongToMany(Tags, { through: { model: ProductTag } });
// Tags belongToMany Products (through ProductTag)
Tags.belongToMany(Products, { through: { model: ProductTag } });

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};

// Import required modules
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://user:password@localhost:3306/database');

// Define the BlogPost model
const BlogPost = sequelize.define('BlogPost', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

// Define associations
BlogPost.associate = function(models) {
  // A blog post belongs to a user
  BlogPost.belongsTo(models.User, {
    foreignKey: {
      allowNull: false
    }
  });

  // A blog post has many comments
  BlogPost.hasMany(models.Comment);
};

// Sync the model with the database
BlogPost.sync();

// Export the BlogPost model
module.exports = BlogPost;

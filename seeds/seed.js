const { Post, User, Comment } = require('../db/models');
const sequelize = require('../db/connection');
const postSeeds = require('./posts.json');
const userSeeds = require('./users.json');
const commentSeeds = require('./comments.json');


const seedDb = async () => {
    await sequelize.sync({ force: true });
    await User.bulkCreate(userSeeds);
    await Post.bulkCreate(postSeeds);
    await Comment.bulkCreate(commentSeeds);
    process.exit(0);
}

seedDb();
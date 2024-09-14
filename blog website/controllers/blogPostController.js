const BlogPost = require('../models/blogPost');

exports.createBlogPost = (req, res) => {
  const { title, content, authorId } = req.body;
  const blogPost = new BlogPost({ title, content, authorId });

  blogPost.save((err, newBlogPost) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json(newBlogPost);
    }
  });
};

exports.getAllBlogPosts = (req, res) => {
  BlogPost.find((err, blogPosts) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(blogPosts);
    }
  });
};

exports.getBlogPostById = (req, res) => {
  BlogPost.findById(req.params.blogPostId, (err, blogPost) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (blogPost) {
        res.json(blogPost);
      } else {
        res.status(404).send('Blog post not found');
      }
    }
  });
};

exports.updateBlogPost = (req, res) => {
  const { title, content } = req.body;

  BlogPost.findByIdAndUpdate(
    req.params.blogPostId,
    { title, content },
    { new: true },
    (err, updatedBlogPost) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (updatedBlogPost) {
          res.json(updatedBlogPost);
        } else {
          res.status(404).send('Blog post not found');
        }
      }
    }
  );
};

exports.deleteBlogPost = (req, res) => {
  BlogPost.findByIdAndDelete(req.params.blogPostId, err => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(204);
    }
  });
};

const Comment = require('../models/comment');

// GET /api/comments
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// POST /api/comments
exports.createComment = async (req, res) => {
  const { postId, userId, content } = req.body;
  try {
    const comment = await Comment.create({
      postId,
      userId,
      content,
    });
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// PUT /api/comments/:id
exports.updateComment = async (req, res) => {
  const id = req.params.id;
  const { content } = req.body;
  try {
    const comment = await Comment.findOne({ where: { id } });
    if (!comment) {
      return res.status(404).send('Comment not found');
    }
    comment.content = content;
    await comment.save();
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// DELETE /api/comments/:id
exports.deleteComment = async (req, res) => {
  const id = req.params.id;
  try {
    const comment = await Comment.findOne({ where: { id } });
    if (!comment) {
      return res.status(404).send('Comment not found');
    }
    await comment.destroy();
    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

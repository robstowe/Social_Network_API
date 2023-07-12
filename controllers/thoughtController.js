const Thought = require('../models/Thoughts');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.status(200).json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');
            if (!thought) {
                return res.status(404).json({ message: 'No comment found with that ID' });
            }
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const comment = await Comment.create(req.body);
            const post = await Post.findoneAndUpdate(
                { _id: req.body.postId },
                { $push: { comments: comment._id } },
                { new: true }
            );
            if (!post) {
                return res
                    .status(404)
                    .json({ message: 'comment created, but no posts with this ID' });
            }

            res.json({ message: 'comment created' });
        } catch (err) {
            console.error(err);
        }
    },
};



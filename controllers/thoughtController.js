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
            const comment = await Thought.create(                
                { _id: req.params.thoughtId },
                { $push: { comments: comment._id } },
                { new: true });
            if (!comment) {
                return res
                    .status(404)
                    .json({ message: 'comment created, but no posts with this ID' });
            }

            res.json({ message: 'comment created' });
        } catch (err) {
            console.error(err);
        }
    },

    async updateThought(req, res) {
        try {
            const comment = await Thought.findOneAndUpdate( {_id: req.params.thoughtId }, 
            {$set: req.body});
            res.status(200).json(comment)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
          const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
          res.status(200).json(thought)
        } catch (err) {
          res.status(500).json(err);
        }
      }
};



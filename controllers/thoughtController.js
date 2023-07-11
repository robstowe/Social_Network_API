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
    async createThought(){
    }
         //add code in for this
};
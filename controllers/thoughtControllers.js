const { Thoughts, User } = require("../models")

module.exports = {
    // get all thoughts
    async getThoughts(req, res) {
        try {
            Thoughts.find()
                .then((thought) => {
                    res.json(thought)
                })
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async getSingleThought(req, res) {
        try {
            Thoughts.findOne({ _id: req.params.thoughtId })
                .select('-__v')
                .then((Thought) => {
                    if (!Thought) {
                        res.status(400).json({ message: 'there is no thought with that id' })

                        return;
                    }

                    res.json(Thought)
                })
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // create thought
    async createThought(req, res) {
        try {


            Thoughts.create(req.body)
                .then((thought) => {
                    const user = User.findOneAndUpdate(
                        { _id: req.params.userId },
                        { $push: { thoughts: thought._id } },
                        { new: true }
                    )

                    if (!user) {
                        res.status(400).json({ message: "there is no user with this id" })

                        return;
                    }

                    res.status(200).json(Thought)
                })
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async updateThought(req, res) {
        try {
            Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            )
                .then((thought) => {
                    if (!Thought) {
                        res.status(400).json({ message: "there is not a thought with that id" })

                        return;
                    }
                    res.status(200).json(thought)
                })
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // delete thought
    async deleteThought(req, res) {
        try {
            Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
                .then((thought) => {
                    if (!thought) {
                        res.status(400).json({ message: "there is no thought with this id" })

                        return;
                    }
                })
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // creates reaction 
    async createReaction(req, res) {
        try {
            Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { new: true }
            )
                .then((thought) =>
                    !thought
                        ? res.status(404).json({ message: 'no thought with this id' })
                        : res.status(200).json(thought)
                )
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async deleteReaction(req, res) {
        try {
            Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { _id: req.body.reactionId } } },
                { new: true }
            )
                .then((thought) =>
                    !thought
                        ? res.status(404).json({ message: 'no thought with this id' })
                        : res.status(200).json(thought)
                )
        } catch (err) {
            res.status(500).json(err)
        }
    }
}
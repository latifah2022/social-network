const { Schema, model } = require('mongoose');
const reaction = require('./Reaction');

// shema to create thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxLength: 280,
            minLength: 1
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => timeSince(date)
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reaction]
    },
    {
        toJson: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
);
// retrives the length of reactions
thoughtSchema
    .virtual('reactionsCount')
    .get(function () {
        return `${this.reactions.length}`
    });

//  initialize thought model
const Thoughts = model('Thoughts', thoughtSchema);

module.exports = Thoughts;
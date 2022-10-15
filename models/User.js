const { Schema, model } = require('mongoose');
const validateEmail = function (email) {
    let regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return regex.test(email)
};

// schema to create user model 
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validateEmail, "Enter a valid email."]
        },
        // thoughts _id value refereses the thought model
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts'
            }],
        // friends _id value refereses the User model
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }]
    },
    {
        toJson: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
);

// retrives the length of the user's friends array.
userSchema
    .virtual('friendCount')
    .get(() => this.friends.length);

// initialize user model
const User = model('User', userSchema);

module.exports = User;
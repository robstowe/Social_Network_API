const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trimmed: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/, "Must be a valid email"],
  },
  thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'user' }],
}, {
  toJSON: {
    getters: true,
    virtuals: true,
  },
  id: false,
});

const User = model('user', userSchema);


module.exports = User;

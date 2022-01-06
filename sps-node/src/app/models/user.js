const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        lowercase: true
    },
    password: {
        type: String,
        select: false
    },
    repos: [{
        type: Object,
        required: true
    }]
});

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;
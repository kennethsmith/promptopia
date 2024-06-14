import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists.'],
        required: [true, 'Email is required.'],
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email format is invalid.']
    },
    username: {
        type: String,
        required: [true, 'Username is required.'],
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Username format is invalid.']
    },
    image: {
        type: String,
        required: [true, 'Image is required.']
    },
})

const User = models.User || model('User', UserSchema)
export default User
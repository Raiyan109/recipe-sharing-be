import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt'

const userSchema = new Schema<TUser, UserModel>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
    },
    address: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    membership: {
        type: String,
        required: true
    },
    followers: {
        type: [String],
        required: true
    },
}, { timestamps: true })
// , {
//     toJSON: {
//         transform: function (doc, ret) {
//             delete ret.password; // Remove password field when converting to JSON
//             return ret;
//         }
//     }
// }

userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this; // doc
    // hashing password and save into DB

    const saltRounds = 10
    user.password = await bcrypt.hash(
        user.password, saltRounds
    );

    next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
    // return await User.findOne({ email });
    return await User.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, UserModel>('User', userSchema)
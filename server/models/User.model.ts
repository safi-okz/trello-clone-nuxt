// import { select } from '@nuxt/ui';
import { Schema, model, Document } from 'mongoose';
import { generateHash } from '../utils/hash';
import bcrypt from "bcryptjs";

export interface userDocument extends Document {
        name: String,
        email: String,
        password: String,
        stripeCustomerId?: String,

        comparePassword: (password: string) => Promise<boolean>
};

const userSchema = new Schema({
    name: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        // required: true,
        select: false
    },
    stripeCustomerId:  {
        type: String,
        default: null
    },
    timestamps: {
        type: String
    }
});

userSchema.pre('save', async function(next) {
    if(this.isModified('password')) return next();
    this.password = await generateHash(this.password);
});

userSchema.methods.comparePassword = async function(password: string) {
        return await bcrypt.compare(password, this.password);
}

export const user = model<userDocument>('user', userSchema);
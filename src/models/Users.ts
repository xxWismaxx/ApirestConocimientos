import { Schema, model, Document } from 'mongoose'

const schema = new Schema({
    email: String,
    password: String,
    type: String
});

export interface Iusers extends Document {
    email: string;
    password: string;
    type: string;
}

export default model<Iusers>('Users', schema);
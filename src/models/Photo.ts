import { Schema, model, Document } from 'mongoose'

const schema = new Schema({
    title: String,
    description: String,
    nameoriginal: String,
    nivel: String,
    granularidad: String,
    topics: String,
    imagePath: String,
    dueñouser: String
});

export interface IConocimiento extends Document {
    title: string;
    description: string;
    nameoriginal: string;
    nivel: string;
    granularidad: string;
    topics: string;
    imagePath: string;
    dueñouser: string;
}

export default model<IConocimiento>('Conocimiento', schema);
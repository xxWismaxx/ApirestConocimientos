import { connect } from 'mongoose'

export async function startConnection() {
    const db = await connect('mongodb://localhost:27017/objetosaprendizaje',{
        useNewUrlParser: true,
        useFindAndModify: true 
    });
    console.log('Database is connected');
}

import mongoose from "mongoose";

const HeaderSchema = new mongoose.Schema({
    file: {
        type: String,
        default: 'noimage.jpg'
    },
    text1: {
        type: String,
        required: true
    },
    text2: String,
    button: {
        type: String,
        required: true
    }
});

const MainTextSchema = new mongoose.Schema({
    text1: {
        type: String,
        required: true
    },
    text2: String
});

const Header = mongoose.model('Header', HeaderSchema);
const MainText = mongoose.model('MainText', MainTextSchema);

export default {Header, MainText};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    title: String,
    description: String,
    nameoriginal: String,
    nivel: String,
    granularidad: String,
    topics: String,
    imagePath: String,
    dueñouser: String
});
exports.default = mongoose_1.model('Conocimiento', schema);

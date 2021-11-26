"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    email: String,
    password: String,
    type: String
});
exports.default = mongoose_1.model('Users', schema);

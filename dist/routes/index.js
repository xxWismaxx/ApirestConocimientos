"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const multer_1 = __importDefault(require("../libs/multer"));
const photo_controller_1 = require("../controllers/photo.controller");
router.route('/photos')
    .get(photo_controller_1.getConocimientos)
    .post(multer_1.default.single('image'), photo_controller_1.createConocimiento);
router.route('/photos/:id')
    .get(photo_controller_1.getConocimiento)
    .delete(photo_controller_1.deleteConocimiento)
    .put(photo_controller_1.updateConocimiento);
router.route('/photos/maestros/:id')
    .get(photo_controller_1.getconocimeintosmaestro);
router.post('/signup', async (req, res) => {
    const { email, password, type } = req.body;
    const newUser = new User({ email, password, type });
    await newUser.save();
    const token = jwt.sign({ _id: newUser._id }, 'secretkey');
    res.status(200).json({ token });
});
router.post('/signin', async (req, res) => {
    const { email, password, type } = req.body;
    const user = await User.findOne({ email });
    if (!user)
        return res.status(401).send("El correo no existe");
    if (user.password !== password)
        return res.status(401).send("Contraseña incorrecta");
    const token = jwt.sign({ _id: user._id }, 'secretkey');
    return res.status(200).json({ token: token, tepeuser: user.type, iduser: user._id });
});
router.get('/users', async (req, res) => {
    const user = await User.find();
    return res.json(user);
});
router.post('/usersdelete/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndRemove(id);
    return res.json('detele');
});
router.put('/usersupdate/:id', async (req, res) => {
    const { id } = req.params;
    const { type } = req.body;
    console.log(type);
    await User.findByIdAndUpdate(id, {
        type
    });
    return res.json({
        message: 'Successfully updated',
    });
});
exports.default = router;

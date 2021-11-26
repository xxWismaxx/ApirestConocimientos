import { Router } from 'express'
const router = Router();
const User = require('../models/User');

const jwt = require('jsonwebtoken');
import upload from '../libs/multer'
import { getConocimientos, createConocimiento, deleteConocimiento, getConocimiento, updateConocimiento, getconocimeintosmaestro} from '../controllers/photo.controller'


router.route('/photos')
    .get(getConocimientos)
    .post(upload.single('image'), createConocimiento);

router.route('/photos/:id')
    .get(getConocimiento)
    .delete(deleteConocimiento)
    .put(updateConocimiento);

router.route('/photos/maestros/:id')
    .get(getconocimeintosmaestro)


router.post('/signup', async (req, res) => {
    const { email, password, type} = req.body;
    const newUser = new User({ email, password, type });
    await newUser.save();
    const token = jwt.sign({_id: newUser._id}, 'secretkey')
    res.status(200).json({token})
})

router.post('/signin', async (req, res) => {
    const { email, password, type } = req.body;
    const user = await User.findOne({ email })
    if (!user) return res.status(401).send("El correo no existe");
    if (user.password !== password) return res.status(401).send("Contraseña incorrecta");

    const token = jwt.sign({_id: user._id}, 'secretkey');
    return res.status(200).json({token: token, tepeuser: user.type, iduser: user._id});
})

router.get('/users', async (req, res) => {
    const user = await User.find()
    return res.json(user);
})

router.post('/usersdelete/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndRemove(id);
    return res.json('detele');
})

router.put('/usersupdate/:id', async (req, res) => {
    const { id } = req.params;
    const { type } = req.body;
    console.log(type)
    await User.findByIdAndUpdate(id, {
        type
    });
    return res.json({
        message: 'Successfully updated',
        
    });
})

export default router;
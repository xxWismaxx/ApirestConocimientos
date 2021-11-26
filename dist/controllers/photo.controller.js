"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
// Models
const Photo_1 = __importDefault(require("../models/Photo"));
async function getConocimientos(req, res) {
    const conocimiento = await Photo_1.default.find();
    return res.json(conocimiento);
}
exports.getConocimientos = getConocimientos;
;
async function createConocimiento(req, res) {
    const { title, description, nameoriginal, nivel, granularidad, topics, dueñouser } = req.body;
    const newconocimiento = { title, description, nameoriginal, nivel, granularidad, topics, dueñouser, imagePath: req.file.path };
    const conocimiento = new Photo_1.default(newconocimiento);
    await conocimiento.save();
    return res.json({
        message: 'Conocimiento Saved Successfully',
        conocimiento
    });
}
exports.createConocimiento = createConocimiento;
;
async function getconocimientomaestros(req, res) {
    const conocimiento = await Photo_1.default.find();
    return res.json(conocimiento);
}
exports.getconocimientomaestros = getconocimientomaestros;
;
async function getConocimiento(req, res) {
    const { id } = req.params;
    const conocimiento = await Photo_1.default.findById(id);
    return res.json(conocimiento);
}
exports.getConocimiento = getConocimiento;
async function getconocimeintosmaestro(req, res) {
    const { id } = req.params;
    const conocimiento = await Photo_1.default.find({
        dueñouser: id
    });
    return res.json(conocimiento);
}
exports.getconocimeintosmaestro = getconocimeintosmaestro;
async function deleteConocimiento(req, res) {
    const { id } = req.params;
    const conocimiento = await Photo_1.default.findByIdAndRemove(id);
    if (conocimiento) {
        await fs_extra_1.default.unlink(path_1.default.resolve(conocimiento.imagePath));
    }
    return res.json({ message: 'Conocimiento Deleted' });
}
exports.deleteConocimiento = deleteConocimiento;
;
async function updateConocimiento(req, res) {
    const { id } = req.params;
    const { title, description, nivel, granularidad, topics } = req.body;
    const updatedConocimiento = await Photo_1.default.findByIdAndUpdate(id, {
        title,
        description,
        nivel,
        granularidad,
        topics
    });
    return res.json({
        message: 'Successfully updated',
        updatedConocimiento
    });
}
exports.updateConocimiento = updateConocimiento;

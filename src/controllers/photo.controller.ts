import { Request, Response } from 'express'
import fs from 'fs-extra';
import path from 'path'

// Models
import Conocimiento, { IConocimiento } from '../models/Photo';

export async function getConocimientos(req: Request, res: Response): Promise<Response> {
    const conocimiento = await Conocimiento.find();
    return res.json(conocimiento);
};

export async function createConocimiento(req: Request, res: Response): Promise<Response> {
    const { title, description, nameoriginal, nivel, granularidad, topics, dueñouser } = req.body;
    const newconocimiento = { title, description, nameoriginal, nivel, granularidad, topics, dueñouser, imagePath: req.file.path};
    const conocimiento = new Conocimiento(newconocimiento);
    await conocimiento.save();
    return res.json({
        message: 'Conocimiento Saved Successfully',
        conocimiento
    });
};

export async function getconocimientomaestros(req: Request, res: Response): Promise<Response> {
    const conocimiento = await Conocimiento.find();
    return res.json(conocimiento);
};

export async function getConocimiento(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const conocimiento = await Conocimiento.findById(id);
    return res.json(conocimiento);
}

export async function getconocimeintosmaestro(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const conocimiento = await Conocimiento.find({
        dueñouser: id      
    });
    return res.json(conocimiento);
}

export async function deleteConocimiento(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const conocimiento = await Conocimiento.findByIdAndRemove(id) as IConocimiento;
    if (conocimiento) {
        await fs.unlink(path.resolve(conocimiento.imagePath));
    }
    return res.json({ message: 'Conocimiento Deleted' });
};

export async function updateConocimiento(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, description, nivel, granularidad, topics } = req.body;
    const updatedConocimiento = await Conocimiento.findByIdAndUpdate(id, {
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
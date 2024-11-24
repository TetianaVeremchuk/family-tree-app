import express, { Request, Response } from 'express';
import { MemberUpdateBody } from '../types/types';
import Member from '../models/Member';

const router = express.Router();


router.get('/', async (req: Request, res: Response) => {
  try {
    const members = await Member.findAll();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});


router.post('/', async (req: Request, res: Response) => {
  const { name, age, parentId } = req.body;

  try {
    const newMember = await Member.create({ name, age, parentId });
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create member' });
  }
});

router.put('/:id', async (req: Request<{ id: string }, {}, MemberUpdateBody>, res: Response) => {
  const { id } = req.params;
  const { name, age, parentId } = req.body;

  try {
    const member = await Member.findByPk(id);

    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    await member.update({ name, age, parentId });
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update member' });
  }
});

router.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  try {
    const member = await Member.findByPk(id);

    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    await member.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete member' });
  }
});

export default router;

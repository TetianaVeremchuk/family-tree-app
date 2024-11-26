import { Router } from 'express';
import Member from '../models/Member';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const members = await Member.findAll({
      where: { parentId: null },
      include: [
        {
          model: Member,
          as: 'children',
          include: [
            {
              model: Member,
              as: 'children',
            },
          ],
        },
      ],
    });

    res.status(200).json(members);
  } catch (error) {
    console.error('Error fetching family tree:', error);
    res.status(500).json({ message: 'Failed to fetch family tree' });
  }
});

export default router;
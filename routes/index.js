import { Router } from 'express';

const router = new Router();

router.get('/', (req, res) => {
  res.json({
    api: 'ping.taeho.tech',
    version: '0.0.1',
  });
});

export default router;

const express = require('express');
const router = express.Router();
const redis = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
    const value = await redis.getAsync("added_todos");
    res.json({
        added_todos: Number(value) || 0
    });
});

module.exports = router;

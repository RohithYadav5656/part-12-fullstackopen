const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  const added_amount = Number((await redis.getAsync("added_todos")) || 0);
  redis.setAsync("added_todos", added_amount + 1)
  
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.json(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const original = await Todo.findById(req.todo._id);
  const newText = req.body.hasOwnProperty("text") ? req.body.text : original.text
  const newDone = req.body.hasOwnProperty("done") ? req.body.done : original.done

  req.todo = await Todo.findByIdAndUpdate(req.todo._id, {
    text: newText,
    done: newDone
  }, { new: true })

  res.json(req.todo)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;

const bcrypt = require('bcrypt')
const { result } = require('lodash')
const usersRouter = require('express').Router()
const User = require(('../modles/users'))

usersRouter.post('/', async (req, res) => {
  const {userName, name, passwords} = req.query
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    userName,
    name,
    passwordHash
  })

  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

module.exports = usersRouter
import expressAsyncHandler from 'express-async-handler'
import Goal from '../models/goalModel.js'

const getGoals = expressAsyncHandler(async (req, res) => {
    const goals = await Goal.find()

    res.status(200).json(goals)
})

const createGoal = expressAsyncHandler(async (req, res) => {
    if (!req.body || !req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text
    })

    res.status(201).json({ message: 'Goal created' })
})

const updateGoal = expressAsyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' })
    res.status(200).json(updatedGoal)
})

const deleteGoal = expressAsyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    await goal.deleteOne()
    res.status(200).json({ id: req.params.id })
})

export { getGoals, createGoal, updateGoal, deleteGoal }
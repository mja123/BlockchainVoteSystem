import express from 'express'
import userRouter from './routes/user.route.js'
import voteRouter from './routes/vote.route.js'

const app = express()
const port = process.env.port || 3000

app.use(express.json())
app.use('/user', userRouter)
app.use('/vote', voteRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
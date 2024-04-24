const connectToMongo=require('./db')
const express = require('express')
const cors = require('cors'); // Import CORS middleware
const formDataRouter=require('./routes/formData')
const authUserRouter=require('./routes/authuser')
const userRoutes = require('./routes/userRoutes')


connectToMongo()

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

// Available routes
app.use('/api/auth',authUserRouter)
app.use('/api/formData', formDataRouter);
app.use('/api/user', userRoutes)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


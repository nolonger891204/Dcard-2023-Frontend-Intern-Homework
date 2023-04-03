import express from 'express'
import cors from 'cors'
import routes from './routes';

const app = express()

app.use(cors())

app.use('/', routes);

//defined serve
const port = process.env.PORT || 4000
app.listen(port, ()=>{
  console.log(`Server is up on port ${port}.`)
})
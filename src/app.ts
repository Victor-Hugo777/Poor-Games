import express from 'express'
import cors from 'cors'
import {gameRouter} from './routes/GameRouter';
import {userRouter} from './routes/UserRouter';

export const app = express()

app.use(express.json())
app.use(cors())


app.listen(3003, () => {
   console.log('Servidor rodando na porta 3003')
})

export default app;
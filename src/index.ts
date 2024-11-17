import "dotenv/config";
import { app } from "./app";
import { gameRouter } from "./routes/GameRouter";
import { userRouter } from "./routes/UserRouter";

app.use('/jogos', gameRouter)
app.use('/usuarios', userRouter)









  









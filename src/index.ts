import "dotenv/config";
import { app } from "./app";
import { gameRouter } from "./routes/GameRouter";
import { userRouter } from "./routes/UserRouter";
import { reviewRouter } from "./routes/ReviewRouter";

app.use('/jogos', gameRouter)
app.use('/usuarios', userRouter)
app.use('/avaliacoes',reviewRouter)









  









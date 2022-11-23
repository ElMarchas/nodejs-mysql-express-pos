import app from "./app.js"; //esta madre manda todo express al documento app.js una chulada
import { PORT } from "./config.js";

app.listen(PORT);
console.log("Server running on port:", +PORT);

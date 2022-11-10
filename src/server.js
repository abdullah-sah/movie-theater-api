const express = require("express");
const { body, validationResult } = require("express-validator");
const { db } = require("../db.js");
const userRouter = require("./routes/user");

const app = express();
const port = 3000;

app.use(express.json());
app.use("/users", userRouter);

app.get("/", (req, res) => {
	res.send("heyyyy");
});

app.listen(port, () => {
	console.log(
		`Never gonna give you up\nNever gonna let you down\nNever gonna turn around and desert you\nPort ${port}`
	);
});

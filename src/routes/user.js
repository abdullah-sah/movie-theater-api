const { Router } = require("express");
const { User, Show } = require("../../models");
const userRouter = Router();

// GETTING all users from db
userRouter.get("/", async (req, res) => {
	const users = await User.findAll();
	res.send(users);
});

// GETTING 1 user from db
userRouter.get("/:id", async (req, res) => {
	try {
		// grabbing number of users from model
		const usersCount = await User.count();

		// making sure id passed in is not greater than number of users and not less than 1
		if (req.params.id > usersCount || req.params.id < 1) {
			throw new Error("That user couldn't be found.");
		} else {
			// if checks pass, res.send the user
			const user = await User.findByPk(req.params.id);
			res.status(200).send(user);
		}
	} catch (error) {
		res.status(404).send(error.message);
	}
});

// GETTING all shows watched by user:
userRouter.get("/:id/:shows", async (req, res) => {
	const user = await User.findByPk(1);
	// looping over return value of getShows() and running .toJSON() on each value
	const shows = (await user.getShows()).map((s) => s.toJSON());
	res.send(shows);
});

// PUTTING new show in user if they've watched it
userRouter.put("/:id/shows/:showId", async (req, res) => {
	const user = await User.findByPk(req.params.id);
	const show = await Show.findByPk(req.params.showId);
	await user.setShows(show);
	const userShows = await user.getShows();
	res.send(userShows);
});

module.exports = userRouter;

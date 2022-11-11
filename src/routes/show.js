const { Router } = require("express");
const { User, Show } = require("../../models");
const showRouter = Router();

// GETTING all shows from db
showRouter.get("/", async (req, res) => {
	const shows = await Show.findAll();
	res.send(shows);
});

// GETTING one show from db
showRouter.get("/:showId", async (req, res) => {
	try {
		// grabbing number of shows from db
		const showsCount = await Show.count();

		// making sure showId passed in is not greater than showsCount and is not less than 0
		if (req.params.showId > showsCount || req.params.showId < 1) {
			throw new Error("That show couldn't be found");
		} else {
			const show = await Show.findByPk(req.params.showId);
			res.status(200).send(show);
		}
	} catch (error) {
		res.status(404).send(error.message);
	}
});

// GETTING shows of specific genre
showRouter.get("/genres/:genre", async (req, res) => {
	const showsInGenre = await Show.findAll({
		where: { genre: req.params.genre },
	});
	res.send(showsInGenre);
});

// PUTTING a rating on a specific show
showRouter.put("/:showId/:rating", async (req, res) => {
	const show = await Show.findByPk(req.params.showId);
	await Show.update(
		{ rating: req.params.rating },
		{ where: { id: req.params.showId } }
	);
	const updatedShow = await Show.findByPk(req.params.showId);
	res.send(
		`Updated ${show.title}'s rating from ${show.toJSON().rating} to ${
			updatedShow.toJSON().rating
		}`
	);
});

// PUTTING an update on the show status (canceled to on-going or vice versa)
showRouter.put("/:showId/updates/:showStatus", async (req, res) => {
	const show = await Show.findByPk(req.params.showId);
	await show.update({ status: req.params.showStatus });
	const updatedShow = await Show.findByPk(req.params.showId);
	console.log(updatedShow.toJSON());
	res.send(
		`Updated ${show.title}'s status from ${show.toJSON().status} to ${
			updatedShow.toJSON().status
		}`
	);
});

// DELETING a specific show
showRouter.delete("/:showId", async (req, res) => {
	const showToDelete = await Show.findByPk(req.params.showId);
	await showToDelete.destroy();
	res.send(`Deleted show: ${showToDelete.title}`);
});

module.exports = showRouter;

import express from "express";
const router = express.Router();
import entryController from "../controllers/brain.mjs";

// seed route
// !!!! to be taken out before deployment
router.get("/seed", entryController.seed);

// TODO: get individual entry
// TODO: get based on criteria
// index Router
// **** get    /braindump
// **** returns all entries
// NOTE: if the number of entries gets too large, this can bwe updated to limit the number returned
router.get("/", entryController.getEntries);

// Create route
// **** Post /api/braindump
// **** add the entry to the database and return the added entry
router.post("/", entryController.addEntry);

// Delete route
// **** Delete /api/braindump/:id
// **** Delete the entry from the database and return deleted entry
router.delete("/:id", entryController.deleteEntry);

// Edit route
// **** Edit /api/braindump/:id
// **** Edit the entry in the database and return updated entry
router.put("/:id", entryController.updateEntry);

export default router;

const express = require("express");
const { check } = require("express-validator");
const eventControllers = require("../controllers/event-controllers");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.use(checkAuth)



router.get("/", eventControllers.getEventById);
router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").not().isEmpty(),
    check("label").not().isEmpty(),
    check("day").not().isEmpty(),
  ],
  eventControllers.createEvent
);

router.patch("/:eid",  [
    check("title").not().isEmpty(),
    check("description").not().isEmpty(),
    check("label").not().isEmpty(),
    check("day").not().isEmpty(),
  ],eventControllers.updateEventById);

  
router.delete("/:eid", eventControllers.deleteEventById);

module.exports = router;

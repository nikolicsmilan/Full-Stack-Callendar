const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Event = require("../models/event");

getEventById = async (req, res, next) => {
  let event;
  try {
    event = await Event.find({});
  } catch (err) {
    const error = new HttpError(
      "Something went wrong could not find an event( MOngoDB searching problem)",
      500
    );
    return next(error);
  }

  if (!event) {
    const error = new HttpError(
      "Could not find an event , (not registered event)",
      404
    );
    return next(error);
  }
  res.json({ events: event.map((event) => event.toObject({ getters: true })) });
};

const createEvent = async (req, res, next) => {
  console.log(`Adatbázisba írás createEvent`);
  console.log(`req: ${JSON.stringify(req.body)}`);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("114 es sor");
    return next(new HttpError("Invalid inputs, please check your data", 422));
  }

  const { title, description, label, day, id } = req.body;
  const createdEvent = new Event({
    title,
    description,
    label,
    day,
    id,
  });

  try {
    await createdEvent.save();
  } catch (err) {
    const error = new HttpError("Creating Events failed please try again", 500);
    return next(error);
  }

  res.status(201).json({ event: createdEvent });
};

const updateEventById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs, please check your data update", 422)
    );
  }
  const { title, description, label, day } = req.body;
  const eventId = req.params.eid;

  let event;
  try {
    console.log(`Tryban`);
    event = await Event.findById(eventId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong could not update event during read database",
      500
    );
    return next(error);
  }

  event.title = title;
  event.description = description;
  event.label = label;
  event.day = day;
  try {
    await event.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong could not update event during write database",
      500
    );
    return next(error);
  }
  res.status(200).json({ event: event.toObject({ getters: true }) });
};

const deleteEventById = async (req, res, next) => {
  const eventId = req.params.eid;
  let event;
  try {
    event = await Event.findById(eventId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong could not delete event",
      500
    );
    return next(error);
  }
  try {
    await event.remove();
  } catch (err) {}
  res.status(200).json({ message: "Deleted place." });
};

exports.getEventById = getEventById;
exports.createEvent = createEvent;
exports.updateEventById = updateEventById;
exports.deleteEventById = deleteEventById;

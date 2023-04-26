const { Router } = require("express");

const router = Router({ mergeParams: true });

const CalendarDAO = require('../daos/calendars');
const EventDAO = require('../daos/events');


// GET ALL
router.get("/", async (req, res, next) => {
    try {
        //check for calandar
        const calendar = await CalendarDAO.getById(req.params.calendarId)
        if (!calendar) {
            return res.sendStatus(404);
        }
        //should return all events of calandar
        const events = await EventDAO.getAll(req.params.calendarId);
        res.json(events);
    } catch(e) {
        next(e);
    }
});

// GET BY ID
router.get("/:id", async (req, res, next) => {
    try {
      const event = await EventDAO.getById(req.params.id);
      //check for event
      if (!event) {
        res.sendStatus(404);
        // check if calendar id match %# event
      } else if (event.calendarId.toString() != req.params.calendarId) {
        res.sendStatus(404);
      } else {
        res.json(event)
      }
    } catch(e) {
      next(e);
    }
});

// PUT
router.put("/:id", async (req, res, next) => {
    try{
        const eventId = req.params.id;
        const event = await EventDAO.getById(eventId)
        console.log("here")
        if (event.calendarId.toString() !== req.params.calendarId){
            return res.sendStatus(404);
        } 
        else {
            const updatedEvent = await EventDAO.updateById(eventId, req.body);
            if (updatedEvent) {
                res.json(updatedEvent);
            } else {
                res.sendStatus(404);
            }
        }
    } catch (e){
        next(e)
    }
});


// POST
router.post("/", async (req, res, next) => {
    try {
        const calendar = await CalendarDAO.getById(req.params.calendarId)
        // check if calandar exists
        if (!calendar) {
            return res.sendStatus(404);
        }        
        //check for name
        if (req.body.name === null) {
            res.sendStatus(400)
        //check for date
        } else if(req.body.date === null) {
            res.sendStatus(400)
        // create new event
        } else {
            const newEvent= await EventDAO.create(req.body.name, req.body.date, req.params.calendarId)
            res.json(newEvent)
        }
    } catch(e) {
        next(e);
    }
});

// DELETE
router.delete("/:id", async (req, res, next) => {
    try {
        const event = await EventDAO.removeById(req.params.id);
        if (!event) {
            res.sendStatus(404);
        } else if (event.calendarId.toString() !== req.params.calendarId) {
            res.sendStatus(404);
        } else {
            res.json(event);
        }
    } catch(e) {
        next(e);
    }
});

module.exports = router;
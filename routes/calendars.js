const { Router } = require("express");

const CalendarDAO = require('../daos/calendars');

const router = Router();

// GET ALL
router.get("/", async (req, res, next) => {
  try {
    const calendars = await CalendarDAO.getAll();
    res.json(calendars);
  } catch(e) {
    next(e);
  }
});

// GET BY ID
router.get("/:id", async (req, res, next) => {
  try {
    const calendar = await CalendarDAO.getById(req.params.id);
    if (calendar) {
      res.json(calendar);
    } else {
      res.sendStatus(404);
    }
  } catch(e) {
    next(e);
  }
});

// POST
router.post("/", async (req, res, next) => {
  try {
    const calendar = req.body.name
    if (!calendar || JSON.stringify(calendar) === '{}' ) {
      res.sendStatus(400)
    } else {
      const savedCalendar = await CalendarDAO.create(calendar)
      res.json(savedCalendar)
    }
  } catch(e) {
    next(e);
  }
});

// PUT
router.put("/:id", async (req, res, next) => {
  try {
    const calendar = req.body
    if (!calendar || !calendar.name) {
      res.sendStatus(400);
    } 
    else {
      const updatedCalendar = await CalendarDAO.updateById(req.params.id, calendar)
      if (updatedCalendar) {
        res.json(updatedCalendar);
      } else {
        res.sendStatus(404);
      }
    }
  } catch(e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const calendar = await CalendarDAO.removeById(req.params.id);
    if (calendar) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch(e) {
    next(e);
  }
});

module.exports = router;
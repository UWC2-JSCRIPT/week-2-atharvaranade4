const Events = require('../models/events');

module.exports = {};

//CREATE
module.exports.create = async (name, date, calendarId ) => {
    return await Events.create({ name: name, date: date, calendarId: calendarId });
  };

//GET ALL
module.exports.getAll = async (calendarId) => {
    try {
      const event = await Events.find({ calendarId: calendarId }).lean();
      return event;
    } catch (e) {
      return null;
    }
};

//GET BY ID
module.exports.getById = async (id) => {
    try {
      const event = await Events.findOne({ _id: id }).lean();
      return event;
    } catch (e) {
      return null;
    }
};

// UPDATE
module.exports.updateById = async (id, newData) => {
    try {
        const event = await Events.findOneAndUpdate({ _id: id }, newData, { new: true }).lean();
        return event;
    } catch (e) {
        next(e);
    }
}; 

// REMOVE
module.exports.removeById = async (id) => {
    try {
      const event = await Events.findOneAndDelete({ _id: id }).lean();
      return event;
    } catch (e) {
      return null;
    }
};
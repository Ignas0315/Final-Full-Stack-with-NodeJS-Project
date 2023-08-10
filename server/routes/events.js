const express = require('express');
const joi = require('joi');
const mysql = require('mysql2/promise');
const DB_CONFIG = require('./../db-config/db-config');
const authenticate = require('../middleware/middleware');

const router = express.Router();

const pool = mysql.createPool(DB_CONFIG);

const createNewEventSchema = joi.object({
    name: joi.string().trim().required(),
    date: joi.date().required(),
    description: joi.string().trim().required(),
    city: joi.string().trim().required(),
    country: joi.string().trim().required(),
    image: joi.string().trim().required(),
});

const idSchema = joi.object({
    id: joi.number().integer().required(),
});

router.get('/events', authenticate, async (_, res) => {
    try {
        const [events] = await pool.execute(`
        SELECT * FROM final.events`);

        return res.status(200).send(events).end();
    } catch (error) {
        res.status(500).send(error).end();
    }
});

router.get('/events/participants/:id', authenticate, async (req, res) => {
    let eventParticipantsIdPayload = req.params;

    try {
        eventParticipantsIdPayload = await idSchema.validateAsync(eventParticipantsIdPayload);
    } catch (error) {
        return res.status(400).send({ error: error.message }).end();
    }

    if (eventParticipantsIdPayload.id < 0 || typeof eventParticipantsIdPayload.id !== 'number') {
        return res
            .status(404)
            .send(`Provided id of ${eventParticipantsIdPayload.id} is invalid`)
            .end();
    }

    try {
        const [eventIdCheck] = await pool.execute(
            `
        SELECT * FROM final.events WHERE id=(?)`,
            [eventParticipantsIdPayload.id]
        );

        if (eventIdCheck.length < 1) {
            return res.status(404).send(`Admin with id=${eventIdCheck.id} not found`);
        }

        const [eventParticipants] = await pool.execute(
            `
            SELECT * FROM final.participants WHERE event_id = (?)`,
            [eventParticipantsIdPayload.id]
        );

        return res.status(200).send(eventParticipants).end();
    } catch (error) {
        res.status(500).send(error).end();
        return console.error(error);
    }
});

router.get('/events/:id', authenticate, async (req, res) => {
    let eventsIdPayload = req.params;

    try {
        eventsIdPayload = await idSchema.validateAsync(eventsIdPayload);
    } catch (error) {
        return res.status(400).send({ error: error.message }).end();
    }

    if (eventsIdPayload.id < 0 || typeof eventsIdPayload.id !== 'number') {
        return res.status(404).send(`Provided id of ${eventsIdPayload.id} is invalid`).end();
    }

    try {
        const [event] = await pool.execute(
            `
        SELECT * FROM final.events WHERE id=(?)`,
            [eventsIdPayload.id]
        );

        if (event.length < 1) {
            return res.status(404).send(`Event with id=${eventsIdPayload.id} not found`);
        }

        return res.status(200).send(event).end();
    } catch (error) {
        res.status(500).send(error).end();
        return console.error(error);
    }
});

router.post('/events', authenticate, async (req, res) => {
    let newEventPayload = req.body;

    try {
        newEventPayload = await createNewEventSchema.validateAsync(newEventPayload);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }

    try {
        const eventDate = newEventPayload.date.toLocaleString('lt-LT');

        const data = await pool.execute(
            `
            INSERT INTO final.events (name,date,description,city,country,image) VALUES (?,?,?,?,?,?)`,
            [
                newEventPayload.name,
                eventDate,
                newEventPayload.description,
                newEventPayload.city,
                newEventPayload.country,
                newEventPayload.image,
            ]
        );

        //https://cdn-az.allevents.in/events1/banners/5baafa04f21c267a500edc275f2cda47c2f43fb829d43dec1ee3c26195aef948-rimg-w960-h503-gmir.jpg?v=1690563335

        return res
            .status(201)
            .send({ message: `Event '${newEventPayload.name}' was added`, data: data })
            .end();
    } catch (error) {
        res.status(500).send(error).end();
        return console.error(error);
    }
});

router.delete('/events/:id', authenticate, async (req, res) => {
    let eventIdPayload = req.params;

    try {
        eventIdPayload = await idSchema.validateAsync(eventIdPayload);
    } catch (error) {
        return res.status(400).send({ error: error.message }).end();
    }

    if (eventIdPayload.id < 0 || typeof eventIdPayload.id !== 'number') {
        return res.status(404).send(`Provided id of ${eventIdPayload.id} is invalid`).end();
    }

    try {
        const [idCheck] = await pool.execute(
            `
        SELECT * FROM final.events WHERE id=(?)`,
            [eventIdPayload.id]
        );

        if (idCheck.length < 1) {
            return res.status(404).send(`Event with id=${eventIdPayload.id} not found`);
        }

        await pool.execute(
            `
            DELETE FROM final.participants WHERE event_id = (?)
        `,
            [eventIdPayload.id]
        );

        await pool.execute(
            `
            DELETE FROM final.events WHERE id = (?)`,
            [eventIdPayload.id]
        );

        return res.status(202).send(`Event with id=${eventIdPayload.id} was deleted`);
    } catch (error) {
        res.status(500).send(error).end();
        return console.error(error);
    }
});

router.patch('/events/:id', authenticate, async (req, res) => {
    let eventIdPayload = req.params;
    let dataPayload = req.body;

    try {
        dataPayload = await createNewEventSchema.validateAsync(dataPayload);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }

    try {
        eventIdPayload = await idSchema.validateAsync(eventIdPayload);
    } catch (error) {
        return res.status(400).send({ error: error.message }).end();
    }

    if (eventIdPayload.id < 0 || typeof eventIdPayload.id !== 'number') {
        return res.status(404).send(`Provided id of ${eventIdPayload.id} is invalid`).end();
    }

    try {
        const [idCheck] = await pool.execute(
            `
        SELECT * FROM final.events WHERE id=(?)`,
            [eventIdPayload.id]
        );

        if (idCheck.length < 1) {
            return res.status(404).send(`Event with id=${eventIdPayload.id} not found`);
        }

        const eventDate = dataPayload.date.toLocaleString('lt-LT');

        console.log(dataPayload);

        await pool.execute(
            `
        UPDATE final.events SET name = ?, date = ?, description= ?, city= ?, country= ?, image= ? WHERE id = ?`,
            [
                dataPayload.name,
                eventDate,
                dataPayload.description,
                dataPayload.city,
                dataPayload.country,
                dataPayload.image,
                eventIdPayload.id,
            ]
        );

        return res.status(201).send(`Event with id:${eventIdPayload.id} was updated`);
    } catch (error) {
        res.status(500).send(error).end();
        return console.error(error);
    }
});

module.exports = router;

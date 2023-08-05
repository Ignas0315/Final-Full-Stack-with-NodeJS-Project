const express = require('express');
const joi = require('joi');
const mysql = require('mysql2/promise');
const DB_CONFIG = require('./../db-config/db-config');
const calculateAge = require('./../utility/calculateAge');

const router = express.Router();

const pool = mysql.createPool(DB_CONFIG);

const participantSchema = joi.object({
    event_id: joi.number().integer().required(),
    first_name: joi.string().trim().required(),
    last_name: joi.string().trim().required(),
    email: joi.string().email().trim().required(),
    dob: joi.date().required(),
});

const idSchema = joi.object({
    id: joi.number().integer().required(),
});

router.get('/participants/unique', async (_, res) => {
    try {
        const [participants] = await pool.execute(`

        SELECT DISTINCT(email), first_name, last_name, dob FROM final.participants`);

        return res.status(200).send(participants).end();
    } catch (error) {
        res.status(500).send(error).end();
    }
});

router.get('/participants', async (_, res) => {
    try {
        const [eventParticipants] = await pool.execute(`
        SELECT participants.id, participants.first_name, participants.last_name, participants.event_id,
        participants.email, participants.age, participants.dob, events.name FROM
        final.participants INNER JOIN final.events ON participants.event_id = events.id`);

        return res.status(200).send(eventParticipants).end();
    } catch (error) {
        res.status(500).send(error).end();
    }
});

router.get('/participants/:id', async (req, res) => {
    participantIdPayload = req.params;

    try {
        participantIdPayload = await idSchema.validateAsync(participantIdPayload);
    } catch (error) {
        return res.status(400).send({ error: error.message }).end();
    }

    if (participantIdPayload.id < 0 || typeof participantIdPayload.id !== 'number') {
        return res.status(404).send(`Provided id of ${participantIdPayload.id} is invalid`).end();
    }

    try {
        const [participant] = await pool.execute(
            `
        SELECT participants.id, participants.first_name, participants.last_name, participants.event_id,
        participants.email, participants.age, participants.dob, events.name FROM
        final.participants INNER JOIN final.events ON participants.event_id = events.id
        WHERE participants.id = (?)`,
            [participantIdPayload.id]
        );

        if (participant.length < 1) {
            return res.status(404).send(`Participant with id=${eventsIdPayload.id} not found`);
        }

        return res.status(200).send(participant).end();
    } catch (error) {
        res.status(500).send(error).end();
        return console.error(error);
    }
});

router.post('/participants', async (req, res) => {
    let registrationPayload = req.body;

    const dobDate = req.body.dob.toLocaleString('lt-LT');

    try {
        registrationPayload = await participantSchema.validateAsync(registrationPayload);
    } catch (error) {
        return res.status(400).send({ error: error.message }).end();
    }

    try {
        await pool.execute(
            `
        INSERT INTO final.participants (event_id, first_name, last_name, email, dob, age)
        VALUES (?,?,?,?,?,?)
        `,
            [
                registrationPayload.event_id,
                registrationPayload.first_name,
                registrationPayload.last_name,
                registrationPayload.email,
                registrationPayload.dob,
                calculateAge(dobDate),
            ]
        );

        console.log('aaa');

        return res
            .status(201)
            .send({
                message: `Participant: '${registrationPayload.first_name} ${registrationPayload.last_name}' was added`,
            })
            .end();
    } catch (error) {
        if (error.message.includes('Duplicate entry ')) {
            return res
                .status(400)
                .send({
                    error: `Participant with email: ${registrationPayload.email} is already registered to this event`,
                })
                .end();
        }

        return res.status(500).send({ error: error.message }).end();
    }
});

router.delete('/participants/:id', async (req, res) => {
    let participantIdPayload = req.params;

    try {
        participantIdPayload = await idSchema.validateAsync(participantIdPayload);
    } catch (error) {
        return res.status(400).send({ error: error.message }).end();
    }

    if (participantIdPayload.id < 0 || typeof participantIdPayload.id !== 'number') {
        return res.status(404).send(`Provided id of ${participantIdPayload.id} is invalid`).end();
    }

    try {
        const [idCheck] = await pool.execute(
            `
        SELECT * FROM final.participants WHERE id=(?)`,
            [participantIdPayload.id]
        );

        if (idCheck.length < 1) {
            return res.status(404).send(`Event with id=${participantIdPayload.id} not found`);
        }

        await pool.execute(
            `
            DELETE FROM final.participants WHERE id = (?)`,
            [participantIdPayload.id]
        );

        return res.status(202).send(`Participant with id=${participantIdPayload.id} was deleted`);
    } catch (error) {
        res.status(500).send(error).end();
        return console.error(error);
    }
});

router.get('/participant-events/:id', async (req, res) => {
    participantIdPayload = req.params;

    try {
        participantIdPayload = await idSchema.validateAsync(participantIdPayload);
    } catch (error) {
        return res.status(400).send({ error: error.message }).end();
    }

    if (participantIdPayload.id < 0 || typeof participantIdPayload.id !== 'number') {
        return res.status(404).send(`Provided id of ${participantIdPayload.id} is invalid`).end();
    }

    try {
        const [participantEmail] = await pool.execute(
            `
        SELECT participants.email WHERE id = (?)
        `,
            [participantIdPayload.id]
        );

        const [participantEventsByEmail] = await pool.execute(
            `
        SELECT DISTINCT(email), event_id FROM final.participants WHERE email=(?)`,
            [participantEmail]
        );

        if (participantEventsByEmail.length < 1) {
            return res.status(404).send(`Participant with id=${participantIdPayload.id} not found`);
        }

        return res.status(200).send(participantEventsByEmail).end();
    } catch (error) {
        res.status(500).send(error).end();
        return console.error(error);
    }
    //SELECT DISTINCT(email), event_id FROM final.participants
});

router.patch('/participants/:id', async (req, res) => {
    participantIdPayload = req.params;
    participantUpdatePayload = req.body;

    try {
        participantIdPayload = await idSchema.validateAsync(participantIdPayload);
    } catch (error) {
        return res.status(400).send({ error: error.message }).end();
    }

    if (participantIdPayload.id < 0 || typeof participantIdPayload.id !== 'number') {
        return res.status(404).send(`Provided id of ${participantIdPayload.id} is invalid`).end();
    }

    try {
        participantUpdatePayload = await participantSchema.validateAsync(participantUpdatePayload);
    } catch (error) {
        return res.status(400).send({ error: error.message }).end();
    }

    try {
        const [idCheck] = await pool.execute(
            `
        SELECT * FROM final.participants WHERE id=(?)`,
            [participantIdPayload.id]
        );

        if (idCheck.length < 1) {
            return res.status(404).send(`Participant with id=${participantIdPayload.id} not found`);
        }

        const dobDate = req.body.dob.toLocaleString('lt-LT');

        // await pool.execute(`
        //     ALTER TABLE final.participants DROP CONSTRAINT UQ_Email_Event
        // `);

        await pool.execute(
            `
            UPDATE final.participants SET event_id = ?, first_name = ?, last_name = ?, email = ?, dob = ?, age = ? WHERE id = ?`,
            [
                participantUpdatePayload.event_id,
                participantUpdatePayload.first_name,
                participantUpdatePayload.last_name,
                participantUpdatePayload.email,
                participantUpdatePayload.dob,
                calculateAge(dobDate),
                participantIdPayload.id,
            ]
        );

        // await pool.execute(`
        //     ALTER TABLE final.participants ADD CONSTRAINT UQ_Email_Event UNIQUE(email,event_id);
        // `);

        return res.status(201).send('User updated successfully').end();
    } catch (error) {
        if (error.message.includes('Duplicate entry ')) {
            return res
                .status(400)
                .send({
                    error: `Participant with email: ${participantUpdatePayload.email} is already registered to this event`,
                })
                .end();
        }

        return res.status(500).send({ error: error.message }).end();
    }
});

// event_id: joi.number().integer().required(),
// first_name: joi.string().trim().required(),
// last_name: joi.string().trim().required(),
// email: joi.string().email().trim().required(),
// dob: joi.date().required(),

// [
//     registrationPayload.event_id,
//     registrationPayload.first_name,
//     registrationPayload.last_name,
//     registrationPayload.email,
//     registrationPayload.dob,
//     calculateAge(dobDate),
// ]

module.exports = router;

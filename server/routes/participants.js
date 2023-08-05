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

router.delete('/participant');

router.get(
    '/participant-events'
    //SELECT DISTINCT(email), event_id FROM final.participants
);

// event_id: joi.number().integer().required(),
// first_name: joi.string().trim().required(),
// last_name: joi.string().trim().required(),
// email: joi.string().email().trim().required(),
// dob: joi.date().required(),

module.exports = router;

const express = require('express');
const joi = require('joi');
const mysql = require('mysql2/promise');
const DB_CONFIG = require('./../db-config/db-config');
const bcrypt = require('bcrypt');

const router = express.Router();

const pool = mysql.createPool(DB_CONFIG);

const adminRegistrationSchema = joi.object({
    email: joi.string().email().trim().lowercase().required(),
    password: joi.string().min(8).required(),
    first_name: joi.string().trim().required(),
    last_name: joi.string().trim().required(),
});

const adminIdSchema = joi.object({
    id: joi.number().integer().required(),
});

router.get('/admin', async (_, res) => {
    try {
        const [admins] = await pool.execute(`
        SELECT * FROM final.admin`);

        return res.status(200).send(admins).end();
    } catch (error) {
        res.status(500).send(error).end();
    }
});

router.get('/admin/:id', async (req, res) => {
    let adminIdPayload = req.params;

    try {
        adminIdPayload = await adminIdSchema.validateAsync(adminIdPayload);
    } catch (error) {
        return res.status(400).send({ error: error.message }).end();
    }

    if (adminIdPayload.id < 0 || typeof adminIdPayload.id !== 'number') {
        return res.status(404).send(`Provided id of ${adminIdPayload.id} is invalid`).end();
    }

    try {
        const [admin] = await pool.execute(
            `
        SELECT * FROM final.admin WHERE id=(?)`,
            [adminIdPayload.id]
        );

        if (admin.length < 1) {
            return res.status(404).send(`Admin with id=${adminIdPayload.id} not found`);
        }

        return res.status(200).send(admin).end();
    } catch (error) {
        res.status(500).send(error).end();
        return console.error(error);
    }
});

router.delete('/admin/:id', async (req, res) => {
    let adminIdPayload = req.params;

    try {
        adminIdPayload = await adminIdSchema.validateAsync(adminIdPayload);
    } catch (error) {
        return res.status(400).send({ error: error.message }).end();
    }

    if (adminIdPayload.id < 0 || typeof adminIdPayload.id !== 'number') {
        return res.status(404).send(`Provided id of ${adminIdPayload.id} is invalid`).end();
    }

    try {
        const [idCheck] = await pool.execute(
            `
        SELECT * FROM final.admin WHERE id=(?)`,
            [adminIdPayload.id]
        );

        if (idCheck.length < 1) {
            return res.status(404).send(`Admin with id=${adminIdPayload.id} not found`);
        }
    } catch (error) {
        res.status(500).send(error).end();
        return console.error(error);
    }
});

router.patch('/admin/:id', async (req, res) => {
    let adminIdPayload = req.params;
    let dataPayload = req.body;

    try {
        dataPayload = await adminRegistrationSchema.validateAsync(dataPayload);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }

    try {
        adminIdPayload = await adminIdSchema.validateAsync(adminIdPayload);
    } catch (error) {
        return res.status(400).send({ error: error.message }).end();
    }

    if (adminIdPayload.id < 0 || typeof adminIdPayload.id !== 'number') {
        return res.status(404).send(`Provided id of ${adminIdPayload.id} is invalid`).end();
    }

    try {
        const [idCheck] = await pool.execute(
            `
        SELECT * FROM final.admin WHERE id=(?)`,
            [adminIdPayload.id]
        );

        if (idCheck.length < 1) {
            return res.status(404).send(`Admin with id=${adminIdPayload.id} not found`);
        }

        const encryptedPassword = await bcrypt.hashSync(dataPayload.password, 10);

        await pool.execute(
            `
        UPDATE final.admin SET email = ?, password = ?, first_name=?, last_name=? WHERE id = ?`,
            [
                dataPayload.email,
                encryptedPassword,
                dataPayload.first_name,
                dataPayload.last_name,
                adminIdPayload.id,
            ]
        );

        return res.status(201).send(`User with id:${adminIdPayload.id} was updated`);
    } catch (error) {
        res.status(500).send(error).end();
        return console.error(error);
    }
});

router.post('/admin/register', async (req, res) => {
    let newAdminPayload = req.body;

    try {
        newAdminPayload = await adminRegistrationSchema.validateAsync(newAdminPayload);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }

    try {
        const encryptedPassword = await bcrypt.hashSync(newAdminPayload.password, 10);
        const [duplicateCheck] = await pool.execute(`
            SELECT * FROM final.admin WHERE email="${newAdminPayload.email}"`);

        if (duplicateCheck.length > 0) {
            return res.status(400).send({ err: 'User already exists. Please try different email' });
        }
        await pool.execute(
            `
            INSERT INTO final.admin (email,password,first_name,last_name) VALUES (?,?,?,?)`,
            [
                newAdminPayload.email,
                encryptedPassword,
                newAdminPayload.first_name,
                newAdminPayload.last_name,
            ]
        );

        return res.status(201).send({ message: 'Registered' }).end();
    } catch (error) {
        res.status(500).send(error).end();
        return console.error(error);
    }
});

module.exports = router;

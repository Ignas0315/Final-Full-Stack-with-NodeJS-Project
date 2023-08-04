const express = require('express');
const joi = require('joi');
const mysql = require('mysql2/promise');
const DB_CONFIG = require('./../db-config/db-config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const pool = mysql.createPool(DB_CONFIG);

const userLoginSchema = joi.object({
    email: joi.string().email().trim().lowercase().required(),
    password: joi.string().required(),
});

router.post('/login', async (req, res) => {
    let loginPayload = req.body;

    try {
        loginPayload = await userLoginSchema.validateAsync(loginPayload);
    } catch (error) {
        return res.status(400).send({ error: error.message }).end();
    }

    try {
        const [loginData] = await pool.execute(`SELECT * FROM final.admin WHERE email = (?)`, [
            loginPayload.email,
        ]);

        if (!loginData.length) {
            return res.status(400).send({ err: 'Email or password did not match' });
        }

        const isPasswordMatching = await bcrypt.compare(
            loginPayload.password,
            loginData[0].password
        );

        if (isPasswordMatching) {
            const token = jwt.sign(
                {
                    email: loginData[0].email,
                    id: loginData[0].id,
                },
                process.env.JWT_SECRET
            );
            return res.status(200).send({ token });
        }
    } catch (error) {
        return res.status(500).send({ error: 'Unexpected error' });
    }
});

module.exports = router;

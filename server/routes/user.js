const router = require('express').Router();
const { model } = require('mongoose');
let User = require('../models/user.model');
const cors = require('cors');

const { PythonShell } = require('python-shell');

router.use(cors());

router.post('/user/add', async (req, res) => {
    try {
        console.log(req.body)
        const newUser = await new User(req.body.user);
        await newUser.save();
        res.send("User formed")
    }
    catch (e) {
        console.log(e);
        res.send("error in saving!")
    }
});

router.post('/user/get', (req, res) => {
    let data = req.body;
    console.log(data);
    User.findOne({ uid: data.uid }, (err, user) => {
        if (err) {
            console.log('mongo error');
            res.status(400).send(`Error: ${err}`);
        } else if (user) {
            console.log(user);
            res.json(user);
        } else {
            console.log('user not found');
            res.status(404).send('User not found');
        }
    });
});

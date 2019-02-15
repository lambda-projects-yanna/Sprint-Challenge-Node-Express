const express = require('express');
const router = express.Router();

const db = require('../data/helpers/actionModel');


// ================ GET endpoints 

router.get('/', (req, res) => {
    db.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(() => {
            res.status(500).json({error: 'the actions info could not be retrieved.'})
        })
});

router.get('/:id', (req, res) => {
    const actionID = req.params.id;
    db.get(actionID)
        .then(actions => {
            if (actions) {
                res.status(200).json(actions)
            }
            else {
                res.status(404).json({message: "the action with the specified id does not exist."})
            }
        })
        .catch(() => {
            res.status(500).json({error: "the actions with the specified id could not be retrieved."})
        })
});

// ================ POST endpoints 


router.post('/', (req, res) => {
    action = req.body;
    if (!action.project_id || !action.description || !action.notes) {
        res.status(400).json({message: 'please provide the action with a project_id, description, and notes.'})
    }
    else {
        db.insert(action)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(() => {
            res.status(500).json({error: "the new action could not be posted"})
        })
    }
});

module.exports = router;
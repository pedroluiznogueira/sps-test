const express = require("express");
const authMiddleware = require('../middlewares/auth');
const User = require("../models/user");

const router = express.Router();
router.use(authMiddleware);

router.post('/add/:id', async (req, res) => {
    try {
        const { email, repos } = req.body;
        const id = req.params.id;

        const user = await User.findById({ _id:id });
        repos.map( async (repo) => {
            user.repos.push(repo);
            const upd = await User.findByIdAndUpdate(user.id, user);
    
            res.send({status: 200, message: 'succesfully updated', upd: upd, repo: repo});
        });

    } catch (err) {
        return res.status(404).send({status: 404, message: 'failed to update', error: err.message});
    }
});

router.get('/find/all/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const user = await User.findById({ _id:id });
        res.send({status: 200, message: 'succesfully found it', repos: user.repos});
    } catch (err) {
        return res.status(404).send({status: 404, message: "there's no user with the given id", error: err.message});
    }
});

router.get('/find/by/name/:name/by/id/:id', async (req, res) => {
    try {
        const repoName = req.params.name;
        const id = req.params.id;

        const user = await User.findById({ _id:id });
        user.repos.map((repo) => {
            if (repo.name === repoName) 
                return res.send({status: 200, message: 'succesfully found it', foundRepo: repo});
        });
    } catch (err) {
        return res.status(404).send({status: 404, message: "there's no repo with the given name", error: err.message});
    }

});

router.delete('/delete/by/name/:name/by/id/:id', async (req, res) => {
    try {
        const repoName = req.params.name;
        const id = req.params.id;

        const user = await User.findById({ _id:id });
        await user.repos.map( async (repo) => {
            if (repo.name === repoName) {
                user.repos = user.repos.filter((repo) => repo.name !== repoName);
                const upd = await User.findByIdAndUpdate(user.id, user);
                res.send({status: 200, message: 'succesfully deleted', upd: upd, repo: repo});
            }
        });
    } catch (err) {
        return res.status(404).send({status: 404, message: "there's no user with the given id", error: err.message});
    }
});

module.exports = app => app.use('/repos', router);

const routes = require('express').Router();

const authMiddleware = require('./app/middlewares/auth');

const SessionController = require('./app/controllers/SessionController');

routes.post('/session', SessionController.store)

routes.use(authMiddleware);

routes.get('/dashboard', async (request, response) => {
    response.status(200).send();
})

module.exports = routes;
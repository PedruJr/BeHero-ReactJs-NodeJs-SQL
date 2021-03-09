const express = require('express');
const { celebrate, Segments, Joi} = require('celebrate');

const ongController = require('./controllers/OngController');
const incidentController = require('./controllers/IncidentController');
const sessionController = require('./controllers/sessionController');

const routes = express.Router(); //metodo de rotas do express


routes.get('/ongs', ongController.index);
/* após tudo, encapsulamos os codigos de roto nos controllers */
/* então instanciamos nosso encapsulamento ongController */

routes.post('/ongs',celebrate({
    [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })

}),  ongController.create); 

routes.post('/sessions', sessionController.create); /* responsavel pelo request de login/sessão */

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
})  ,incidentController.indexEspecific);/*listar incidents de ong especifica */

routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required().email(),
        value: Joi.number().required()
    }),
        
}), incidentController.create); 


routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}),incidentController.index);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}) ,incidentController.delete); /* neste caso usaremos parametro de rota para indentificar o alvo */ 

module.exports = routes; /* exportando rotas pelo node */

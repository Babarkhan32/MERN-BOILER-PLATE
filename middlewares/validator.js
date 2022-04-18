const createHttpError = require('http-errors')
//* Include joi to check error type 
const Joi = require('joi')
//* Include all validators
const Validators = require('../validators')

module.exports = function(validator,contentType) {
    console.log(contentType);
    //! If validator is not exist, throw err
    if(!Validators.hasOwnProperty(validator,contentType))
        throw new Error(`'${validator}' validator is not exist`)

    return async function(req, res, next) {
        try {
           let content = null;
           if(contentType === 'body'){
               content = req.body
           }
           if(contentType === 'params'){
               content = req.params
           }
           if(contentType === 'both'){
               content = {...req.params,...req.body}
           }
           console.log("content",content)
            const validated = await Validators[validator].validateAsync(content,{
                allowUnknown: true
              })
            req.body = validated
            next()
        } catch (err) {
            //* Pass err to next
            //! If validation error occurs call next with HTTP 422. Otherwise HTTP 500
            if(err.isJoi) 
                return next(createHttpError(422, {message: err.message}))
            next(createHttpError(500))
        }
    }
}
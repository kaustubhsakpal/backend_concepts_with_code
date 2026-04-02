import {body,validationResult} from 'express-validator'

const validation=(req,res,next)=>{
    const result = validationResult(req);

    if(result.isEmpty()){
        return next()
    }

    res.status(400).json({
        error:result.array()
    })
}

export const registervalidator = [
    body('username').isString().withMessage('username should  be String'),
    body("email").isEmail().withMessage('email should be in proper format'),
    body('password').isLength({min:6,max:12}).withMessage('password should contain atleast 6 letter and not more then 12'),
    validation
    
]


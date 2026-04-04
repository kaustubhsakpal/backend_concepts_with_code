import { body,validationResult } from "express-validator";

export const registervalidation=[
    body('username').trim().isString().withMessage('username format is wrong'),
    body('email').isEmail().trim().withMessage('email format is wrong'),
    body('password').isLength({min:6,max:18}).withMessage('password format is wrong'),

    validation
]

function validation(req,res,next){
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
        
    }
 next()
}
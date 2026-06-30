const expressValidator=require('express-validator')
const{body,validationResult}=expressValidator

const validate=((req,res,next)=>
{
    const errors=validationResult(req)

    if(errors.isEmpty())
    {
        return next()
    }
    return res.status(400).json({
        error:errors.array()
    })
})

const registerValidator=[
    body("username")
    .trim()
    .notEmpty().withMessage("Username is required")
    .matches(/^[a-zA-Z0-9_]+$/).withMessage("Username can only contain letters, numbers and underscroe")
    .isLength({min:3,max:30}).withMessage("Username must contain 3-30 characters"),

    body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email address"),

    body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({min:6}).withMessage("Password should contain at least 6 characters")
    .matches(/^(?=.*[A-Z])(?=.*\d).{6,}$/).withMessage("Password should contain at least 6 characters, including a capital letter and a number"),

    validate
]

const loginValidator=[
    body("identifier")
    .trim()
    .isLength({ min: 3 })
    .notEmpty().withMessage("Username or email is required"),
 

    body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({min:6}).withMessage("Password should contain at least 6 characters")
    .matches(/^(?=.*[A-Z])(?=.*\d).{6,}$/).withMessage("Password should contain at least 6 characters, including a capital letter and a number"),

    validate

]

module.exports=
{
    registerValidator,
    loginValidator
}
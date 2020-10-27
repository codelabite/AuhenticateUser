const joi  = require('@hapi/joi')



const LoginValidation = (data) =>{
  const schema = joi.object({  
    email: joi.string().required().email(),
    password: joi.string().required().min(6),
  })
  return schema.validate(data)
}

const SignupValidation = (data) =>{
  const schema = joi.object({
    name: joi.string().required().min(3),
    email: joi.string().required().email(),
    password: joi.string().required().min(6),
  })
  return schema.validate(data)
}

module.exports.SignupValidation = SignupValidation  
module.exports.LoginValidation = LoginValidation  
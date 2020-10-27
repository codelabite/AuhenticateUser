const express = require('express')
const router = express.Router() 
const user = require('../SchemaData/schemaData')
const joi  = require('@hapi/joi')
const {SignupValidation, LoginValidation} = require('./validation')
const bcrypt  = require('bcryptjs')





router.post('/register', async(req, res)=>{
  const {error} = SignupValidation(req.body)

 if (error){
  return res.send(error.details[0].message)
 }

const EmailExist = await user.findOne({email: req.body.email})
if(EmailExist){
  return res.status(400).send("Email already exist...")
}

const hide =await bcrypt.genSalt(10)
const hidePassward =await bcrypt.hash(req.body.password, hide)

  try{
    const newData = new user({
      password: hidePassward, 
      name: req.body.name, 
      email: req.body.email}) 
    const saveData = await newData.save()
    res.status(200).json(saveData)

  }catch(error){
    res.status(200).send(error)
  }
})


router.post('/login', async(req, res)=>{

  const  {error} = LoginValidation(req.body)
  if(error){
    return res.status(404).send(error.details[0].message)
  }

const checkUser = await user.findOne({email: req.body.email})
if(!checkUser){
  res.status(404).send("Wrong Email")
}

const valPWD = await bcrypt.compare(req.body.password, checkUser.password)
if(!valPWD){
  return res.status(404).send("Invalid Password")
}

res.status(200).send("You have Successfully Logged IN>>>!")

})

router.get('/', async(req, res)=>{
  try{
    // const saveData = new user(req.body)
    const newData = await user.find()
    res.status(200).json(newData)

  }catch(error){
    res.status(200).send(error)
  }
})

router.get('/:id', async(req, res)=>{
  try{
    // const saveData = new user(req.body)
    const newData = await user.findById(req.params.id)
    res.status(200).json(newData)

  }catch(error){
    res.status(200).send(error)
  }
})


router.delete('/:id', async(req, res)=>{
  try{
    // const saveData = new user(req.body)
    const newData = await user.findByIdAndDelete(req.params.id, req.body)
    res.status(200).json(newData)

  }catch(error){
    res.status(200).send(error)
  }
})

router.patch('/:id', async(req, res)=>{
  try{
    // const saveData = new user(req.body)
    const newData = await user.findByIdAndUpdate(req.params.id, req.body,{
      new: true,
      runValidators: true
    } )
    res.status(200).json(newData)

  }catch(error){
    res.status(200).send(error)
  }
})




module.exports = router;
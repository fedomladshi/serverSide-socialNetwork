const Joi = require("@hapi/joi");

//Register Validation
const registerValidation = (body:any) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(body);
};

const loginValidation = (body:any) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(body);
};

const profileValidation = (body) => {
  const schema = Joi.object({
    status: Joi.string().required(),
    skills: Joi.string().required(),
  });
  return schema.validate(body);
};

const experienceValidation = (body) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    company: Joi.string().required(),
    from: Joi.string().required(),
  });
  return schema.validate(body);
};

const educationValidation = (body) => {
  const schema = Joi.object({
    school: Joi.string().required(),
    degree: Joi.string().required(),
    fieldofstudy: Joi.string().required(),
  });
  return schema.validate(body);
};

const postValidation = (body) => {
  const schema = Joi.object({
    text: Joi.string().required(),
  });
  return schema.validate(body);
};

export { registerValidation, loginValidation, profileValidation};
module.exports.profileValidation = profileValidation;
module.exports.experienceValidation = experienceValidation;
module.exports.educationValidation = educationValidation;
module.exports.postValidation = postValidation;

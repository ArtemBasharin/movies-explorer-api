const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
// const AuthErr = require('../errors/AuthErr');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (value) => validator.isEmail(value)
    }
  },
  password: {
    type: String,
    required: true,
    select: false
  }
})

userSchema.statics.findUserByCredentials = function findUser (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthErr('Неправильные почта или пароль'))
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthErr('Неправильные почта или пароль'))
          }

          return user
        })
    })
}

module.exports = mongoose.model('user', userSchema)

// email — почта пользователя, по которой он регистрируется. Это обязательное поле, уникальное для каждого пользователя. Также оно должно валидироваться на соответствие схеме электронной почты.
// password — хеш пароля. Обязательное поле-строка. Нужно задать поведение по умолчанию, чтобы база данных не возвращала это поле.
// name — имя пользователя, например: Александр или Мария. Это обязательное поле-строка от 2 до 30 символов.

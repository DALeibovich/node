const passport = require("passport");
const local = require('passport-local')
const { users } = require('../../models/User.js')
const { createHash, isValidPassword } = require('../../utils/bcrypt.js')

const LocalStrategy = local.Strategy

const initializePassport = () => {
    passport.use(
        'register',
        new LocalStrategy(
            { passReqToCallback: true },
            async (req, username, password, done) => {
                try {
                    console.log(password + " -- " + createHash(password))
                    let user = await users.findOne({ username })
                    if (user) return done(null, false,{message: 'El usuario ya esta registrado'})
                    let email = await users.findOne({ email: req.body.email })
                    if (email) return done(null, false,{message: 'El email ya esta registrado'})
                    const newUser = {
                        username,
                        password: createHash(password),
                        email: req.body.email,
                        name: req.body.username
                    }
                    try {
                        let result = await users.create(newUser)
                        return done(null, result)
                    } catch(err) {
                        // console.log(err)
                        done(err)
                    }
                } catch(err) {
                    // console.log(err)
                    done(err)
                }
            }
        )
    )

    passport.use(
        'login',
        new LocalStrategy(
            async(username, password, done) => {
                try {
                    let user = await users.findOne({ username })
                    if (!user) return done(null, false, { message: "El usuario no existe"})
                    if (!isValidPassword(user, password)) return done(null, false, {message: "Contraseña incorrecta"})
                    return done(null, user)
                    
                } catch(err) {
                    done(err)
                }
            }
        )
    )

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser((id, done) => {
        users.findById(id, done)
    })
}

module.exports = {
    initializePassport
}
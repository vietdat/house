// import * as jwt from "jsonwebtoken";
// import * as passport from "passport";
// import * as moment from "moment";
// import { Strategy, ExtractJwt } from "passport-jwt";
// import { UserService } from "../service/UserService";
// import { User } from "../entity/User";

// class Auth {
//     public initialize = () => {
//         passport.use("jwt", this.getStrategy());
//         return passport.initialize();
//     }

//     public authenticate = (callback) => passport.authenticate("jwt", { session: false, failWithError: true }, callback);

//     private genToken = (user: User): Object => {
//         let expires = moment().utc().add({ days: 7 }).unix();
//         let token = jwt.encode({
//             exp: expires,
//             id: user.id
//         }, "Fami@123");

//         return {
//             token: token,
//             expires: moment.unix(expires).format(),
//             user: user.id
//         };
//     }

//     private getStrategy = (): Strategy => {
//         const params = {
//             secretOrKey: process.env.JWT_SECRET,
//             jwtFromRequest: ExtractJwt.fromAuthHeader(),
//             passReqToCallback: true
//         };

//         return new Strategy(params, (req, payload: any, done) => {
//             User.findOne({ "username": payload.username }, (err, user) => {
//                 /* istanbul ignore next: passport response */
//                 if (err) {
//                     return done(err);
//                 }
//                 /* istanbul ignore next: passport response */
//                 if (user === null) {
//                     return done(null, false, { message: "The user in the token was not found" });
//                 }

//                 return done(null, { _id: user._id, username: user.username });
//             });
//         });
//     }

// }

// export default new Auth();

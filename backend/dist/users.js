"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
    User.prototype.matches = function (another) {
        return another !== undefined && another.email === this.email && another.password === this.password;
    };
    return User;
}());
exports.User = User;
exports.users = {
    "alexandre@gmail.com": new User("alexandre@gmail.com", "Alexandre", "alexandre123"),
    "catiana@gmail.com": new User("catiana@gmail.com", "Catiana", "catiana123")
};

export class User {
  constructor(public email: string, public name:string, private password: string){}

  matches(another: User): boolean{
    return another !== undefined && another.email === this.email && another.password === this.password
  }
}

export const users: {[key:string]:User} = {
  "alexandre@gmail.com": new User("alexandre@gmail.com", "Alexandre", "alexandre123"),
  "catiana@gmail.com": new User("catiana@gmail.com", "Catiana", "catiana123")
}

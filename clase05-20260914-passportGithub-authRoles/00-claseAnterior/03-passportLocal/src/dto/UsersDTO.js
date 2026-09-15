export class UsersDTO{
    constructor(user){
        this.nombre= user.firstName.toUpperCase()
        this.email= user.email
        this.username= user.email.split("@")[0]
    }
}

// new UsersDTO
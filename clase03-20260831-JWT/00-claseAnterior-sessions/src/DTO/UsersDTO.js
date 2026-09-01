export class UsersDTO{
    constructor(user){
        this.nombre=user.firstName
        this.rol=user.role
        this.email=user.email
    }
}
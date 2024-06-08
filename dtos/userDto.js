class UserDto {
    id;
    email;
    name;
    role;

    constructor(model) {
        this.id = model.id;
        this.email = model.email;
        this.name = model.name;
        this.role = model.role;
    }
}

export default UserDto;
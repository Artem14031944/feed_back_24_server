class ApplicationDto {
    id;
    status;
    message;
    comment;
    email;
    role;
    createdAt;

    constructor(model, users) {
        this.id = model.id;
        this.status = model.status;
        this.message = model.message;
        this.comment = model.comment;
        this.email = users?.find(u => u.id === model.user_id)?.email,
        this.role = users?.find(u => u.id === model.user_id)?.role,
        this.createdAt = model.createdAt;
    };
};

export default ApplicationDto;
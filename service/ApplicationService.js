import { Application, User } from "../models/models.js"; 
import { v4 } from 'uuid';
import MailService from '../service/MailService.js'
import ApiError from '../error/ApiError.js';
import UserDto from "../dtos/userDto.js";

class ApplicattionService {
    async create(user_id, message, status) {
        const application = await Application.create({ user_id, message, status });
        if (!application) {
            throw ApiError.badRequest('Не удалось создать заявку');
        };

        return application;
    };

    async resolved(reqBody, id) {
        const application = await Application.findOne({where: { id }});
        if (!application) {
            throw ApiError.badRequest('Такая заявка отсусвует');
        };         

        const user = await User.findOne({where: { id : application.user_id }});
        const uesrDto = new UserDto(user);
        const link = `${process.env.API_URL}/api/${v4()}`;

        await Application.update({ ...reqBody, status: 'Resolved' }, { where: { id } });
        await MailService.sendActivationMail(uesrDto, link);
    };

    async findOne(id) {
        const application = await Application.findOne({ where: { id } });
        return application;
    };

    async getAll() {
        const applications = await Application.findAll();
        return applications;
    };

    async delete(id) {
        const deletedApplication = await Application.destroy({ where: { id } });
        return deletedApplication;
    }; 
};

export default new ApplicattionService();
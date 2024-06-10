import { Application, User } from "../models/models.js"; 
import { v4 } from 'uuid';
import MailService from '../service/MailService.js';
import UserService from '../service/UserService.js';
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
        const link = `${process.env.CLIENT_URL}/api/${v4()}`;

        await MailService.sendActivationMail(uesrDto, link, {... reqBody});
        await Application.update({ ...reqBody, status: 'Resolved' }, { where: { id } });

        const allApplication = this.getAll();
        return allApplication;
    };

    async findOne(id) {
        const application = await Application.findOne({ where: { id } });
        return application;
    };

    async getAll(sort, limit, page) {
        let checkSort = ['ASC', 'DESC'];
        let sortBy = [sort?.split(',')];

        if (sortBy.includes(undefined)) {
            sortBy = null;
        };

        if (sort?.split(',').length > 1 && !checkSort.includes(sort?.split(',')[1])) {
            throw ApiError.badRequest('Есть только ASC или DESC сортировка');
        };

        page = +page || 1;
        limit = +limit || 25;
        sort = sortBy || ['createdAt', 'ASC'];
        let offset = page * limit - limit;

        const users = await UserService.getAll();
        const applications = await Application.findAll({
            limit,
            offset,
            order: [ sort ],
        });

        const applicationsDto = applications.map(app => ({
            id: app.id,
            email: users.filter(u => u.id === app.user_id)[0]?.email,
            comment: app.comment,
            message: app.message,
            status: app.status,
            role: app.role,
            createdAt: app.createdAt,
        }));

        return applicationsDto;
    };

    async delete(id) {
        const deletedApplication = await Application.destroy({ where: { id } });
        return deletedApplication;
    }; 
};

export default new ApplicattionService();
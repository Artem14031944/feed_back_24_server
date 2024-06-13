import { Application, User } from "../models/models.js"; 
import { v4 } from 'uuid';
import ApplicationDto from "../dtos/applicationDto.js";
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

        const applicationsDto = this.getApplicationsDto(user_id);
        return applicationsDto;
    };

    async resolved(reqBody, id) {
        const application = await Application.findOne({where: { id }});
        if (!application) {
            throw ApiError.badRequest('Такая заявка отсусвует');
        };         

        const user = await User.findOne({ where: { id : application.user_id } });
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
        limit = +limit || 35;
        sort = sortBy || ['createdAt', 'ASC'];
        let offset = page * limit - limit;

        const users = await UserService.getAll();
        const applications = await Application.findAll({ limit, offset, order: [ sort ] });

        const applicationsDto = applications.map(app => new ApplicationDto(app, users));
        return applicationsDto;
    };

    async getЕheirApplications(user_id) {
        const applicationsDto = this.getApplicationsDto(user_id);
        return applicationsDto;
    };

    async delete(id) {
        const deletedApplication = await Application.destroy({ where: { id } });
        return deletedApplication;
    }; 

    async getApplicationsDto(user_id) {
        const applications = await Application.findAll({ where: { user_id } });
        const users = await UserService.getAll();

        const applicationsDto = applications.map(app => new ApplicationDto(app, users));
        return applicationsDto;
    };
};

export default new ApplicattionService();
import { validationResult } from 'express-validator';
import ApplicationService from '../service/ApplicationService.js';
import ApiError from '../error/ApiError.js'

class ApplicationController {
    async create(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest(errors.array().map(err => err.msg).join('\n')));
            };

            const { user_id, message, status } = req.body;
            const applications = await ApplicationService.create(user_id, message, status);
    
            return res.json({ message: 'Выполнено успешно', applications });
        } catch(err) {
            next(err);
        };
    };

    async resolved(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest(errors.array().map(err => err.msg).join('\n')));
            };
            const { id } = req.params;
            const applications = await ApplicationService.resolved(req.body, id);
    
            return res.json({ message: 'Выполнено успешно', applications });
        } catch (err) {
            next(err);
        };
    };

    async getAll(req, res, next) {
        try {
            let { sort, page, limit } = req.query;
            const applications = await ApplicationService.getAll(sort, limit, page);

            return res.json(applications);
        } catch (err) {
            next(err);
        };
    };

    async getЕheirApplications(req, res, next) {
        try {
            let { id } = req.params;
            const applications = await ApplicationService.getЕheirApplications(id);
            
            return res.json(applications);
        } catch (err) {
            next(err);
        };
    };

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const deletedApplication = await ApplicationService.delete(id);
            
            return res.json(deletedApplication);
        } catch(err) {
            next(err);
        };
    };
};

export default new ApplicationController();
import ApplicationService from '../service/ApplicationService.js';
import UserService from '../service/UserService.js';

class ApplicationController {
    async create(req, res, next) {
        try {
            const { user_id, message, status } = req.body;
            const ApplicationData = await ApplicationService.create(user_id, message, status);
    
            return res.json(ApplicationData);
        } catch(err) {
            next(err);
        };
    };

    async resolved(req, res, next) {
        try {
            const { id } = req.params;
            await ApplicationService.resolved(req.body, id);
    
            return res.json({ message: 'Заявка рассмотрена' });
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
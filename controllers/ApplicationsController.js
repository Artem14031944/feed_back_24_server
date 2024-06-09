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
            const applications = await ApplicationService.getAll();
            const users = await UserService.getAll();

            const applicationsDto = applications.map(app => ({
                id: app.id,
                email: users.filter(u => u.id === app.user_id)[0]?.email,
                comment: app.comment,
                message: app.message,
                status: app.status,
                role: app.role,
                createdAt: app.createdAt,
            }));
       
            return res.json(applicationsDto);
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
}

export default new ApplicationController();
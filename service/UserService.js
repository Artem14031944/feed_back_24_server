import { User } from  '../models/models.js';
import TokenService from './TokenService.js';
import ApiError from '../error/ApiError.js';
import UserDto from '../dtos/userDto.js';
import bcrypt from "bcrypt";

class UserService {
    async registration(email, name, role, password) {
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            throw ApiError.badRequest(`Пользователь с почтовым адресом ${email} уже есть`);
        };
       
        const hashPassword = await bcrypt.hash(password, 8);

        const user =  await User.create({ email, name, password: hashPassword, role });
        if (!user) {
            throw ApiError.badRequest('Не удалось создать пользователь');
        };
   
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({ ...userDto });
        if (!tokens) {
            throw ApiError.BadRequest('Не удалось сгенерировать токены');
        };

        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    };

    async login(email, password) {
        const user = await User.findOne({ where: { email }});
        if (!user) {
            throw ApiError.badRequest(`Пользователь ${email} не зарегистрирован`);
        };

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.badRequest('Неверный пороль или email');
        };

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({ ...userDto });
        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    };

    async refresh(refreshToken) {     
        if (!refreshToken) {
            throw ApiError.unauthorizedError();
        };

        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await TokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.unauthorizedError();   
        };

        const user = await User.findOne({ where: { id: userData.id } });
        const userDto = new UserDto(user);
        
        const tokens = TokenService.generateTokens({ ...userDto });
        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    };

    async findOne(email) {
        const user = await User.findOne({ where: { email } });
        return user;
    };

    async getAll() {
        const users = await User.findAll();
        return users;
    };

    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken);
        return token;
    };

    async delete(userId) {
        const deletedUser = User.destroy({ where: { id: userId } });
        return deletedUser;
    };
}

export default new UserService();
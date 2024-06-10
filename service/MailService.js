import nodemailer from 'nodemailer';
import ApiError from '../error/ApiError.js';

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        });
    };

    async sendActivationMail(user, link) {
        try {
            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to: user.email,
                subject: 'Ваша заявка расcмотренна',
                text: '',
                html: 
                `
                    <div>
                        <h1>Добрый день ${user.name}</h1>
                        <p>Ваша заявка расcмотренна, можете перейти по ссылке</p>
                        <a href="${link}">${link}</a>
                    </div>
                `
            });
        } catch (e) {
            throw ApiError.internal('Ошибка при отправки сообщение');
        }
    };
}

export default new MailService(); 
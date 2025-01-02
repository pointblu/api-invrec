import { HttpException, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { MESSAGE_RESPONSES } from 'domain/shared/message_errors';
import { EmailDataI } from 'infrastructure/rest/logger/interfaces/email-data.interface';
const { sendEmailLogger } = require('infrastructure/rest/logger/logger-email.service');
const sgMail = require('@sendgrid/mail');
jest.mock('@sendgrid/mail', () => ({
    setApiKey: jest.fn(),
    send: jest.fn().mockResolvedValue({}),
}));
describe('sendEmailLogger', () => {
    it('should send an email with the correct parameters', async () => {
        const email = 'test@example.com';
        const dataNotification = {
            app_name: 'TestApp',
            env: 'development',
            requestId: '12345',
            method: 'GET',
            url: 'http://example.com',
            body: { key: 'value' },
            params: { param: 'value' },
            query_params: { query: 'value' },
            response: { status: 'ok' },
            error_message: 'Error occurred',
            timestamp: new Date(),
            statusCode: 500,
            ip: '127.0.0.1',
        } as EmailDataI;

        const result = await sendEmailLogger(email, dataNotification);
        expect(result).toBe('Email sent');
        expect(sgMail.setApiKey).toHaveBeenCalledWith(process.env.SENDGRID_API_KEY);
        expect(sgMail.send).toHaveBeenCalledWith(expect.objectContaining({
            to: email,
            from: expect.anything(),
            subject: expect.any(String),
            html: expect.any(String),
        }));
    });
});
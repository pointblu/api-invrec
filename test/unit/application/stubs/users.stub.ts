import { MESSAGE_RESPONSES } from 'domain/shared/message_errors';
import { Users } from 'infrastructure/database/mapper/Users.entity';
export const userStub = {
    _id: '6f8d0a6d9d6d1d0a6d9d6d1d',
    name: 'Pepe Perez',
    role: 'user',
    email: 'pepe@email.com',
    password: '123456',
    salt: '123456',
    status: true,
    verificationCode: '1234567',
    recuperationCode: '1234367'
} as Users;
export const resultGenerateAccessToken = {
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBlcGVAZW1haWwuY29tIiwibmFtZSI6IlBlcGUgUGVyZXoiLCJfaWQiOiI2ZjhkMGE2ZDlkNmQxZDBhNmQ5ZDZkMWQiLCJpYXQiOjE3MDIyNjM1NDMsImV4cCI6MTcwMjM0OTk0M30.R8bFL1vSjcFiE7I1XeGmEToFzlIc7-uT-UYKXYFEKp8'
}
export const user2Stub = {
    _id: '6f8d0a6d9d6d1d0a6d2d6d1d',
    name: 'Juan Perez',
    role: 'user',
    email: 'juan@email.com',
    password: '123456',
    salt: '123456',
    status: true,
    verificationCode: '1234567',
    recuperationCode: '1234367'
} as Users;
export const userStub3 = {
    _id: '6f8d0a6d9d6d1d0a6d9d6d1d',
    name: 'Pepe Perez',
    role: 'user',
    email: 'pepe@email.com',
    password: '123456',
    salt: '123456',
    status: true,
    verificationCode: '1234567',
    recuperationCode: '1234367'
} as Users;
export const userSearchUpdateStub = {
    _id: '6f8d0a6d9d6d1d0a6d9d6d1c',
    name: 'Ana Perez',
    role: 'user',
    email: 'ana@email.com',
    password: '123456',
    salt: '123456',
    status: true,
    verificationCode: '1134567',
    recuperationCode: '1232367'
} as Users;
export const userUpdatedStub = {
    _id: '6f8d0a6d9d6d1d0a6d9d6d1d',
    email: 'newemail@example.com',
    name: 'John Doe',
    role: 'user',
    password: '123456',
    salt: '123456',
    status: true,
    verificationCode: '1234567',
    recuperationCode: '1234367'
} as Users;
export const userDeleteStub = {
    _id: '6f8d0a6d9d6d1d0a6d9d6d1d',
    message: MESSAGE_RESPONSES.USERS.USER_DELETED
}
export const userListStub = [
    {
        _id: '6f8d0a6d9d6d1d0a6d9d6d1d',
        name: 'Pepe Perez',
        role: 'user',
        email: 'pepe@email.com',
        password: '123456',
        salt: '123456',
        status: true,
        verificationCode: '1234567',
        recuperationCode: '1234367'
    },
    {
        _id: '6f8d0a6d9d6d1d0a6d9d6d1c',
        name: 'Ana Perez',
        role: 'user',
        email: 'ana@email.com',
        password: '123456',
        salt: '123456',
        status: true,
        verificationCode: '1134567',
        recuperationCode: '1232367'
    }
]

export const userListStubVM = {
    result: userListStub,
    pages: 1,
    count: 2
}

export const userMessageDeletedStub = { _id: '6f8d0a6d9d6d1d0a6d9d6d1d', message: MESSAGE_RESPONSES.USERS.USER_DELETED }
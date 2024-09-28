import { Response } from 'express';

type TResponse<T> = {
    success: boolean;
    message?: string;
    statusCode: number;
    token?: string;
    data?: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
    res.status(data?.statusCode).json({
        success: data.success,
        statusCode: data?.statusCode,
        message: data.message,
        token: data.token,
        data: data.data,
    });
};

export default sendResponse;
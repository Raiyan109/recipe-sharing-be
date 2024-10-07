import { Response } from 'express';

type TMeta = {
    total: number;
    currentPage: number;
    totalPages: number;
}

type TResponse<T> = {
    success: boolean;
    message?: string;
    statusCode: number;
    token?: string;
    data?: T;
    meta?: TMeta;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
    res.status(data?.statusCode).json({
        success: data.success,
        statusCode: data?.statusCode,
        message: data.message,
        token: data.token,
        data: data.data,
        meta: data.meta
    });
};

export default sendResponse;
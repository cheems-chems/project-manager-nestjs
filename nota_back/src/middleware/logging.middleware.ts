import { NextFunction, Request, Response } from "express";

export function loggerFunc(req: Request, res: Response, next: NextFunction) {
    const getData = () => {
        return new Date().toLocaleString('en-US', {
            timeZone: 'America/Bogota',
            dateStyle: 'short',    // Muestra la fecha en formato corto
            timeStyle: 'short'     // Muestra la hora en formato corto
        });
    };

    console.log(`${req.method} ${req.url} - Request time: ${getData()}`);
    next();
}

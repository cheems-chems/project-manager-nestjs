import { SetMetadata } from "@nestjs/common";

// Este decorador toma un número de roles y los asigna como metadatos
export const Roles = (...roles: string[])=> SetMetadata('roles', roles)
import { getConnection as getTypeConnection, createConnection } from "typeorm";

export const getConnection = () => getTypeConnection();
export const initConnection = async () => createConnection();

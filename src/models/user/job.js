import sql from "@/libs/database/sql";

export const list = async (locale) => sql`SELECT * FROM job WHERE locale = ${locale};`.execute();

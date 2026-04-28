import sql from "@/libs/database/sql";

export const list = async () => sql`SELECT * FROM job;`.execute();

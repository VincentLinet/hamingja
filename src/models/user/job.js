import sql from "@/libs/database/sql";

export const list = () => sql`SELECT * FROM job;`.execute();

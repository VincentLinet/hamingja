import sql from "@/libs/database/sql";

export const one = async (id) =>
  sql`SELECT *
    FROM rank
    WHERE id = ${id};`.execute(([rank]) => rank);

export const list = async () =>
  sql`SELECT *
    FROM rank;`.execute();

export const floor = async (experience) =>
  sql`SELECT *
    FROM rank
    WHERE experience <= ${experience}
    ORDER BY experience DESC
    LIMIT 1;`.execute(([rank]) => rank);

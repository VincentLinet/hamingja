import sql from "@/libs/database/sql";

export const one = (id) =>
  sql`SELECT *
    FROM rank
    WHERE id = ${id};`.execute(([rank]) => rank);

export const list = () =>
  sql`SELECT *
    FROM rank;`.execute();

export const floor = (experience) =>
  sql`SELECT *
    FROM rank
    WHERE experience <= ${experience}
    ORDER BY experience DESC
    LIMIT 1;`.execute(([rank]) => rank);

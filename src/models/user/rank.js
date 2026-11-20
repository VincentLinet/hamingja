import sql from "@/libs/database/sql";

export const one = async (id) =>
  sql`SELECT *
    FROM rank
    WHERE id = ${id};`.execute(([rank]) => rank);

export const list = async () =>
  sql`SELECT *
    FROM rank ORDER BY experience ASC;`.execute();

export const claim = async (id, user) =>
  sql`UPDATE rank
    SET pioneer = ${user}
    WHERE id = ${id}
      AND pioneer IS NULL;`.execute(({ affectedRows }) => affectedRows === 1);

export const floor = async (experience) =>
  sql`SELECT *
    FROM rank
    WHERE experience <= ${experience}
    ORDER BY experience DESC
    LIMIT 1;`.execute(([rank]) => rank);

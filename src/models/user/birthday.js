import sql from "@/libs/database/sql";

export const one = async (id) =>
  sql` SELECT *
    FROM birthday
    WHERE user = ${id};`.execute(([birthday]) => birthday);

export const list = async () =>
  sql` SELECT *
    FROM birthday;`.execute();

export const set = async (id, day, month, timezone) =>
  sql`
    INSERT INTO birthday (user, day, month, timezone)
    VALUES (${id}, ${day}, ${month}, ${timezone})
    ON DUPLICATE KEY UPDATE
      day = VALUES(day),
      month = VALUES(month),
      timezone = VALUES(timezone);`.execute();

export const remove = async (id) =>
  sql`DELETE FROM birthday WHERE user = ${id};`.execute(({ affectedRows }) => affectedRows > 0);

export const announce = async (id, year) =>
  sql`UPDATE birthday SET announced = ${year} WHERE user = ${id};`.execute();

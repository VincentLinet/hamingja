import sql from "@/libs/database/sql";

export const increase = async (id, experience, cooldown) =>
  sql`UPDATE user
      SET
        experience = experience + ${experience},
        updated = NOW()
      WHERE id = ${id}
        AND (
          updated IS NULL
          OR updated <= NOW() - INTERVAL ${cooldown} SECOND
        )`.execute();

export const get = async (id) =>
  sql`SELECT experience
      FROM user
      WHERE id = ${id};`.execute(([{ experience }]) => experience);

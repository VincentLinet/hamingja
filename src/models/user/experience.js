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

export const leaderboard = async (id) =>
  sql`SELECT rank
    FROM (
        SELECT
            id,
            DENSE_RANK() OVER (ORDER BY experience DESC) AS rank
        FROM user
    ) ranked
    WHERE id = ${id};`.execute(([{ rank }]) => rank);

export const page = async (size, offset, excluded) =>
  sql`SELECT
      id,
      experience,
      DENSE_RANK() OVER (ORDER BY experience DESC) AS position
    FROM user
    WHERE experience > 0
      AND id NOT IN (${excluded})
    ORDER BY experience DESC, id ASC
    LIMIT ${size} OFFSET ${offset};`.execute();

export const total = async (excluded) =>
  sql`SELECT COUNT(*) AS total
    FROM user
    WHERE experience > 0
      AND id NOT IN (${excluded});`.execute(([{ total }]) => total);

export const place = async (id, excluded) =>
  sql`SELECT position
    FROM (
        SELECT
            id,
            DENSE_RANK() OVER (ORDER BY experience DESC) AS position
        FROM user
        WHERE experience > 0
          AND id NOT IN (${excluded})
    ) ranked
    WHERE id = ${id};`.execute(([ranked]) => ranked?.position);

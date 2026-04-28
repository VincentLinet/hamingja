import sql from "@/libs/database/sql";

export const create = async (id) => sql`INSERT IGNORE INTO user (id) VALUES (${id})`.execute();

export const list = async () =>
  sql` SELECT *
    FROM user;`.execute();

export const bulk = async (users) =>
  sql`
    INSERT INTO user (id, experience)
    $VALUES
    ON DUPLICATE KEY UPDATE
      experience = VALUES(experience);`.bulk(users);

export const rank = async (id) =>
  sql`
    SELECT rank.id AS rank
    FROM user
    JOIN rank ON rank.experience = ( 
      SELECT MAX(experience)
      FROM rank
      WHERE experience <= user.experience
    )
      WHERE user.id = ${id};`.execute(([{ rank }]) => rank);

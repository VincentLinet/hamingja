import { jest } from "@jest/globals";

jest.unstable_mockModule("@/services/user/rank", () => ({ list: jest.fn() }));
jest.unstable_mockModule("@/services/user/job", () => ({ list: jest.fn() }));

const Action = await import("@/messages/hamingja");
const Pool = await import("@/services/hamingja/pool");

const CLASS_TITLES = [
  "Warrior",
  "Runeblade",
  "Hermit",
  "Shadow",
  "Skald",
  "Druid",
  "Witch",
  "Skytt",
  "Völva",
  "Brimseiðr",
  "Adventurer",
  "Galdin",
  "Merchant"
];

const member = (heldRoleIds) => ({ id: "member", roles: { cache: { has: (id) => heldRoleIds.includes(id) } } });

const guildWithRole = (roleId, members) => ({
  roles: { cache: { get: (id) => (id === roleId ? { members: new Map(members.map((m) => [m.id, m])) } : undefined) } }
});

describe("Pool.assigned (mocked data)", () => {
  const pools = { Classes: [{ title: "Warrior", actions: ["swings a sword"] }] };
  const jobs = [{ id: "warrior-role", title: "Warrior" }];

  it("returns the class pool's actions when the member holds that job", () => {
    expect(Pool.assigned(jobs, member(["warrior-role"]), pools)).toEqual(["swings a sword"]);
  });

  it("returns an empty array when the member holds no job at all", () => {
    expect(Pool.assigned(jobs, member([]), pools)).toEqual([]);
  });

  it("returns an empty array when the held job has no matching pool entry", () => {
    const orphanJobs = [{ id: "druid-role", title: "Druid" }];
    expect(Pool.assigned(orphanJobs, member(["druid-role"]), pools)).toEqual([]);
  });
});

describe("Pool.classmate (mocked data)", () => {
  const jobs = [{ id: "skald-role", title: "Skald" }];

  it("finds another member holding the requested job, case-insensitively", () => {
    const other = { id: "other", roles: { cache: { has: () => true } } };
    const guild = guildWithRole("skald-role", [other]);
    expect(Pool.classmate(jobs, guild, member(["skald-role"]), "skald")).toBe(other);
  });

  it("excludes the mentioning member themself from the candidates", () => {
    const self = member(["skald-role"]);
    const guild = guildWithRole("skald-role", [self]);
    expect(Pool.classmate(jobs, guild, self, "skald")).toBeNull();
  });

  it("returns null when nobody holds that job", () => {
    const guild = guildWithRole("skald-role", []);
    expect(Pool.classmate(jobs, guild, member([]), "skald")).toBeNull();
  });

  it("returns null when the requested class doesn't exist in the job list", () => {
    const guild = guildWithRole("skald-role", [{ id: "other", roles: { cache: { has: () => true } } }]);
    expect(Pool.classmate(jobs, guild, member([]), "druid")).toBeNull();
  });
});

describe("Class content wiring (real messages/hamingja data)", () => {
  it.each(["english", "french"])("every class title resolves to a non-empty pool in %s", (locale) => {
    const pools = Action.load(locale);

    CLASS_TITLES.forEach((title) => {
      const jobs = [{ id: "role", title }];
      const actions = Pool.assigned(jobs, member(["role"]), pools);

      expect(actions.length).toBeGreaterThan(0);
      actions.forEach((line) => expect(typeof line).toBe("string"));
    });
  });
});

const { FRENCH } = process.env;

export const of = (channel) => (channel === FRENCH ? "french" : "english");

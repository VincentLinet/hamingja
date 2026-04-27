import * as Base from "@/templates/base";
import Data from "@/messages/job";

const color = 0x0099ff;

export const build = (props) => {
  const { title = "", description = "" } = Data;
  const template = { color, title, description, ...props };
  return Base.message(template);
};

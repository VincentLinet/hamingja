import * as Message from "@/services/message.js";

const color = 0x0099ff;

const content = (fields) => [Message.space, ...fields, Message.space];

export const message = ({ fields = [], ...props }) => {
  const template = {
    color,
    fields: fields.length > 0 ? content(fields) : [],
    ...props
  };
  return Message.build(template);
};

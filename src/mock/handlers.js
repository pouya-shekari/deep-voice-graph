import { action } from "./api/action";
import { login } from "./api/login";

export const handlers = [...login, ...action];

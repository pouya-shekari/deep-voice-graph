import { action } from "./api/action";
import {checker} from './api/checker';
import { login } from "./api/login";
import { question } from "./api/question";

export const handlers = [...login, ...action, ...question];

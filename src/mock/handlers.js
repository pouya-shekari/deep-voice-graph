import { action } from "./api/action";
import {announcement} from "./api/announcement";
import {checker} from './api/checker';
import { login } from "./api/login";
import { question } from "./api/question";
import {flow} from "./api/flow";

export const handlers = [...login, ...action, ...question , ...checker , ...announcement , ...flow];

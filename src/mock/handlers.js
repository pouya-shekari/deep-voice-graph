import { action } from "./api/action";
import {checker} from './api/checker';
import { login } from "./api/login";

export const handlers = [...login, ...action , ...checker ];

/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as functions_classroom from "../functions/classroom.js";
import type * as functions_grade from "../functions/grade.js";
import type * as functions_schedule from "../functions/schedule.js";
import type * as functions_student from "../functions/student.js";
import type * as functions_subject from "../functions/subject.js";
import type * as functions_teacher from "../functions/teacher.js";
import type * as functions_user from "../functions/user.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "functions/classroom": typeof functions_classroom;
  "functions/grade": typeof functions_grade;
  "functions/schedule": typeof functions_schedule;
  "functions/student": typeof functions_student;
  "functions/subject": typeof functions_subject;
  "functions/teacher": typeof functions_teacher;
  "functions/user": typeof functions_user;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

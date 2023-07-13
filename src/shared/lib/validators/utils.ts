import { RuleObject } from "antd/es/form";
import { ValidationResult, Validator } from "./types";

type ValidationResultWithString = ValidationResult | string | Promise<string>;

export function createValidator<T>(fn: (v: T) => ValidationResultWithString): Validator<T> {
  return async (value: T) => {
    const result = await fn(value);

    if (typeof result === "string") {
      return [result];
    }

    return result;
  };
}

export function createAntdValidator<T>(fn: Validator<T>) {
  return async (_: RuleObject, value: T) => {
    const result = await fn(value);

    if (!result) {
      return Promise.resolve();
    } else {
      return Promise.reject(result[0]);
    }
  };
}

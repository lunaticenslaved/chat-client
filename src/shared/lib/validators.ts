import { Validation } from "@lunaticenslaved/schema";
import { RuleObject } from "antd/es/form";

export function createAntdValidator<T>(fn: Validation.Validator<T>) {
  return async (_: RuleObject, value: T) => {
    const result = await fn(value);

    if (!result) {
      return Promise.resolve();
    } else {
      return Promise.reject(result[0]);
    }
  };
}

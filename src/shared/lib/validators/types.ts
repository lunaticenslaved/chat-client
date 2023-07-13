// eslint-disable-next-line @typescript-eslint/no-explicit-any

export type ValidationResult = string[] | null;

export type Validator<T> = (value: T) => Promise<ValidationResult>;

export const slugify = (str: string) => {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

export const slugifyAll = (arr: string[]) => arr.map((str) => slugify(str));

type ClassValue =
  | string
  | ClassDictionary
  | ClassArray
  | ((...args: any[]) => string)
  | undefined
  | null
  | boolean;

interface ClassDictionary {
  [id: string]: any;
}

interface ClassArray extends Array<ClassValue> {}

export function cn(...inputs: ClassValue[]): string {
  return inputs
    .reduce<ClassArray>((result, input) => {
      if (typeof input === "string" && input.length > 0) {
        result.push(input);
      } else if (Array.isArray(input)) {
        result.push(cn(...input));
      } else if (typeof input === "object" && input !== null) {
        Object.entries(input).forEach(([key, value]) => {
          if (value) result.push(key);
        });
      } else if (typeof input === "function") {
        result.push(input());
      }
      return result;
    }, [])
    .filter(Boolean)
    .join(" ");
}

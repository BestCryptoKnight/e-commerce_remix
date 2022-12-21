export const env = {
  NODE_ENV: getEnvValue("NODE_ENV"),
  API_URL: getEnvValue("API_URL"),
};

export type ENV = typeof env;

function getEnvValue(name: string): string {
  return typeof process !== "undefined"
    ? (process.env?.[name] as string)
    : (window?.ENV?.[name as keyof typeof env] as string);
}

declare global {
  interface Window {
    ENV: typeof env;
  }
}

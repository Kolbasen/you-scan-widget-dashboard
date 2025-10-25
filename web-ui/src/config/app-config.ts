type AppConfig = {
  apiUrl: string;
};

export const appConfig: AppConfig = {
  apiUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api',
};

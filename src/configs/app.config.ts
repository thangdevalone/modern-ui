export type AppConfig = {
  apiUrl?: string;
};

export const APP_CONFIG: AppConfig = {
  apiUrl: process.env.NEXT_PUBLIC_DOMAIN,
};

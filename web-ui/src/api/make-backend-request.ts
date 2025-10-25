import { appConfig } from '@/config/app-config';

export const makeBackendRequest = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const response = await fetch(`${appConfig.apiUrl}/${url}`, {
    ...(options ?? {}),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const errorBody = await response.json();

    throw new Error(errorBody.message ?? 'An error occurred while making the backend request');
  }

  const data: T = await response.json();

  return data;
};

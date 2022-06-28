export const fetchUserData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  return await response.json();
};

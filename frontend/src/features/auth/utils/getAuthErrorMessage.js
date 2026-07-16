export const getAuthErrorMessage = (err) => {
  const data = err.response?.data;

  if (data?.message) return data.message;
  if (data?.err) return data.err;
  if (Array.isArray(data?.error) && data.error[0]?.msg) return data.error[0].msg;
  if (Array.isArray(data?.errors) && data.errors[0]?.msg) return data.errors[0].msg;

  return "An error occurred";
};

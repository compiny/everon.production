export default defineEventHandler(async (event) => {
  deleteCookie(event, 'auth-token', {
    path: '/',
    httpOnly: true
  });
  
  return {
    success: true,
    message: 'Logged out successfully'
  };
});
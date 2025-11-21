export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);
  
  if (username === 'admin' && password === 'admin') {
    setCookie(event, 'auth-token', 'authenticated', {
      path: '/',
      httpOnly: true
    });
    
    return {
      success: true,
      user: { id: 1, username: 'admin', isAdmin: true }
    };
  }
  
  throw createError({
    statusCode: 401,
    message: 'Неверные учетные данные'
  });
});
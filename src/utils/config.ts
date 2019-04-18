// OAuth App
const config = {
    'oauth_uri': "https://github.com/login/oauth/authorize",
    'redirect_uri': '',
    'client_id': '',
    'client_secret': '',
  };
  
  // 本地开发环境
  if (process.env.NODE_ENV === 'development') {
    config.redirect_uri = "http://localhost:3001/"
    config.client_id = "1f99912897fca2ee4a6b"
    config.client_secret = "ac465928689128a8588c09d637e025d2ef360414"
  }
  export default config; 
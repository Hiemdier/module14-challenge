import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token);
      return decodedToken;
    }
    return null;
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token);
      return !!decodedToken && !this.isTokenExpired(token);
    }
    return false;
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    const decoded = jwtDecode(token);
    const expTime = decoded.exp as number;
    const currentTime = Math.floor(Date.now()/1000);

    return expTime < currentTime;
  }

  getToken(): string {
    // TODO: return the token
     const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

    // TODO: remove the token from localStorage
    // TODO: redirect to the login page
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/'); // Redirect to the home page because the login page continues to show that it cannot get to the login page.
  }
}

export default new AuthService();

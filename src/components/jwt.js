import jwtDecode from 'jwt-decode';

const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false;
    }
    else {
        const decoded = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;
        return decoded.exp > currentTime;
    }

};


export { isValidToken };
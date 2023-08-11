import jwt from 'jwt-decode';

export const jwtDecoder = (token) => {
    const decodedToken = jwt(token);
    return decodedToken;
};

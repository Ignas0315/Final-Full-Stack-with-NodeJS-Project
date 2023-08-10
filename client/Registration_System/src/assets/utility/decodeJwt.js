import jwt from 'jwt-decode';

export const jwtDecoder = (token) => {
    console.log(token);
    const decodedToken = jwt(token);
    return decodedToken;
};

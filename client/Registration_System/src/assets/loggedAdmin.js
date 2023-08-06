import { getAdminById } from '../api/admin-api';
import { getCookieValue } from './getCookieValue';

export const loggedAdmin = async () => {
    try {
        const res = await getAdminById(getCookieValue('id'));
        return res.data[0];
    } catch (err) {
        console.log(err);
    }
};

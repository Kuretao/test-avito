import api from './apiAxios.js';

export const getPartnerData = () => api.get('/partner_data');

export const getActs = () => api.get('/act');

export const sendAgreement = () => {
    return api.post("/switch", {});
};
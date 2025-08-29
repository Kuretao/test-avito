import api from './apiAxios.js';

export const getPartnerData = () => api.get('/partner_data');

export const getActs = () => api.get('/act');

export const sendAgreement = () => {
    return api.post("/switch", {});
};

export const zapros_na_vyplaty = (data) => {
    console.log('[zapros_na_vyplaty] sending data:', data);
    return api.post('/zapros_na_vyplaty', data);
};

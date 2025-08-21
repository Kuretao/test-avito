import api from './apiAxios.js';

export const getPartnerData = () => api.get('/partner_data');

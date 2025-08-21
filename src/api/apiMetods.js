import api from './apiAxios.js';

export const getPartnerData = () => api.get('/partner_data');

export const getPayedData = () => api.get('/');

export const getReferralsData = () => api.get('/');

export const getRegisterData = () => api.get('/');
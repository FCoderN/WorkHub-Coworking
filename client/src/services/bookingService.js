import api from './api';

export const createBooking   = (data)   => api.post('/bookings', data);
export const getMyBookings   = ()       => api.get('/bookings/mine');
export const cancelBooking   = (id)     => api.patch(`/bookings/${id}/cancel`);
export const checkAvailability = (params) => api.get('/bookings/availability', { params });

const BASE_URL = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api' : '/api');
export class ApiError extends Error {
    constructor(message, status = 0) { super(message); this.name = 'ApiError'; this.status = status; }
}
async function request(url, options) {
    let response;
    try { response = await fetch(url, options); }
    catch { throw new ApiError('Could not connect to server. Please check your connection.'); }
    let data;
    try { data = await response.json(); }
    catch { throw new ApiError('The server returned an invalid response.', response.status); }
    if (!response.ok || data.success === false) throw new ApiError(data.message || 'Request failed', response.status);
    return { json: async () => data };
}

const api = {
    register: async (name, email, password, confirmPassword) => {
        const res = await request(BASE_URL + '/auth/register', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, confirmPassword })
        });
        return res.json();
    },
    // Analytics - public
    getSummary: async () => {
        const res = await request(`${BASE_URL}/analytics/summary`);
        return res.json();
    },

    getHotspots: async (threshold = 1) => {
        const res = await request(`${BASE_URL}/analytics/hotspots?threshold=${threshold}`);
        return res.json();
    },

    getCasesByLocation: async () => {
        const res = await request(`${BASE_URL}/analytics/by-location`);
        return res.json();
    },

    getCasesOverTime: async () => {
        const res = await request(`${BASE_URL}/analytics/over-time`);
        return res.json();
    },

    // Reports - public
    getReports: async (params = '') => {
        const res = await request(`${BASE_URL}/reports${params}`);
        return res.json();
    },

    // Prediction - public
    getPrediction: async (city) => {
        const res = await request(`${BASE_URL}/prediction?city=${encodeURIComponent(city)}`);
        return res.json();
    },

    getAllCityRisks: async () => {
        const res = await request(`${BASE_URL}/prediction/cities`);
        return res.json();
    },

    getBarangayRisk: async (city, barangay, district = '') => {
        const params = new URLSearchParams({ city, barangay, ...(district && { district }) });
        const res = await request(`${BASE_URL}/prediction/barangay?${params}`);
        return res.json();
    },

    getDistrictRisk: async (city, district) => {
        const params = new URLSearchParams({ city, district });
        const res = await request(`${BASE_URL}/prediction/district?${params}`);
        return res.json();
    },

    getProvincePredictions: async () => {
        const res = await request(`${BASE_URL}/prediction/provinces`);
        return res.json();
    },

    // Admin auth
    login: async (email, password) => {
        const res = await request(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        return res.json();
    },

    // Admin protected
    createReport: async (data, token) => {
        const res = await request(`${BASE_URL}/reports`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return res.json();
    },

    updateReport: async (id, data, token) => {
        const res = await request(`${BASE_URL}/reports/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return res.json();
    },

    deleteReport: async (id, token) => {
        const res = await request(`${BASE_URL}/reports/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return res.json();
    }
};

export default api;
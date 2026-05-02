const BASE_URL = 'http://localhost:3001/api';

const api = {
    // Analytics - public
    getSummary: async () => {
        const res = await fetch(`${BASE_URL}/analytics/summary`);
        return res.json();
    },

    getHotspots: async (threshold = 1) => {
        const res = await fetch(`${BASE_URL}/analytics/hotspots?threshold=${threshold}`);
        return res.json();
    },

    getCasesByLocation: async () => {
        const res = await fetch(`${BASE_URL}/analytics/by-location`);
        return res.json();
    },

    getCasesOverTime: async () => {
        const res = await fetch(`${BASE_URL}/analytics/over-time`);
        return res.json();
    },

    // Reports - public
    getReports: async (params = '') => {
        const res = await fetch(`${BASE_URL}/reports${params}`);
        return res.json();
    },

    // Admin auth
    login: async (email, password) => {
        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        return res.json();
    },

    // Admin protected
    createReport: async (data, token) => {
        const res = await fetch(`${BASE_URL}/reports`, {
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
        const res = await fetch(`${BASE_URL}/reports/${id}`, {
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
        const res = await fetch(`${BASE_URL}/reports/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return res.json();
    }
};

export default api;
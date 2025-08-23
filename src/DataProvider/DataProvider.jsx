import React, { createContext, useState, useEffect, useContext } from 'react';
import {getPartnerData} from "../api/apiMetods.js";

const DataContext = createContext();

export function DataProvider({ children }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getPartnerData()
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                setError(err);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <DataContext.Provider value={{ data, loading, error }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    return useContext(DataContext);
}

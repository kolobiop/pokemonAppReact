// src/components/TypeFilter.js
import React, { useEffect, useState } from 'react';
import { fetchTypes } from '../api';

const TypeFilter = ({ onTypeSelect }) => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTypes = async () => {
      try {
        const data = await fetchTypes();
        setTypes(data.results || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching types:", error);
        setError(error);
        setLoading(false);
      }
    };
    getTypes();
  }, []);

  if (loading) {
    return <div className="type-filter-loading">Loading...</div>;
  }

  if (error) {
    return <div className="type-filter-error">Error loading types: {error.message}</div>;
  }

  return (
    <div className="type-filter-container">
      <select className="type-filter" onChange={(e) => onTypeSelect(e.target.value)}>
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TypeFilter;

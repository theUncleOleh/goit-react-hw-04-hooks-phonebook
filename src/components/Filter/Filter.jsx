import React from 'react';
import s from './Filter.module.css';

export default function Filter({ value, onChange }) {
  return (
    <label htmlFor="" className={s.label}>
      Filter
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={s.input}
      />
    </label>
  );
}

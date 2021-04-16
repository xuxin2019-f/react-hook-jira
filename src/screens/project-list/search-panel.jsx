import React, { useState, useEffect } from "react";
export const SearchPanel = ({ users, param, setParam }) => {
  return (
    <form action="">
      <input
        type="text"
        value={param.name}
        // 相当于evt => setParam(Object.assign({},{name: evt.target.value}))
        onChange={(evt) => setParam({ ...param, name: evt.target.value })}
      />
      <select
        value={param.personId}
        onChange={(evt) => setParam({ ...param, personId: evt.target.value })}
      >
        <option value="">负责人</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </form>
  );
};

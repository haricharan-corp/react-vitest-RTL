"use client";
import React, { useState } from "react";

export default function UserManagementDashboard() {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@example.com" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    const newUser = {
      id: Date.now(),
      name,
      email,
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);
    setName("");
    setEmail("");
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>User Management</h1>

      {/* Button to trigger modal */}
      <button type="button" onClick={() => setIsModalOpen(true)}>
        Add New User
      </button>

      {/* Users Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div role="dialog" aria-labelledby="modal-title">
          <h2 id="modal-title">Create User</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="full-name">Full Name</label>
              <input
                id="full-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="email-address">Email Address</label>
              <input
                id="email-address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit">Submit</button>
            <button type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

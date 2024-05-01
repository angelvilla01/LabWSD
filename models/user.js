// models/User.js

import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('notes.db');

export class UserModel {
  
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  static getAllUsers = () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };

  static create = (username, password) => {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };

  static findByUsername = (username) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  };

  static deleteById = (id) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM users WHERE id = ?', [id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };

  static getUsernameById = (id) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT username FROM users WHERE id = ?', [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row.username);
        }
      });
    });
  }
}

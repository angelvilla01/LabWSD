// models/User.js

import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('notes.db');

export class UserModel {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  static create(username, password, callback) {
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], callback);
  }

  static findByUsername(username, callback) {
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      if (err) return callback(err);
      callback(null, row);
    });
  }

  static deleteByUsername(username, callback) {
    db.run('DELETE FROM users WHERE username = ?', [username], callback);
  }
}


import sqlite3 from 'sqlite3';

// Conexión a la base de datos SQLite (archivo local)
const db = new sqlite3.Database('notes.db');

export class FriendshipModel {

    static checkIfAlreadyRequested = async (senderId, receiverId) => {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM Friendships WHERE user1 = ? AND user2 = ? AND status = "pending"', [senderId, receiverId], (err, row) => {
                if (err) {
                    reject(err);
                } else if (row) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

    static getFriendshipsOfUser = async (userId) => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM Friendships WHERE user1 = ? OR user2 = ? AND status = "accepted"', [userId, userId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        }
        );
    };

    static sendRequest = async (senderId, receiverId, type, senderUsername) => {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO Friendships (user1, user2) VALUES (?, ?)', [senderId, receiverId], (err) => {
                if (err) {
                    reject(err);
                } else {
                    db.run('INSERT INTO Notifications (user, type, senderUsername) VALUES (?, ?, ?)', [receiverId, type, senderUsername], (err) => {
                        if (err) {
                            reject(err);
                        } else {

                            resolve();
                        }
                    });
                }
            });
        }
        );
    };

    static getAllFriendsOfUser = async (userId) => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM Friendships WHERE (user2 = ? OR user1 = ?) AND status = "accepted"', [userId, userId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    };

    static acceptRequest = async (senderId, receiverId) => {
        return new Promise((resolve, reject) => {
            db.run('UPDATE Friendships SET status = "accepted" WHERE user1 = ? AND user2 = ?', [senderId, receiverId], (err) => {
                if (err) {
                    reject(err);
                } else {
                    db.run('DELETE FROM Notifications WHERE user = ? AND type = "friend_request"', [receiverId], (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    }
                    );
                }
            });
        });
    };

    static rejectRequest = async (senderId, receiverId) => {
        return new Promise((resolve, reject) => {
            db.run('UPDATE Friendships SET status = "rejected" WHERE user1 = ? AND user2 = ?', [senderId, receiverId], (err) => {
                if (err) {
                    reject(err);
                } else {
                    db.run('DELETE FROM Notifications WHERE user = ? AND type = "friend_request"', [receiverId], (err) => {
                        if (err) {
                            reject(err);
                        } else {
                        resolve();
                        }
                    }
                );
            }
        });
    });
};

    static getAllRequestsOfUser = async (userId) => {
        return new Promise((resolve, reject) => {

            const sql = `SELECT Notifications.*, Friendships.user1 AS sender_user 
            FROM Notifications 
            JOIN Friendships ON Notifications.user = Friendships.user2 
            WHERE Friendships.user2 = ? 
            AND Friendships.status = "pending"
            AND Notifications.type = "friend_request"`;

            db.all(sql, [userId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    };

    static deleteFriend = async (userId, friendId) => {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM Friendships WHERE (user1 = ? AND user2 = ?) OR (user1 = ? AND user2 = ?)', [userId, friendId, friendId, userId], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        }
        );
    };
}

// controllers/userController.js

import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.js';

export const userController = {

    register: async (req, res) => {

        const { username, password } = req.body;
        console.log(username, password);
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) throw err;
            UserModel.create(username, hashedPassword, (err) => {
                if (err) throw err;
                req.session.user = { username, password: hashedPassword };
                res.redirect('/notes');
            });
        });
    },

    login: async (req, res) => {
        const { username, password } = req.body;
        UserModel.findByUsername(username, (err, user) => {
            if (err) throw err;
            if (!user) {
                res.render('login', { error: 'User not found' });
            } else {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result) {
                        req.session.user = user;
                        res.redirect('/notes');
                    } else {
                        res.render('login', { error: 'Wrong password!' });
                    }
                });
            }
        });
    },

    logout: async (req, res) => {
        req.session.destroy();
        res.redirect('/users/login');
    },

    delete: async (req, res) => {
        const { username } = req.session.user;
        UserModel.deleteByUsername(username, (err) => {
            if (err) throw err;
            req.session.destroy();
            res.redirect('/users/login');
        });
    },
};
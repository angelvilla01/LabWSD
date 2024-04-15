// controllers/userController.js

import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.js';

export const userController = {

    register: async (req, res) => {

        const { username, password } = req.body;
        console.log(username, password);

        UserModel.findByUsername(username, (err, existingUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }

            if (existingUser) {
                res.render('register', { errorMessage: '[!] User already exists' });
                return;
            }

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) throw err;
            UserModel.create(username, hashedPassword, (err) => {
                if (err) throw err;
                req.session.user = { username, password: hashedPassword };
                res.redirect('/notes');
            });
        });
    });
    },

    login: async (req, res) => {
        const { username, password } = req.body;
        UserModel.findByUsername(username, (err, user) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
    
            if (!user) {
                res.render('login', { errorMessage: '[?] User not found' });
                return;
            }
    
           
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                    return;
                }
    
                if (result) {
                   
                    req.session.user = user;
                    res.redirect('/notes');
                } else {
                    
                    res.render('login', { errorMessage: '[!] Wrong password!' });
                }
            });
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
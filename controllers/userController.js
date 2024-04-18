// controllers/userController.js

import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { UserModel } from '../models/user.js';


export const userController = {

    getAllUsers: async (req, res) => {
        try {
            const users = await UserModel.getAllUsers();
            console.log(users);
            res.render('users', { users });
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    },

    postUser: async (req, res) => {
        const { username, password } = req.body;
        console.log(username, password);

        UserModel.findByUsername(username, (err, existingUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }

            if (existingUser) {
                res.render('createUserFromAdmin', { errorMessage: '[!] User already exists' });
                return;
            }

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) throw err;
            UserModel.create(username, hashedPassword, (err) => {
                if (err) throw err;
                
                res.redirect('/users/allUsers');
            });
        });
    });
    },
        


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
                const userToken = uuidv4();
                req.session.user = { username, userToken };
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
                    const userToken = uuidv4();
                    req.session.user = {username, userToken};
                    if (username == "admin")
                    {
                        res.redirect('/users/management');
                    } 
                    else {
                        res.redirect('/notes');
                    }
                   
                    
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
        const userId = req.params.userId;
        UserModel.deleteById(userId, (err) => {
            if (err) throw err;
            req.session.destroy();
            res.redirect('/users/allUsers');
        });
    },
};
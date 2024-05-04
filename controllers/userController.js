// controllers/userController.js

import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { UserModel } from '../models/user.js';
import { notesController } from '../controllers/notesController.js';

export const userController = {

    getIdByUsername: async (username) => {
        const user = await UserModel.findByUsername(username);
        return user.id;
    },

    getAllUsers: async (_req, res) => {
        try {
            const users = await UserModel.getAllUsers();
            const usersWithoutAdmin = users.filter(user => user.username !== 'admin');
            res.render('users', { usersWithoutAdmin });
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    },

    postUser: async (req, res) => {
        const { username, password } = req.body;

        try {
            const existingUser = await UserModel.findByUsername(username);
            if (existingUser) {
                res.render('createUserFromAdmin', { errorMessage: '[!] User already exists' });
                return;
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            await UserModel.create(username, hashedPassword);
            res.redirect('/users/allUsers');
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    },

    register: async (req, res) => {
        const { username, password } = req.body;

        try {
            const existingUser = await UserModel.findByUsername(username);
            if (existingUser) {
                res.render('register', { errorMessage: '[!] User already exists' });
                return;
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            await UserModel.create(username, hashedPassword);
            const userToken = uuidv4();
            req.session.user = { username, userToken };
            res.redirect('/notes/NoteCollections');
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    },

    login: async (req, res) => {
        const { username, password } = req.body;

        try {
            const user = await UserModel.findByUsername(username);
            if (!user) {
                res.render('login', { errorMessage: '[?] User not found' });
                return;
            }

            const result = await bcrypt.compare(password, user.password);
            if (result) {
                const userToken = uuidv4();
                req.session.user = { username, userToken };
                if (username == "admin") {
                    res.render('user-management');
                } else {
                    res.render('NoteCollections', { username });
                }
            } else {
                res.render('login', { errorMessage: '[!] Wrong password!' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    },

    logout: async (req, res) => {
        req.session.destroy();
        res.redirect('/users/login');
    },

    delete: async (req, res) => {
        const userId = req.params.userId;
        const username = req.body.username;

        try {
            await notesController.deleteAllNotes(username);
            await UserModel.deleteById(userId);
            res.redirect('/users/allUsers');
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    },
};

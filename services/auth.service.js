import { User } from '../models/index.js';
import userService from "./user.service.js";
import jwtService from './jwt.service.js';
import { verifyPassword } from '../utils/hash.js';

const authService = {
    register: async (username, email, password, photo) => {
        const result = await userService.createUser(
            username,
            email,
            password,
            photo
        );

        return result;
    },
    login: async (username, password) => {
        try {
            const user = await User.findOne(
                {
                    attributes: ['id', 'username', 'email', 'password', 'photo'], 
                    where: { username } 
                }
            );

            if(!user) throw new Error("User doesn't exist.");

            const verifiedPassword = await verifyPassword(password, user.password);

            if(username != user.username || !verifiedPassword) throw new Error("Username or password wrong.");

            const token = jwtService.generateToken({ id: user.id });

            return token;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getUserLogin: async (id) => {
        try {
            const user = await User.findByPk(id, 
                {
                    attributes: ['username', 'email', 'photo']
                }
            );

            if(user == null) throw new Error("User not found.");
            
            console.log(user);

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default authService;
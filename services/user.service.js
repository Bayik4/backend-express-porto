import { User } from "../models/index.js";
import { hashPassword } from '../utils/hash.js';

const userService = {
    createUser: async (username, email, password, photo) => {
        try {
            const hashedPassword = await hashPassword(password);

            if(!hashPassword) throw new Error("hash error");
    
            const result = await User.create({ 
                username, 
                email, 
                password: hashedPassword, 
                photo 
            });

            if(!result) throw new Error("result error")
    
            return result;  
        } catch (error) {   
            throw new Error(error.message);
        }
    },
    updateUser: async (id, username, email, password, photo) => {
        const result = await User.update(
            {
                username,
                email,
                password,
                photo
            },
            {
                where: { id }
            }
        );

        return result;
    }
}

export default userService;
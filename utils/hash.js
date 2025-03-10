import bcrypt from 'bcrypt';

const saltRounds = 10;

const hashPassword = async (passwordPlain) => {
    try {
        return await bcrypt.hash(passwordPlain, saltRounds);
    } catch (error) {
        throw new Error("Hashing password error:", error.message);
    }
}

const verifyPassword = async (passwordPlain, hashedPassword) => {
    return await bcrypt.compare(passwordPlain, hashedPassword);
}

export { hashPassword, verifyPassword };
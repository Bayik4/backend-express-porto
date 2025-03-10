import authService from "../services/auth.service.js";
import Response from "../utils/response.js";

const authController = {
    register: async (req, res) => {
        try {
            const {
                username,
                email,
                password,
                photo
            } = req.body;

            const result = await authService.register(
                username,
                email,
                password,
                photo
            );

            return Response(res, 201, "Register user successfully.", result);
        } catch (error) {
            return Response(res, 400, "Register user failed.", null, [error.message]);
        }
    },
    loginUser: async (req, res) => {
        try {
            const { username, password } = req.body;

            const token =  await authService.login(username, password);

            return Response(res, 200, "Login successfully.", { token });
        } catch (error) {
            return Response(res, 403, "Login failed.", null, [error.message]);
        }
    },
    profileUser: async (req, res) => {
        try {
            const { user: { payload: { id } } } = req;

            const profile = await authService.getUserLogin(id);

            return Response(res, 200, "Get profile successfully.", profile);
        } catch (error) {
            return Response(res, 403, "Get profile failed.", null, [error.message]);
        }
    }
}

export default authController;
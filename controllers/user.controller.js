import userService from "../services/user.service.js";
import Response from "../utils/response.js";

const userController = {
    create: async (req, res) => {
        const { 
            username,
            email,
            password,
            photo
        } = req.body;

        const result = await userService.create(
            username,
            email,
            password,
            photo
        );

        return Response(res, 201, "Create user successfully.", result);
    },
    update: async (req, res) => {
        const { decodedToken: { id } } = req;
        const { 
            username,
            email,
            password,
            photo
        } = req.body;

        const result = await userService.updateUser(
            id,
            username,
            email,
            password,
            photo
        )

        return Response(res, 200, "Update user successfully.", result);
    }
}

export default userController;
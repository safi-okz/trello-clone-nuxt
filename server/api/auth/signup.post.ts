import { Validator } from "#nuxt-server-utils";
import SignupSchema from "../../../schemas/Signup.schema";
import { user } from '../../models/User.model';

export default defineEventHandler(async(event) => {
    const body = await readBody(event);
    
    Validator.validateSchema(SignupSchema, body);

    const User = await user.create(body);
    return User;
});
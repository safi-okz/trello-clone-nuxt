import { z } from 'zod';

export default z.object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfrim: z.string().min(8)
}).refine(data => data.password === data.passwordConfrim, {
    message: 'Password and confirm password are not same',
    path: ['passwordConfrim']
});
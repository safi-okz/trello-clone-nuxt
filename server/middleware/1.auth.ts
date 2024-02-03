import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
        const session = await getServerSession(event);

        console.log('session ', session);

        const protectedRoutes = ['/api/users', '/api/boards', '/api/lists'];

        const isProtectedRoute = protectedRoutes.some(route => getRequestURL(event).pathname.startsWith(route))

        if(!isProtectedRoute){
            return;
        }

        if(!session){
            throw createError({
                statusCode: 401,
                statusMessage: "Unauthenticated",
                message: "You must be loged in to access these resources"
            })
        }

        event.context.user = session.user;
        return 'Hello '
})
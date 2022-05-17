export default {
    openapi: '3.0.0',
    info: {
        title: 'Recados API',
        version: '2.0.0',
    },
    components: {
        schemas: {
            auth: {
                type: 'object',
                properties: {
                    login: {
                        type: 'string',            
                    },
                    password: {
                        type: 'string',                  
                    },
                },
            },
        },
    },
    paths: {
        '/login': {
            summary: 'Login route',
            post: {
                summary: 'Login route',
                description: 'Route for login',
                tags: ['Auth'],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/auth',
                            },
                        },
                        required: true,
                    },
                },
                responses: {
                    description: 'ds',
                },
            },
        },
    },
};

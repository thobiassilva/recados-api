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
            createMessageParams: {
                type: 'object',
                properties: {
                    title: {
                        type: 'string',
                    },
                    detail: {
                        type: 'string',
                    },
                },
            },
            message: {
                type: 'object',
                properties: {
                    uid: {
                        type: 'string',
                    },
                    title: {
                        type: 'string',
                    },
                    detail: {
                        type: 'string',
                    },
                    userUid: {
                        type: 'string',
                    },
                    createdAt: {
                        type: 'string',
                    },
                    updatedAt: {
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
                    200: {
                        description: 'Ok',
                        schema: {
                            type: 'object',
                            properties: {
                                $ref: '#/components/schemas/message',
                            },
                        },
                    },
                    400: {  
                        description: "Bad Request",                       
                    },
                    500: {
                        description: 'Server Error',
                    },
                },
            },
        },
        '/register': {
            summary: 'Register route',
            post: {
                summary: 'Register route',
                description: 'Route for create account',
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
                    200: {
                        description: 'Ok',
                        schema: {
                            type: 'object',
                            properties: {
                                $ref: '#/components/schemas/message',
                            },
                        },
                    },
                    400: {  
                        description: "Bad Request",                       
                    },
                    500: {
                        description: 'Server Error',
                    },
                },
            },
        },
        '/messages': {
            summary: 'Get Messages route',
            get: {
                summary: 'Get Messages route',
                description: 'Route for get messages',
                tags: ['Message'],
                parameters: [
                    {
                        name: "authorization",
                        in: "header",
                        description: "userUid",
                        required: true,
                        type: "string",           
                    }
                ],
                responses: {
                    200: {
                        description: 'Ok',
                        schema: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/message',
                            },
                        },
                    },
                    500: {
                        description: 'Server Error',
                    },
                },
            },
            post: {
                summary: 'Create Message route',
                description: 'Route for create message',
                tags: ['Message'],
                parameters: [
                    {
                        name: "authorization",
                        in: "header",
                        description: "userUid",
                        required: true,
                        type: "string",           
                    }
                ],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/createMessageParams',
                            },
                        },
                        required: true,
                    },
                },
                responses: {
                    200: {
                        description: 'Ok',
                        schema: {
                            type: 'object',
                            properties: {
                                $ref: '#/components/schemas/message',
                            },
                        },
                    },
                    400: {  
                        description: "Bad Request",                       
                    },
                    500: {
                        description: 'Server Error',
                    },
                },
            },
        },
        '/messages/:uid': {
            summary: 'Update Message route',
            put: {
                summary: 'Update Message route',
                description: 'Route for update message',
                tags: ['Message'],
                parameters: [
                    {
                        name: "uid",
                        in: "path",
                        description: "uid of message for updated",
                        required: true,
                        type: "string",           
                    },
                    {
                        name: "authorization",
                        in: "header",
                        description: "userUid",
                        required: true,
                        type: "string",           
                    }
                ],
                responses: {
                    200: {
                        description: 'Ok',
                        schema: {
                            type: 'object',
                            properties: {
                                $ref: '#/components/schemas/message',
                            },
                        },
                        
                    }, 
                    400: {
                        description: "Bad Request",
                    },
                    500: {
                        description: 'Server Error',
                    },
                },
            },
            delete: {
                summary: 'Delete Message route',
                description: 'Route for delete message',
                tags: ['Message'],
                parameters: [
                    {
                        name: "uid",
                        in: "path",
                        description: "uid of message for delete",
                        required: true,
                        type: "string",           
                    },
                    {
                        name: "authorization",
                        in: "header",
                        description: "userUid",
                        required: true,
                        type: "string",           
                    }
                ],
                responses: {
                    200: {
                        description: "Ok",
                        schema: {
                            type: 'object',
                            properties: {
                                $ref: '#/components/schemas/message',
                            },
                        },
                    },
                    400: {
                        description: "Bad Request",
                    },
                    500: {
                        description: "Server Error",
                    }
                },
            },
        },
    },
};

import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RESTful API',
      version: '1.0.0',
      description: 'API documentation for a Waterpolo information system. Explore and interact with the endpoints to access data related to water polo clubs, teams, championships, matches, and results.',
    },
    contact: {
      name: 'Marcos Bermejo',
      email: 'marcosbermejom@gmail.com',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local development server',
      },
    ],
  },
  apis: ['src/**/*.yaml'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const uiOptions = {
  customCssUrl: '/swagger.css',
  customSiteTitle: 'Waterpolo API Doc',
  customfavIcon: '/favicon.ico',
};

export default swaggerSpec;
export { uiOptions };

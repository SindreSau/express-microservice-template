import { JsonController, Get, QueryParam } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@JsonController()
export class ExampleController {
    @Get('/')
    @OpenAPI({
        summary: 'Returns a greeting',
        parameters: [
            {
                name: 'name',
                in: 'query',
                description: 'Name to greet',
                schema: { type: 'string' }
            }
        ],
        responses: {
            '200': {
                description: 'Greeting message',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string' }
                            }
                        }
                    }
                }
            }
        }
    })
    greeting(@QueryParam('name') name: string = 'World') {
        return { message: `Hello, ${name}!` };
    }
}
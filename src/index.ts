import {
  app,
  InvocationContext,
  HttpRequest,
  HttpResponseInit,
} from '@azure/functions';

app.setup({
  enableHttpStream: true,
});

let site = process.env.CANONICAL_SITE || 'https://www.reactacademy.live';
if (!site.endsWith('/')) site += '/';

async function RedirectHandler(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const route = request.params.route ?? '';

  context.log(`Http function processed request for url "${route}"`);

  return {
    status: 301,
    headers: {
      location: `${site}${route}`,
    },
    body: null,
  };
}

app.http('test', {
  authLevel: 'anonymous',
  handler: RedirectHandler,
  route: '{*route}',
});

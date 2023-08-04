import { app, yoga } from '@/presentation/server';
import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { expect } from 'chai';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

describe('Root resolver', () => {
  const executor = buildHTTPExecutor({
    fetch: yoga.fetch,
  });

  const getResult = async <T>(document: DocumentNode): Promise<T> =>
    executor({
      document,
    }) as T;

  afterEach(() => {
    app.close();
  });

  it('should return World', async () => {
    const HelloWorldQuery = gql`
      query {
        hello
      }
    `;

    const result = await getResult<{ data: { hello: string } }>(
      HelloWorldQuery,
    );

    expect(result.data.hello).to.equal('World');
  });
});

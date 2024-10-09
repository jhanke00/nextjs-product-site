import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

// Dynamically import the SwaggerUI component with no server-side rendering
const SwaggerUI = dynamic<{
  spec: any;
}>(() => import('swagger-ui-react').then((mod) => mod.default as any), { ssr: false });

// Functional component that renders the SwaggerUI with the provided spec
function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <SwaggerUI spec={spec} />;
}

// getStaticProps function to generate the Swagger spec at build time
export const getStaticProps: GetStaticProps = async () => {
  const spec = createSwaggerSpec({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Swagger',
        version: '1.0',
      },
    },
  });

  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc;

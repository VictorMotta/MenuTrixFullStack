import dotenv from 'dotenv';

export function loadEnv() {
  console.log(process.env.NODE_ENV);
  const node_env = process.env.NODE_ENV;

  const path =
    node_env === 'development' ? '.env.development' : node_env === 'test' ? '.env.test' : '.env';

  dotenv.config({ path });
}

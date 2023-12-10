import type { Config, Objectype } from './config.interface';
import { config as DevConfig } from './envs/development';
import { config as ProdConfig } from './envs/production';

const util = {
  isObject<T>(value: T): value is T & Objectype {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  },
  merge<T extends Objectype, U extends Objectype>(target: T, source: U): T & U {
    for (const key of Object.keys(source)) {
      const targetValue = target[key];
      const sourceValue = source[key];
      if (this.isObject(targetValue) && this.isObject(sourceValue)) {
        Object.assign(sourceValue, this.merge(targetValue, sourceValue));
      }
    }

    return { ...target, ...source };
  },
};

export const configuration = async (): Promise<Config> => {
  const { config } = await import('./envs/default');
  const nodeEnv = process.env.DB_NAME || 'development';
  switch (nodeEnv) {
    case 'development':
      return <Config> <unknown>util.merge(config, DevConfig);
    case 'production':
      return <Config> util.merge(config, ProdConfig);
    default:
      return <Config> <unknown>util.merge(config, DevConfig);
  }

};

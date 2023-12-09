type Params<Key extends string = string> = {
  readonly [key in Key]: string | undefined;
};

export function generatePath(pathStr: string, params: Params = {}): string {
  return pathStr
    .replace(/\[(\w+)\]/g, (_, key): string => {
      if (typeof params[key] !== 'string') {
        return '';
      }

      return params[key] as string;
    })
    .replace(/\/*\*$/, () =>
      params['*'] == null ? '' : params['*'].replace(/^\/*/, '/')
    );
}

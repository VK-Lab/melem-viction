import React, { useMemo, useState } from 'react';

import { Tooltip, TooltipProps, Typography } from '@mui/material';

type Props = {
  text: string;
  startLength?: number;
  endLength?: number;
};

export const MiddleTruncatedText = ({
  text,
  startLength = 10,
  endLength = 8,
  ...props
}: Props) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const resultString = useMemo(() => {
    if (text.length > length) {
      setIsTruncated(true);
      return `${text.slice(0, startLength)}...${text.slice(
        text.length - endLength,
        text.length
      )}`;
    }
    return text;
  }, [text, startLength, endLength]);
  return React.createElement(
    Tooltip,
    { title: isTruncated ? (text as string) : '' } as TooltipProps,
    React.createElement(Typography, Object.assign({}, props), resultString)
  );
};

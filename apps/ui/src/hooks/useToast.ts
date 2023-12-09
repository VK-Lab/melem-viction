import _snakeCase from 'lodash/snakeCase';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-toastify';

export const useI18nToast = () => {
  const { t, i18n } = useTranslation();

  const toastError = (messageKey: string) => {
    const tKey = `error.${_snakeCase(messageKey)}`;
    let currentKey = 'error.default';
    if (i18n.exists(tKey)) {
      currentKey = tKey;
    }
    toast.error(t(currentKey) as string);
  };

  const toastSuccess = (messageKey: string) => {
    const tKey = `success.${_snakeCase(messageKey)}`;
    let currentKey = 'success.default';
    if (i18n.exists(tKey)) {
      currentKey = tKey;
    }
    toast.success(t(currentKey) as string);
  };

  return {
    toastError,
    toastSuccess,
  };
};

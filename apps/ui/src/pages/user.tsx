import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import UserCollection from '@/modules/UserCollection';

const Index = () => {
  return <UserCollection />;
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Index;

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import AdminNftCollection from '@/modules/AdminNftCollection';

const Index = () => {
  return <AdminNftCollection />;
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Index;

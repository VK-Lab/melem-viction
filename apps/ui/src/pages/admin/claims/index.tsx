import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import AdminHome from '@/modules/AdminHome';

const Index = () => {
  return <AdminHome />;
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Index;

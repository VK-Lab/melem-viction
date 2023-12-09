import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import AdminWelcome from '@/modules/AdminWelcome';

const Index = () => {
  return <AdminWelcome />;
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Index;

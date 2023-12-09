import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import AdminNft from '@/modules/AdminNft';

const Index = () => {
  return <AdminNft />;
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Index;

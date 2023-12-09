import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import AdminBenefit from '@/modules/AdminBenefit';

const Index = () => {
  return <AdminBenefit />;
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Index;

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Welcome from '@/modules/Welcome';

const Index = () => {
  return <Welcome />;
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Index;

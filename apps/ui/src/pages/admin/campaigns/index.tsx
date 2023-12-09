import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import AdminCampaign from '@/modules/AdminCampaign';

const Index = () => {
  return <AdminCampaign />;
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Index;

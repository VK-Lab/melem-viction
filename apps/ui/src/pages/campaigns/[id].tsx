import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MintCampaign from '@/modules/MintCampaign';

const Index = () => {
  return <MintCampaign />;
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export default Index;

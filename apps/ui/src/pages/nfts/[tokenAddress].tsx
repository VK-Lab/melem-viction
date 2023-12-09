import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import UserNFTDetail from '@/modules/UserNFTDetail';

const Index = () => {
  return <UserNFTDetail />;
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

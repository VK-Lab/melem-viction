import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { dehydrate } from 'react-query';

import { prefetchGetCampaign } from '@/hooks/queries/useGetCampaign';
import MintCampaign from '@/modules/MintCampaign';

const Index = () => {
  return <MintCampaign />;
};

export const getServerSideProps = async ({
  locale,
  params,
}: {
  locale: string;
  params: { id: string };
}) => {
  const queryClient = await prefetchGetCampaign(params.id);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Index;

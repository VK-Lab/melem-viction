import CheckIcon from '@mui/icons-material/Check';
import { Button, Box, ListItem, ListItemText } from '@mui/material';
import copy from 'copy-to-clipboard';
import { useQueryClient } from 'react-query';

import { StyledListItemIcon } from './styled';
import { QueryKeys } from '@/enums/queryKeys.enum';
import { useMutateClaimBenefit } from '@/hooks/mutations';
import { useCheckPhoneVerfied } from '@/hooks/queries';
import { useGetNftBenefits } from '@/hooks/queries/useGetNftBenefits';
import { useI18nToast } from '@/hooks/useToast';
import { Benefit } from '@/types/benefit';
import { ClaimStatusEnum } from '@/types/claim';

type Props = {
  nftId?: string;
};

const ListBenefits = ({ nftId }: Props) => {
  const { toastSuccess } = useI18nToast();
  const { data: benefits = [] } = useGetNftBenefits({ nftId });
  const { data: { isPhoneVerfied } = { isPhoneVerfied: false } } =
    useCheckPhoneVerfied();
  const queryClient = useQueryClient();

  const claimNftMutation = useMutateClaimBenefit({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QueryKeys.NFT,
      });
    },
  });

  const handleOnClickClaimBenefit = (benefit: Benefit) => {
    if (!nftId) {
      return;
    }
    claimNftMutation.mutate({ nftId, benefitId: benefit.id });
  };

  return (
    <Box sx={{ maxWidth: 480 }}>
      {benefits.map((benefit: Benefit) => {
        const isReadyClaim = benefit.claimStatus === ClaimStatusEnum.READY;
        const txt = isReadyClaim
          ? 'Claim'
          : benefit.generatedCode || benefit.claimStatus;
        const isClaiming =
          claimNftMutation.isLoading &&
          claimNftMutation.variables?.benefitId === benefit.id;
        return (
          <ListItem
            key={`benefit--${benefit.id}`}
            disableGutters
            sx={{ mb: 1 }}
            className="item"
            secondaryAction={
              <>
                {benefit.generatedCode ? (
                  <Button
                    sx={{ minWidth: 120 }}
                    size="small"
                    onClick={() => {
                      const isCopied = copy(benefit.generatedCode!);
                      if (isCopied) {
                        toastSuccess('coupon_copied');
                      }
                    }}
                  >
                    {benefit.generatedCode}
                  </Button>
                ) : (
                  <Button
                    sx={{ minWidth: 120 }}
                    size="small"
                    disabled={!isReadyClaim || isClaiming || !isPhoneVerfied}
                    variant={!isReadyClaim ? 'text' : 'contained'}
                    onClick={() => handleOnClickClaimBenefit(benefit)}
                  >
                    {isClaiming ? 'Claiming...' : txt}
                  </Button>
                )}
              </>
            }
          >
            <StyledListItemIcon>
              <CheckIcon color={!isReadyClaim ? 'primary' : 'disabled'} />
            </StyledListItemIcon>
            <ListItemText
              sx={{
                m: 0,
              }}
              primaryTypographyProps={{
                variant: 'subtitle2',
              }}
              primary={benefit.name}
            />
          </ListItem>
        );
      })}
    </Box>
  );
};

export default ListBenefits;

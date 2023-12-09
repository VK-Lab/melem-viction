import CheckIcon from '@mui/icons-material/Check';
import { Button, Box, ListItem, ListItemText } from '@mui/material';
import { useQueryClient } from 'react-query';

import { StyledListItemIcon } from './styled';
import { QueryKeys } from '@/enums/queryKeys.enum';
import { useMutateClaimBenefit } from '@/hooks/mutations';
import { useCheckPhoneVerfied } from '@/hooks/queries';
import { Benefit } from '@/types/benefit';
import { NftClaim } from '@/types/nft';

type Props = {
  nftId?: string;
  benefits?: Benefit[];
  claims?: NftClaim[];
};

const ListBenefits = ({ nftId, benefits = [], claims = [] }: Props) => {
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
        const foundClaim = claims.find(
          (claim: NftClaim) => claim.benefitId === benefit.id
        );
        const txt = foundClaim ? foundClaim.status : 'Claim';
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
              <Button
                sx={{ minWidth: 120 }}
                size="small"
                disabled={!!foundClaim || isClaiming || !isPhoneVerfied}
                variant={foundClaim ? 'text' : 'contained'}
                onClick={() => handleOnClickClaimBenefit(benefit)}
              >
                {isClaiming ? 'Claiming...' : txt}
              </Button>
            }
          >
            <StyledListItemIcon>
              <CheckIcon color={foundClaim ? 'primary' : 'disabled'} />
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

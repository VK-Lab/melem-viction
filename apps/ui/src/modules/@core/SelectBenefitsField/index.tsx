import { AutocompleteElement } from 'react-hook-form-mui';

import { useGetBenefits } from '@/hooks/queries';
import { Benefit } from '@/types/benefit';

type Props = {
  name: string;
};

const SelectBenefitsField = ({ name }: Props) => {
  const {
    data: { items: benefits = [] } = { items: [], total: 0 },
    isLoading: isLoadingBenefits,
  } = useGetBenefits();

  return (
    <AutocompleteElement
      loading={isLoadingBenefits}
      label="Benefits"
      multiple
      matchId
      name={name}
      options={benefits.map((item: Benefit) => {
        return {
          id: item.id,
          label: item.name,
        };
      })}
    />
  );
};

export default SelectBenefitsField;

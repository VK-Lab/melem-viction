import { ListItemIcon } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledListItemIcon = styled(ListItemIcon)(() => ({
  justifyContent: 'center',
  mr: 0,
  pr: 0,
}));

// type CheckIconType = {
//   claimed?: boolean;
//   theme: ThemeOptions;
// } & OverridableComponent<SvgIconTypeMap<ThemeOptions, 'svg'>> & {
//     muiName: string;
//   };

// const StyledCheckIcon = styled(CheckIcon, {
//   shouldForwardProp: true,
// })<CheckIconType>(({ claimed = false, theme }: CheckIconType) => ({
//   boxShadow: _get(theme, 'customShadows[2]'),
//   borderRadius: '50%',
//   width: 36,
//   height: 36,
// }));

export { StyledListItemIcon };

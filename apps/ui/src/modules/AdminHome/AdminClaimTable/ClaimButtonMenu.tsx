import * as React from 'react';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { PopupState as PopupStateProps } from 'material-ui-popup-state/core';

import { ClaimStatusEnum } from '@/types/claim';

type ClaimButtonMenuProps = {
  onClick?: (claimStatus: ClaimStatusEnum, { close }: PopupStateProps) => void;
  defaultValue?: ClaimStatusEnum;
  popupId?: string;
};

const ClaimButtonMenu = ({
  onClick,
  defaultValue = ClaimStatusEnum.PENDING,
  popupId,
}: ClaimButtonMenuProps) => {
  const handleOnClick = (
    status: ClaimStatusEnum,
    popupStatus: PopupStateProps
  ) => {
    onClick?.(status, popupStatus);
  };

  return (
    <PopupState variant="popover" popupId={popupId}>
      {(popupState) => (
        <React.Fragment>
          <Button variant="outlined" size="small" {...bindTrigger(popupState)}>
            {defaultValue}
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem
              onClick={() =>
                handleOnClick(ClaimStatusEnum.ACCEPTED, popupState)
              }
            >
              {ClaimStatusEnum.ACCEPTED}
            </MenuItem>
            <MenuItem
              onClick={() => handleOnClick(ClaimStatusEnum.PENDING, popupState)}
            >
              {ClaimStatusEnum.PENDING}
            </MenuItem>
            <MenuItem
              onClick={() =>
                handleOnClick(ClaimStatusEnum.REJECTED, popupState)
              }
            >
              {ClaimStatusEnum.REJECTED}
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
};

export default ClaimButtonMenu;

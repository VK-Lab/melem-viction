import * as React from 'react';

import AppsIcon from '@mui/icons-material/Apps';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/router';

import { AdminPaths } from '@/enums/paths.enum';

export default function NestedList({ maxWidth = 360 }) {
  const router = useRouter();

  const handleOnClick = (path: AdminPaths) => {
    router.push(path);
  };

  return (
    <>
      <List dense sx={{ maxWidth, pt: 3 }} component="nav">
        <ListItemButton
          selected={Boolean(router.asPath === AdminPaths.CAMPAIGNS)}
          onClick={() => handleOnClick(AdminPaths.CAMPAIGNS)}
        >
          <ListItemIcon>
            <AppsIcon />
          </ListItemIcon>
          <ListItemText primary="Campaigns" />
        </ListItemButton>
        <ListItemButton
          selected={Boolean(router.asPath === AdminPaths.CLAIMS)}
          onClick={() => handleOnClick(AdminPaths.CLAIMS)}
        >
          <ListItemIcon>
            <AppsIcon />
          </ListItemIcon>
          <ListItemText primary="Claims" />
        </ListItemButton>
        <ListItemButton
          selected={Boolean(router.asPath === AdminPaths.BENEFITS)}
          onClick={() => handleOnClick(AdminPaths.BENEFITS)}
        >
          <ListItemIcon>
            <AppsIcon />
          </ListItemIcon>
          <ListItemText primary="Benefits" />
        </ListItemButton>
        <ListItemButton
          selected={Boolean(router.asPath === AdminPaths.NFTS)}
          onClick={() => handleOnClick(AdminPaths.NFTS)}
        >
          <ListItemIcon>
            <AppsIcon />
          </ListItemIcon>
          <ListItemText primary="NFTs" />
        </ListItemButton>
        <ListItemButton
          selected={Boolean(router.asPath === AdminPaths.NFT_COLLECTIONS)}
          onClick={() => handleOnClick(AdminPaths.NFT_COLLECTIONS)}
        >
          <ListItemIcon>
            <AppsIcon />
          </ListItemIcon>
          <ListItemText primary="NFT Collections" />
        </ListItemButton>
      </List>
      {/* <List
        dense
        sx={{ maxWidth }}
        component="nav"
        subheader={
          <ListSubheader component="div">Campaign Settings</ListSubheader>
        }
      >
        <ListItemButton>
          <ListItemIcon>
            <CampaignIcon />
          </ListItemIcon>
          <ListItemText primary="Campaigns" />
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Overview" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List dense component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <DataSaverOffIcon />
              </ListItemIcon>
              <ListItemText primary="Data overal" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <List
        dense
        sx={{ maxWidth }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={<ListSubheader component="div">Settings</ListSubheader>}
      >
        <ListItemButton>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </List> */}
    </>
  );
}

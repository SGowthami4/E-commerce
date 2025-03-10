import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';

function notificationsLabel(count) {
  if (count === 0) {
    return 'no notifications';
  }
  if (count > 99) {
    return 'more than 99 notifications';
  }
  return `${count} notifications`;
}

export default function AccessibleBadges({icon}) {
  return (
    <IconButton aria-label={notificationsLabel(100)}>
      <Badge badgeContent={0}color="secondary">
        {icon}
      </Badge>
    </IconButton>
  );
}
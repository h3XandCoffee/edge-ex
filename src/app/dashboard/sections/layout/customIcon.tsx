import type { FC } from 'react';

import AccountSvg from '../../assets/menu/account.svg';
import DashboardSvg from '../../assets/menu/dashboard.svg';
import DocumentationSvg from '../../assets/menu/documentation.svg';
import GuideSvg from '../../assets/menu/guide.svg';
import PermissionSvg from '../../assets/menu/permission.svg';

interface CustomIconProps {
  type: string;
}

export const CustomIcon: FC<CustomIconProps> = props => {
  const { type } = props;
  let com = <GuideSvg />;

  if (type === 'guide') {
    com = <GuideSvg />;
  } else if (type === 'permission') {
    com = <PermissionSvg />;
  } else if (type === 'dashboard') {
    com = <DashboardSvg />;
  } else if (type === 'account') {
    com = <AccountSvg />;
  } else if (type === 'documentation') {
    com = <DocumentationSvg />;
  } else {
    com = <GuideSvg />;
  }

  return <span className="anticon">{com}</span>;
};

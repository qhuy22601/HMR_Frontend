import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import DocumentDuplicateIcon from "@heroicons/react/24/solid/DocumentDuplicateIcon";
import NewspaperIcon from "@heroicons/react/24/solid/NewspaperIcon";
import CircleStackIcon from "@heroicons/react/24/solid/CircleStackIcon";
import ArrowLeftCircleIcon from "@heroicons/react/24/solid/ArrowLeftCircleIcon";
import ArrowRightCircleIcon from "@heroicons/react/24/solid/ArrowRightCircleIcon";
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: "Trang chủ",
    path: "/",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Nhân viên",
    path: "/employee",
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Nghỉ phép",
    path: "/leave",
    icon: (
      <SvgIcon fontSize="small">
        <DocumentDuplicateIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Tài khoản",
    path: "/account",
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Cài đặt",
    path: "/settings",
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Điểm danh",
    path: "/attendance",
    icon: (
      <SvgIcon fontSize="small">
        <UserPlusIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Thông báo",
    path: "/upload",
    icon: (
      <SvgIcon fontSize="small">
        <NewspaperIcon />
      </SvgIcon>
    ),
  },

  {
    title: "Dữ liệu",
    path: "/image",
    icon: (
      <SvgIcon fontSize="small">
        <CircleStackIcon />
      </SvgIcon>
    ),
  },
  // {
  //   title: "Check In",
  //   path: "/checkin",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <ArrowLeftCircleIcon />
  //     </SvgIcon>
  //   ),
  // },
  // {
  //   title: "Check Out",
  //   path: "/checkout",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <ArrowRightCircleIcon />
  //     </SvgIcon>
  //   ),
  // },
];

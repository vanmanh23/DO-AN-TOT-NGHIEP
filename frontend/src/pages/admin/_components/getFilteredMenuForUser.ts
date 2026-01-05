import type { Role } from "../../../apis/authApis";
import { menuItems, type MenuItem } from "../../../constants";

export function getFilteredMenuForUser(roles: Role[]): readonly MenuItem[] {
  const roleNames = roles.map((r) => r.name);

  if (roleNames.includes("ROLE_ADMIN")) {
    return menuItems;
  }

  if (roleNames.includes("ROLE_DOCTOR")) {
    const doctorAllowedItems = [
      "Worklist",
      "Completed examination",
      "Patients",
    ];
    return menuItems.filter((item) => doctorAllowedItems.includes(item.name));
  }
  if (roleNames.includes("REGISTRATION_STAFF")) {
    const doctorAllowedItems = [
      "Receive",
      "Orders",
      "Patients",
      "Completed examination",
    ];
    return menuItems.filter((item) => doctorAllowedItems.includes(item.name));
  }
  if (roleNames.includes("ROLE_USER")) {
    const doctorAllowedItems = ["Worklist", "Completed examination"];
    return menuItems.filter((item) => doctorAllowedItems.includes(item.name));
  }

  return [];
}

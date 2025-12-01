import type { Role } from "../../../apis/authApis";
import { menuItems, type MenuItem } from "../../../constants";

export function getFilteredMenuForUser(roles: Role[]): readonly MenuItem[] {
  const roleNames = roles.map(r => r.name);
  
  if (roleNames.includes("ROLE_ADMIN")) {
    return menuItems;
  }

  if (roleNames.includes("ROLE_DOCTOR")) {
    const doctorAllowedItems = ["Dashboard", "Worklist", "Completed examination"];
    return menuItems.filter(item => 
      doctorAllowedItems.includes(item.name)
    );
  }
  if (roleNames.includes("REGISTRATION_STAFF")) {
    const doctorAllowedItems = ["Dashboard", "Receive", "Orders", "Patients"];
    return menuItems.filter(item => 
      doctorAllowedItems.includes(item.name)
    );
  }
  if (roleNames.includes("ROLE_USER")) {
    const doctorAllowedItems = ["Dashboard", "Worklist", "Completed examination"];
    return menuItems.filter(item => 
      doctorAllowedItems.includes(item.name)
    );
  }

  return [];
}
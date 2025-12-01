import { useEffect, useState } from "react";
import { columns } from "./_components/columns";
import UserTable from "./_components/UserTable";
import { GetAllUsers, type UserResponseDTO } from "../../../apis/authApis";
import { ListFilter, Search } from "lucide-react";
import AddAccount from "./_components/AddAccount";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/store";
import { setOption } from "../../../features/navbarsection/navbarSection";

export default function Component() {
  const [usersData, setUsersData] = useState<UserResponseDTO[]>([]);
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});
  const [submitSearch, setSubmitSearch] = useState<{ [key: string]: string }>(
    {}
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await GetAllUsers();
        setUsersData(users.result);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchUsers();
    dispatch(setOption("User management"));
  }, []);
  const handleChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };
  const handleSearch = () => {
    setSubmitSearch(formValues);
  };

  return (
    <div className="flex flex-col gap-3 mx-6">
      <div className="w-full flex md:flex-row flex-col justify-between">
        <div>
          <h3 className="md:text-2xl text-xs font-semibold">
            All users ({usersData.length})
          </h3>
        </div>
        <div className="flex md:flex-row flex-col md:items-center items-end gap-2 md:h-8 h-full ">
          <div className="flex flex-row items-center h-full gap-2 pl-2 border-slate-200 rounded-md border">
            <Search className="text-secondary" size={16} />
            <input
              type="text"
              placeholder="Search by name"
              value={formValues.userName}
              onChange={(value) => handleChange("userName", value.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="outline-bg-secondary pl-2"
            />
          </div>
          <div
            className="flex flex-row items-center cursor-pointer border h-full text-menu-items border-slate-300 rounded-md px-2 text-sm gap-2"
            onClick={handleSearch}
          >
            <ListFilter size={16} />
            <p>Filter</p>
          </div>
          <AddAccount />
        </div>
      </div>
      <div>
        <UserTable
          columns={columns}
          data={usersData}
          formValues={submitSearch}
        />
      </div>
    </div>
  );
}

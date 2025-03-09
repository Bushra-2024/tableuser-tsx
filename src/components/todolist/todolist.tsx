import WbSunnyIcon from "@mui/icons-material/WbSunny";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { ITableUser } from "./types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import '../../styles/global.css'
const Todolist = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [data, setData] = useState<ITableUser[]>([
    {
      id: 1,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAXHDWDsMtv9vnLd3Sm9DPnIw0a6X5ZhU5gQ&s",
      name: "Jacob Jones",
      email: "jackson.graham@example.com",
      city: "Dushanbe",
      status: false,
      phone: "888889999",
    },
    {
      id: 2,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7WiIwQLITwCra76m5zlasK7rrBZBZWJ3e7w&s",
      name: "Emily Smith",
      email: "emily.smith@example.com",
      city: "Bukhtar",
      status: true,
      phone: "987654321",
    },
    {
      id: 3,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAXHDWDsMtv9vnLd3Sm9DPnIw0a6X5ZhU5gQ&s",
      name: "Liam Brown",
      email: "liam.brown@example.com",
      city: "Khujand",
      status: false,
      phone: "765432198",
    },
    {
      id: 4,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7WiIwQLITwCra76m5zlasK7rrBZBZWJ3e7w&s",
      name: "Sophia White",
      email: "sophia.white@example.com",
      city: "Dushanbe",
      status: true,
      phone: "123456789",
    },
    {
      id: 5,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAXHDWDsMtv9vnLd3Sm9DPnIw0a6X5ZhU5gQ&s",
      name: "Noah Davis",
      email: "noah.davis@example.com",
      city: "Bukhtar",
      status: true,
      phone: "111222333",
    },
    {
      id: 6,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7WiIwQLITwCra76m5zlasK7rrBZBZWJ3e7w&s",
      name: "Olivia Wilson",
      email: "olivia.wilson@example.com",
      city: "Khujand",
      status: false,
      phone: "444555666",
    },
    {
      id: 7,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7WiIwQLITwCra76m5zlasK7rrBZBZWJ3e7w&s",
      name: "William Miller",
      email: "william.miller@example.com",
      city: "Dushanbe",
      status: true,
      phone: "777888999",
    },
    {
      id: 8,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAXHDWDsMtv9vnLd3Sm9DPnIw0a6X5ZhU5gQ&s",
      name: "Ava Taylor",
      email: "ava.taylor@example.com",
      city: "Bukhtar",
      status: false,
      phone: "999888777",
    },
  ]);
  const [addOpenn, setAddOpen] = useState<boolean>(false);
  const [addImage, setAddImage] = useState<string>("");
  const [addName, setAddName] = useState<string>("");
  const [addEmail, setAddEmail] = useState<string>("");
  const [addStatus, setAddStatus] = useState<boolean>(false);
  const [addCity, setAddCity] = useState<string>("");
  const [addPhone, setAddPhone] = useState<string>("");

  const [statusFilter, setStatusFilter] = useState<string>("All status");
  const [cityFilter, setCityFilter] = useState<string>("All cities");
  const [search, setSearch] = useState<string>("");
  //   edit
  const [selectedUser, setSelectedUser] = useState<ITableUser | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [editEmail, setEditEmail] = useState<string>("");
  const [editCity, setEditCity] = useState<string>("");
  const [editStatus, setEditStatus] = useState<boolean>(false);
  const [editPhone, setEditPhone] = useState<string>("");
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [selectedCustomer, setSelectedCustomer] = useState<ITableUser | null>(null);
  //show
  const [profileModalVisible, setProfileModalVisible] = useState<boolean>(false);
  const [selectedProfile, setSelectedProfile] = useState<ITableUser | null>(null);

  const deleteUser = (id: number | string) => {
    setData(data.filter((user) => user.id !== id));
    setModalVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const addOpen = () => {
    setAddOpen(true);
  };
  const addClose = () => {
    setAddOpen(false);
  };
  const Add = () => {
    const newUser = {
      id: Date.now(),
      image: addImage,
      name: addName,
      email: addEmail,
      status: addStatus,
      city: addCity,
      phone: addPhone,
    };
    setData([...data, newUser]);
    setAddImage("");
    setAddName("");
    setAddEmail("");
    setAddStatus(false);
    setAddCity("");
    setAddPhone("");
    addClose();
  };

  const filteredData = data.filter((user) => {
    const matchesStatus =
      statusFilter === "All status" ||
      (statusFilter === "Active" ? user.status : !user.status);
    const matchesCity =
      cityFilter === "All cities" ||
      user.city.toLowerCase() === cityFilter.toLowerCase();
    const searching = JSON.stringify(user)
      .toLowerCase()
      .trim()
      .includes(search.toLowerCase().trim());
    return matchesStatus && matchesCity && searching;
  });

  const openEditModal = (user: ITableUser) => {
    setSelectedUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditCity(user.city);
    setEditStatus(user.status);
    setEditPhone(user.phone);
    setEditModalVisible(true);
  };
  const closeEditModal = () => {
    setEditModalVisible(false);
  };
  const saveEdit = () => {
    if (selectedUser) {
      const updatedUser = {
        ...selectedUser,
        name: editName,
        email: editEmail,
        city: editCity,
        status: editStatus,
        phone: editPhone,
      };
      setData(
        data.map((user) => (user.id === selectedUser.id ? updatedUser : user))
      );
      closeEditModal();
    }
  };
  const openProfileModal = (user: ITableUser) => {
    setSelectedProfile(user);
    setProfileModalVisible(true);
  };
  const closeProfileModal = () => {
    setProfileModalVisible(false);
  };
  const handleSelectUser = (user: ITableUser) => {
    setSelectedCustomer(user);
  };
  
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div>
      <Dialog className="w-[40%] m-auto" open={addOpenn} onClose={addClose}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <input
            type="text"
            placeholder="Add url"
            className="border border-gray-300 w-full py-2 px-3 my-4 rounded-md"
            value={addImage}
            onChange={(e) => setAddImage(e.target.value)}
          />
          <TextField
            className="border border-gray-300 w-full py-2 px-3 my-4 rounded-md"
            label="Name"
            type="text"
            value={addName}
            onChange={(e) => setAddName(e.target.value)}
          />
          <TextField
            className="border border-gray-300 w-full py-2 px-3 rounded-md"
            sx={{ marginTop: "15px" }}
            label="Email"
            type="email"
            value={addEmail}
            onChange={(e) => setAddEmail(e.target.value)}
          />
          <select
            value={addCity}
            onChange={(e) => setAddCity(e.target.value)}
            className="border border-gray-300 w-full py-3 px-3 my-4 rounded-md"
          >
            <option value="">choose a city</option>
            <option value="dushanbe">Dushanbe</option>
            <option value="bukhtar">Bukhtar</option>
            <option value="khujand">Khujand</option>
          </select>
          <div>
            <select
              value={addStatus ? "active" : "inactive"}
              onChange={(e) => setAddStatus(e.target.value === "active")}
              className="border border-gray-300 w-full py-3 px-3 my-3 rounded-md"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <TextField
            className="border border-gray-300 w-full py-2 px-3 rounded-md"
            sx={{ marginTop: "15px" }}
            label="Phone"
            type="text"
            value={addPhone}
            onChange={(e) => setAddPhone(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button sx={{ background: "#2196F3", color: "white" }} onClick={Add}>
            Add User
          </Button>
          <Button onClick={addClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      {/* edit */}
      <Dialog
        className="w-[40%] m-auto"
        open={editModalVisible}
        onClose={closeEditModal}
      >
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            type="text"
            fullWidth
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            sx={{ marginTop: "10px" }}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            sx={{ marginTop: "10px" }}
          />
          <select
            value={editCity}
            onChange={(e) => setEditCity(e.target.value)}
            className="border border-gray-300 w-full py-3 px-3 my-2 rounded-md"
          >
            <option value="Dushanbe">Dushanbe</option>
            <option value="Bukhtar">Bukhtar</option>
            <option value="Khujand">Khujand</option>
          </select>
          <select
            value={editStatus ? "active" : "inactive"}
            onChange={(e) => setEditStatus(e.target.value === "active")}
            className="border border-gray-300 w-full py-3 px-3 my-2 rounded-md"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <TextField
            label="Phone"
            type="text"
            fullWidth
            value={editPhone}
            onChange={(e) => setEditPhone(e.target.value)}
            sx={{ marginTop: "10px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ background: "#2196F3", color: "white" }}
            onClick={saveEdit}
          >
            Save
          </Button>
          <Button onClick={closeEditModal}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <div className="flex justify-between px-16 gap-[10px] py-10">
        <h1 className="font-semibold text-[25px]">User List</h1>
        <div className="flex gap-5 items-center">
          <button
            onClick={addOpen}
            className="bg-[#2196F3] text-white font-bold py-[7px] px-[15px] rounded-md"
          >
            + NEW
          </button>
          <div className="flex gap-5">
            <button   onClick={() => setTheme("light")} className="flex gap-1 border-gray-200 border p-[7px] rounded-sm">
              <WbSunnyIcon />
              
              Light
            </button>
            <button  onClick={() => setTheme("dark")}  className="flex gap-1 border-gray-200 border p-[7px] rounded-sm">
              Dark
              <BedtimeIcon />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-10 justify-between px-16">
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 p-1 px-4 rounded-md"
          >
            <option className="text-black">All status</option>
            <option className="text-black">Active</option>
            <option className="text-black">Inactive</option>
          </select>
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="border border-gray-300 p-1 px-4 rounded-md"
          >
            <option className="text-black">All cities</option>
            <option className="text-black">Dushanbe</option>
            <option className="text-black">Bukhtar</option>
            <option className="text-black">Khujand</option>
          </select>
        </div>
        <div className="flex items-center border p-[3px] rounded-sm border-gray-300">
          <input
            type="search"
            placeholder="Search..."
            className="outline-none p-[5px]"
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchIcon />
        </div>
      </div>
      
      <table className="w-[75%] mt-10 m-auto">
        <thead>
          <tr className="border-b pb-2 border-gray-400">
            <th className="text-start p-2">Name</th>
            <th className="text-start p-2">City</th>
            <th className="text-start p-2">Status</th>
            <th className="text-start p-2">Phone</th>
            <th className="text-start p-2"></th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((user) => (
              <tr key={user.id} className="border-b border-gray-300">
                <td className="flex p-3 gap-3">
                  <img src={user.image} className="w-10 h-10 rounded-full" />
                  <div>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                  </div>
                </td>
                <td>{user.city}</td>
                <td>
                  <button
                    className={
                      user.status
                        ? "bg-[#259323] text-white px-[10px] text-[15px]"
                        : "bg-[#748998] text-white px-[10px] text-[15px]"
                    }
                  >
                    {user.status ? "active" : "inactive"}
                  </button>
                </td>
                <td>{user.phone}</td>
                <td
                  onClick={() => {
                    handleSelectUser(user);
                    setModalVisible(true);
                  }}
                  className="text-[32px] text-gray-400 cursor-pointer"
                >
                  ...
                </td>
              </tr>
            ))
          ) : (
            <p className="font-bold mt-10 m-auto text-red-500">Not Found</p>
          )}
        </tbody>
      </table>

      {modalVisible && selectedCustomer && (
        <div className="absolute top-[46%] right-18 bg-white p-4 rounded-md border">
          <div className="flex flex-col items-start">
            <button
              className="text-blue-500 mb-2"
              onClick={() => openProfileModal(selectedCustomer)}
            >
              View Profile
            </button>
            <button
              className="text-blue-500 mb-2"
              onClick={() => openEditModal(selectedCustomer)}
            >
              Edit
            </button>
            <button
              className="text-red-500"
              onClick={() => deleteUser(selectedCustomer.id)} 
            >
              Delete
            </button>
            <button className="text-gray-500 mt-2" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}

      {profileModalVisible && (
        <div className="fixed top-0 right-0 h-full w-[30%] bg-white shadow-lg p-6 border-l z-50 text-black">
          <div className="flex justify-between">
            <button onClick={closeProfileModal} className="text-xl">
              ✖
            </button>
            <h2 className="font-semibold text-lg">User Info</h2>
          </div>
          {selectedProfile && (
            <div className="text-center">
              <img
                src={selectedProfile.image}
                className="w-32 h-32 rounded-full mx-auto"
                alt="Profile"
              />
              <h2 className="font-bold text-xl mt-2">{selectedProfile.name}</h2>
              <p className="text-gray-600">{selectedProfile.email}</p>
              <p className="flex justify-between my-5">
                <span>City:</span>
                {selectedProfile.city}
              </p>
              <p className="flex justify-between my-5">
                <span>Status:</span>
                {selectedProfile.status ? "active" : "inactive"}
              </p>
              <p className="flex justify-between my-5">
                <span>Phone:</span>
                {selectedProfile.phone}
              </p>
              <div className="flex gap-4 mt-10 items-center">
                <button
                  className="bg-blue-500 text-white px-2 py-2 rounded-md font-semibold"
                  onClick={() => openEditModal(selectedProfile)}
                >
                  ✏ Edit
                </button>
                <button
                  className="text-red-500 border-red-500 border font-semibold p-[10px] py-[8px]  rounded-md"
                  onClick={() => deleteUser(selectedProfile.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Todolist;
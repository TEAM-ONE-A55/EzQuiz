import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/register-validations";
import Select from "react-select";
import { roles } from "../../constants/constants";
import { reactSelectStyles } from "../../services/react-select-styles";

export default function Registration() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "student",
    isAdmin: false,
    code: "",
  });

  const [selectedRole, setSelectedRole] = useState(roles[1]);

  const navigate = useNavigate();

  const updateForm = (prop) => (e) => {
    setForm({ ...form, [prop]: e.target.value });
  };

  const handleOnKeyDown = (event) => {
    if (event.key === "Enter") return register(form, navigate);
  };

  const handleChangeRole = (selected) => {
    setSelectedRole({ ...selected });
  };

  useEffect(() => {
    setForm({ ...form, role: selectedRole.value });
  }, [selectedRole]);


  return (
    <div className="bg-neutral-100 mt-16 max-w-xl min-h-[400px] rounded-xl flex-col py-8 px-10 relative shadow-neutral-500 shadow-xl m-auto text-center">
      <h1 className="text-3xl font-semibold pb-12">Sign up</h1>
      <div className="flex flex-col justify-center items-center gap-4">
        <input
          className="pl-3 max-w-[70%] text-lg outline-none border-none rounded-md p-2 w-full transition duration-75 ease-in-out shadow-neutral-300 shadow-lg"
          type="text"
          id="registration-firstName"
          name="registration-firstName"
          value={form.firstName}
          onChange={updateForm("firstName")}
          placeholder="First name"
          onKeyDown={handleOnKeyDown}
        />
        <input
          className="pl-3 max-w-[70%] text-lg outline-none border-none rounded-md p-2 w-full transition duration-75 ease-in-out shadow-neutral-300 shadow-lg"
          type="text"
          id="registration-lastName"
          name="registration-lastName"
          value={form.lastName}
          onChange={updateForm("lastName")}
          placeholder="Last name"
          onKeyDown={handleOnKeyDown}
        />
        <input
          className="pl-3 max-w-[70%] text-lg outline-none border-none rounded-md p-2 w-full transition duration-75 ease-in-out shadow-neutral-300 shadow-lg"
          type="text"
          id="registration-username"
          name="registration-username"
          value={form.username}
          onChange={updateForm("username")}
          placeholder="Username"
          onKeyDown={handleOnKeyDown}
        />
        <input
          className="pl-3 max-w-[70%] text-lg outline-none border-none rounded-md p-2 w-full transition duration-75 ease-in-out shadow-neutral-300 shadow-lg"
          type="text"
          id="registration-email"
          name="registration-email"
          value={form.email}
          onChange={updateForm("email")}
          placeholder="Email"
          onKeyDown={handleOnKeyDown}
        />
        <input
          className="pl-3 max-w-[70%] text-lg outline-none border-none rounded-md p-2 w-full transition duration-75 ease-in-out shadow-neutral-300 shadow-lg"
          type="password"
          id="registration-password"
          name="registration-password"
          value={form.password}
          onChange={updateForm("password")}
          placeholder="Password"
          onKeyDown={handleOnKeyDown}
        />
        <div className="mt-4">
          <p>Select role:</p>
          <Select
          name="roles"
          options={roles.map((role) => role)}
          value={selectedRole}
          onChange={handleChangeRole}
          placeholder={selectedRole.label}
          hideSelectedOptions={true}
          className="basic-multi-select w-48 mx-auto mb-4"
          styles={reactSelectStyles}
          />
          {form.role === "educator" && (
            <div className="">
              <input
                className="pl-3 max-w-[80%] text-lg outline-none border-none rounded-sm px-2 py-1 w-full transition duration-75 ease-in-out shadow-neutral-300 shadow-lg"
                type="password"
                placeholder="Verification code"
                onChange={updateForm("code")}
              />
            </div>
          )}
        </div>
      </div>
      <button 
      className="inline-block w-36 mt-8 mb-2 rounded bg-yellow-400 px-6 pt-2.5 pb-2 text-lg font-medium uppercase leading-normal text-neutral-900 transition duration-75 ease-in-out hover:bg-yellow-500"
      onClick={() => register(form, navigate)}>Sign up</button>
    </div>
  );
}

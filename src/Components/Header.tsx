import { getCurrentUser, logoutUser } from "../services/authService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { User, LogOut } from "lucide-react";
import { AxiosError } from "axios";

interface User {
  id: number;
  name: string;
  email: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: User;
}

const Header = () => {
  const navigate = useNavigate();

  const { data } = useQuery<ApiResponse>({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const { mutate: logoutMutate} = useMutation<
    { message: string },
    AxiosError<{ message: string }>,
    void
  >({
    mutationFn: logoutUser,
    onSuccess: (response) => {
      toast.success(response.message || "Logged out successfully");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Logout failed");
    },
  });

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) logoutMutate();
  };

  return (
    <div className="flex justify-between items-center w-full bg-black text-white p-8">
      <div className="text-xl font-bold text-[#7dfc38]">MyMovie</div>

      {data?.data && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-950 border border-[#252625] px-4 py-2 rounded-full shadow-sm shadow-[#7dfc38]">
            <User className="w-5 h-5 text-[#7dfc38]" />
            <span className="text-sm text-[#7dfc38]">{data.data.name}</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-[#000000]  text-[#ef0101] px-3 py-2 font-medium  rounded-full transition duration-200 text-sm shadow shadow-[#fc3838]"
          >
            <LogOut className="w-4 h-4" />
            LogOut
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;

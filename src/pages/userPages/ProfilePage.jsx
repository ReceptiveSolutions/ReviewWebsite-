import { useEffect, useState } from "react";
import Sidebar from "../../Components/UserComponents/Sidebar";
import ProfileView from "../../Components/UserComponents/ProfileView";
import ProfileEdit from "../../Components/UserComponents/ProfileEdit";
import Loader from "../../Components/Loader"; 

export default function ProfilePage() {
  const [active, setActive] = useState("profile");
  const [user, setUser] = useState(null);
  const userid = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/auth/users/${userid}`);
        const data = await res.json();
        setUser(data.user);
        // console.log("prof",data.user)
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <div className="p-6">
    <Loader/>
  </div>;

  return (
    <div className="flex">
      <Sidebar active={active} setActive={setActive} />
      <main className="flex-2 bg-gray-100 min-h-screen">
        {active === "profile" && <ProfileView user={user} />}
        {active === "edit" && <ProfileEdit user={user} />}
      </main>
    </div>
  );
}

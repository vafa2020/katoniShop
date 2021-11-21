import { useAuth } from "../context/AuthProvider";

const Profile = () => {
  const Auth = useAuth();
  console.log(Auth);
  return (
    <div>
      <p>{Auth.name}</p>
      <p>{Auth.email}</p>
    </div>
  );
};

export default Profile;

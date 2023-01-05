import ScreenLayout from "../components/ScreenLayout";
import Auth from "../components/user/Auth";
import Profile from "../components/user/Profile";
import { useUser } from "../shared/store";

type Props = {};

const User = (props: Props) => {
  const session = useUser((state) => state.session);

  return <ScreenLayout>{session ? <Profile /> : <Auth />}</ScreenLayout>;
};

export default User;

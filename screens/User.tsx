import { Heading, Center, Button } from "native-base";
import ScreenLayout from "../components/ScreenLayout";
import { signinWithDiscord, supabase } from "../shared/Supabase";
import { useUser } from "../shared/store";

type Props = {};

const User = (props: Props) => {
  const session = useUser((state) => state.session);

  return (
    <ScreenLayout>
      <Center flex={1}>
        <Heading mb={8}>Sign in</Heading>
        <Button onPress={signinWithDiscord} w="3/4" mb={8}>
          Discord Account
        </Button>
        <Button
          onPress={() => {
            supabase.auth.signOut();
          }}
          w="3/4"
          mb={8}
        >
          Logout
        </Button>
        <Button
          onPress={async () => {
            console.log(session);
          }}
          w="3/4"
        >
          user
        </Button>
      </Center>
    </ScreenLayout>
  );
};

export default User;

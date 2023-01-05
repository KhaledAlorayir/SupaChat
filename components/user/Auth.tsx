import { Heading, Center, Button } from "native-base";
import { signinWithDiscord } from "../../shared/Supabase";

type Props = {};

const Auth = (props: Props) => {
  return (
    <Center flex={1}>
      <Heading mb={8}>Sign in</Heading>
      <Button onPress={signinWithDiscord} w="3/4" mb={8}>
        Discord Account
      </Button>
    </Center>
  );
};

export default Auth;

import { Center, Text, Heading, Avatar, Box, Button } from "native-base";
import { useUser } from "../../shared/store";
import { supabase } from "../../shared/Supabase";

type Props = {};

const Profile = (props: Props) => {
  const user = useUser((state) => state.session?.user);
  return (
    <>
      {user && (
        <Box flex={1} py={8}>
          <Center flex={1}>
            <Heading mb={8}>Welcome! ✌</Heading>
            <Avatar source={{ uri: user.user_metadata.avatar_url }} size="xl">
              {user.user_metadata.full_name.substring(0, 2)}
            </Avatar>
            <Text>{user.user_metadata.full_name}</Text>
          </Center>
          <Button w="full" onPress={() => supabase.auth.signOut()}>
            Logout
          </Button>
        </Box>
      )}
    </>
  );
};

export default Profile;

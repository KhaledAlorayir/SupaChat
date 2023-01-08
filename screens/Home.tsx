import { Box, KeyboardAvoidingView } from "native-base";
import ChatForm from "../components/home/ChatForm";
import ChatList from "../components/home/ChatList";
import { useUser } from "../shared/store";
type Props = {};

const Home = (props: Props) => {
  const session = useUser((state) => state.session);

  return (
    <KeyboardAvoidingView
      flex={1}
      bg="coolGray.800"
      behavior="padding"
      keyboardVerticalOffset={85}
    >
      <Box flex={1}>
        <ChatList />
      </Box>
      {session && <ChatForm />}
    </KeyboardAvoidingView>
  );
};

export default Home;

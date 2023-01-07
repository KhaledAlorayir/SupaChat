import { Button, Box, HStack, Input, KeyboardAvoidingView } from "native-base";
import ChatForm from "../components/home/ChatForm";
import ChatList from "../components/home/ChatList";
type Props = {};

const Home = (props: Props) => {
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
      <ChatForm />
    </KeyboardAvoidingView>
  );
};

export default Home;

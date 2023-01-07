import { Button, Box } from "native-base";
import ChatList from "../components/home/ChatList";
type Props = {};

const Home = (props: Props) => {
  return (
    <Box flex={1} bg="coolGray.800">
      <Box flex={1}>
        <ChatList />
      </Box>
      <Button>Home</Button>
    </Box>
  );
};

export default Home;

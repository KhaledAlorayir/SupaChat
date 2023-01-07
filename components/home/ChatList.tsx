import { Box, FlatList, Text, HStack, Avatar } from "native-base";
import { useUser } from "../../shared/store";

const messages = [
  {
    content: "hello",
    uid: "6e9f3200-285b-4333-928f-773f012763e3",
    img: "https://cdn.discordapp.com/avatars/285461085610573825/c82ba42cb365f42c564b0bad91079023.png",
    name: "namess",
    date: Date.now(),
  },
  {
    content: "hiii",
    uid: "6e9f32220-285b-4333-928f-773f012763e3",
    img: "https://cdn.discordapp.com/avatars/285461085610573825/c82ba42cb365f42c564b0bad91079023.png",
    name: "namess",
    date: Date.now(),
  },
  {
    content: "welcome!",
    uid: "6e9f3200-28ss5b-4333-928f-773f012763e3",
    img: "https://cdn.discordapp.com/avatars/285461085610573825/c82ba42cb365f42c564b0bad91079023.png",
    name: "namess",
    date: Date.now(),
  },
  {
    content: "good to see u",
    uid: "6e9f3200-28ss5b-4333-928f-773f012763e3",
    img: "https://cdn.discordapp.com/avatars/285461085610573825/c82ba42cb365f42c564b0bad91079023.png",
    name: "namess",
    date: Date.now(),
  },
];
type Props = {};

const ChatList = (props: Props) => {
  const user = useUser((state) => state.session?.user);

  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => (
        <HStack
          alignItems="center"
          space={2}
          my={4}
          px={2}
          flexDirection={user && user.id === item.uid ? "row-reverse" : "row"}
        >
          <Avatar source={{ uri: item.img }} alignItems="center" size="sm">
            {item.name.substring(0, 2)}
          </Avatar>
          <Box
            bg={user && user.id === item.uid ? "secondary.900" : "primary.900"}
            px={8}
            py={3}
            rounded="xl"
          >
            <Text mb={2}>{item.content}</Text>
            <Text fontSize={9}>8/16/2018, 8:02 PM</Text>
          </Box>
        </HStack>
      )}
      keyExtractor={({ content }) => content}
    />
  );
};

export default ChatList;

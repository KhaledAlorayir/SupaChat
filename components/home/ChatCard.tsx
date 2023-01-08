import { Avatar, Box, HStack, Text } from "native-base";
import { Message } from "../../shared/types";
import { useUser } from "../../shared/store";
import dayjs from "dayjs";

type Props = {
  message: Message;
};

const ChatCard = ({ message }: Props) => {
  const user = useUser((state) => state.session?.user);

  return (
    <HStack
      alignItems="center"
      space={2}
      my={4}
      px={2}
      flexDirection={
        user && user.id === message.profiles.id ? "row-reverse" : "row"
      }
    >
      <Avatar
        source={{ uri: message.profiles.avatar_url }}
        alignItems="center"
        size="sm"
      >
        {message.profiles.full_name.substring(0, 2)}
      </Avatar>
      <Box
        bg={
          user && user.id === message.profiles.id
            ? "secondary.900"
            : "primary.900"
        }
        px={8}
        py={3}
        rounded="xl"
      >
        <Text mb={2}>{message.content}</Text>
        <Text fontSize={9}>
          {dayjs(message.created_at).format("DD/MM/YYYY, h:mm A")}
        </Text>
      </Box>
    </HStack>
  );
};

export default ChatCard;

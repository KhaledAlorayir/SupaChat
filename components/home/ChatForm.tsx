import { Button, Box, HStack, Input } from "native-base";

type Props = {};

const ChatForm = (props: Props) => {
  return (
    <HStack bg="coolGray.900" py={2} px={1} alignItems="center">
      <Box flex={1}>
        <Input w="full" variant="rounded" placeholder="enter your message.." />
      </Box>
      <Button size="md" variant="ghost">
        Send
      </Button>
    </HStack>
  );
};

export default ChatForm;

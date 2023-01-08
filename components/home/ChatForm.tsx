import { Button, Box, HStack, TextArea, ScrollView } from "native-base";
import { useState } from "react";
import useSendMessage from "../../shared/hooks/useSendMessage";

type Props = {};

const ChatForm = (props: Props) => {
  const [message, setMessage] = useState("");
  const isValid = message.trim() && message.length > 0 && message.length < 255;
  const { mutate } = useSendMessage();

  return (
    <HStack bg="coolGray.900" py={2} px={1} alignItems="center">
      <Box flex={1}>
        <ScrollView>
          <TextArea
            w="full"
            variant="rounded"
            placeholder="enter your message.."
            multiline={true}
            numberOfLines={4}
            autoCompleteType={false}
            h={9}
            value={message}
            onChangeText={(text) => setMessage(text)}
            size="md"
          />
        </ScrollView>
      </Box>
      <Button
        variant="ghost"
        isDisabled={!isValid}
        onPress={() => mutate({ content: message })}
      >
        Send
      </Button>
    </HStack>
  );
};

export default ChatForm;

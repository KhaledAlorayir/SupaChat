import { Avatar, Box, HStack, Text, Modal, Button } from "native-base";
import { Message } from "../../shared/types";
import { useUser } from "../../shared/store";
import dayjs from "dayjs";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import useDeleteMessage from "../../shared/hooks/useDeleteMessage";

type Props = {
  message: Message;
};

const ChatCard = ({ message }: Props) => {
  const user = useUser((state) => state.session?.user);
  const [modalOpen, setModalOpen] = useState(false);
  const { mutate, isLoading, isSuccess } = useDeleteMessage();

  const deleteHandler = () => {
    mutate(
      { mid: message.id },
      {
        onSuccess() {
          setModalOpen(false);
        },
      }
    );
  };

  return (
    <>
      <TouchableOpacity onLongPress={() => setModalOpen(true)}>
        <HStack
          alignItems="center"
          space={2}
          my={4}
          px={2}
          flexDirection={
            user?.id === message.profiles.id ? "row-reverse" : "row"
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
              user?.id === message.profiles.id ? "secondary.900" : "primary.900"
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
      </TouchableOpacity>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Content px={6} py={8}>
          {user?.id === message.user_id && (
            <Button
              colorScheme="danger"
              onPress={deleteHandler}
              isLoading={isLoading}
            >
              Delete Message
            </Button>
          )}
        </Modal.Content>
      </Modal>
    </>
  );
};

export default ChatCard;

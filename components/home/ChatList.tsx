import { Center, FlatList, Spinner } from "native-base";
import useMessages from "../../shared/hooks/useMessages";
import ChatCard from "./ChatCard";
import useMessagesUpdater from "../../shared/hooks/useRealtimeMessageUpdater";

type Props = {};

const ChatList = (props: Props) => {
  const { data, isSuccess, isLoading } = useMessages();
  useMessagesUpdater();

  if (isLoading) {
    return (
      <Center flex={1}>
        <Spinner accessibilityLabel="Loading messages" size="lg" />
      </Center>
    );
  }

  return (
    <>
      {isSuccess && (
        <FlatList
          data={data}
          renderItem={({ item }) => <ChatCard message={item} key={item.id} />}
          contentContainerStyle={{ paddingVertical: 6 }}
        />
      )}
    </>
  );
};

export default ChatList;

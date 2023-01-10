import { Center, FlatList, Spinner } from "native-base";
import useMessages from "../../shared/hooks/useMessages";
import ChatCard from "./ChatCard";
import useMessagesUpdater from "../../shared/hooks/useRealtimeMessageUpdater";
import { useRef } from "react";
import { FlatList as FL } from "react-native";

type Props = {};

const ChatList = (props: Props) => {
  const { data, isSuccess, isLoading } = useMessages();
  const listRef = useRef<FL>(null);
  useMessagesUpdater();

  const scrollDownHandler = () => {
    listRef.current?.scrollToEnd();
  };

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
          ref={listRef}
          onContentSizeChange={scrollDownHandler}
          onLayout={scrollDownHandler}
          data={data}
          renderItem={({ item }) => <ChatCard message={item} key={item.id} />}
          contentContainerStyle={{ paddingVertical: 6 }}
        />
      )}
    </>
  );
};

export default ChatList;

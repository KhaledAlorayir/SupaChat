import { Center, FlatList, Spinner } from "native-base";
import { useUser } from "../../shared/store";
import useMessages from "../../shared/hooks/useMessages";
import ChatCard from "./ChatCard";

type Props = {};

const ChatList = (props: Props) => {
  const user = useUser((state) => state.session?.user);
  const { data, isSuccess, isLoading } = useMessages();

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

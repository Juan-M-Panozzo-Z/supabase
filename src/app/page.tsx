import Messages from "@/components/Messages";
import SendFile from "@/components/SendFile";
import SendMessage from "@/components/SendMessage";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <SendMessage />
          <Messages />
          {/* <SendFile /> */}
        </main>
    );
}

export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: { message: Message }) {
  if (!message || Object.keys(message).length === 0) return null;
  
  return (
    <div className="flex flex-col gap-2 w-full mt-4 text-sm">
      {"success" in message && (
        <div className="bg-mint/20 text-green-700 border-l-4 border-mint rounded-md px-4 py-3">
          {message.success}
        </div>
      )}
      {"error" in message && (
        <div className="bg-peach/20 text-red-700 border-l-4 border-peach rounded-md px-4 py-3">
          {message.error}
        </div>
      )}
      {"message" in message && (
        <div className="bg-lilac/20 text-gray-700 border-l-4 border-lilac rounded-md px-4 py-3">
          {message.message}
        </div>
      )}
    </div>
  );
}

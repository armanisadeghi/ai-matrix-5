// types/index.ts

import { Database } from "@/types/database.types";
// export * from '@/types/chat';
export * from "@/types/chat.types";
export * from "@/types/database.types";
export * from "@/types/layout.types";
export * from "@/types/requests.types";
export * from "@/types/settings.types";
export * from "@/types/user.types";

export type Chats = Database["public"]["Tables"]["chats"]["Row"];
export type ChatsInsert = Database["public"]["Tables"]["chats"]["Insert"];
export type ChatsUpdate = Database["public"]["Tables"]["chats"]["Update"];

export type ChatsCopy = Database["public"]["Tables"]["chats_copy"]["Row"];
export type ChatsCopyInsert = Database["public"]["Tables"]["chats_copy"]["Insert"];
export type ChatsCopyUpdate = Database["public"]["Tables"]["chats_copy"]["Update"];

export type Broker = Database["public"]["Tables"]["broker"]["Row"];
export type BrokerInsert = Database["public"]["Tables"]["broker"]["Insert"];
export type BrokerUpdate = Database["public"]["Tables"]["broker"]["Update"];

export type Category = Database["public"]["Tables"]["category"]["Row"];
export type CategoryInsert = Database["public"]["Tables"]["category"]["Insert"];
export type CategoryUpdate = Database["public"]["Tables"]["category"]["Update"];

export type Component = Database["public"]["Tables"]["component"]["Row"];
export type ComponentInsert = Database["public"]["Tables"]["component"]["Insert"];
export type ComponentUpdate = Database["public"]["Tables"]["component"]["Update"];

export type Messages = Database["public"]["Tables"]["messages"]["Row"];
export type MessagesInsert = Database["public"]["Tables"]["messages"]["Insert"];
export type MessagesUpdate = Database["public"]["Tables"]["messages"]["Update"];

export type Organization = Database["public"]["Tables"]["organization"]["Row"];
export type OrganizationInsert = Database["public"]["Tables"]["organization"]["Insert"];
export type OrganizationUpdate = Database["public"]["Tables"]["organization"]["Update"];

export type User = Database["public"]["Tables"]["user"]["Row"];
export type UserInsert = Database["public"]["Tables"]["user"]["Insert"];
export type UserUpdate = Database["public"]["Tables"]["user"]["Update"];

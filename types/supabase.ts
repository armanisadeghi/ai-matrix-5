export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      broker: {
        Row: {
          category: string
          component: Json | null
          created_at: string
          data_type: string
          default_value: string | null
          description: string | null
          id: string
          name: string
          official_name: string | null
          user_id: string | null
        }
        Insert: {
          category: string
          component?: Json | null
          created_at?: string
          data_type?: string
          default_value?: string | null
          description?: string | null
          id: string
          name: string
          official_name?: string | null
          user_id?: string | null
        }
        Update: {
          category?: string
          component?: Json | null
          created_at?: string
          data_type?: string
          default_value?: string | null
          description?: string | null
          id?: string
          name?: string
          official_name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      category: {
        Row: {
          created_at: string
          editable: boolean
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          editable?: boolean
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          editable?: boolean
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      chats: {
        Row: {
          chat_id: string
          chat_title: string
          created_at: string
          last_edited: string
          matrix_id: string
          metadata: Json | null
        }
        Insert: {
          chat_id?: string
          chat_title: string
          created_at?: string
          last_edited: string
          matrix_id?: string
          metadata?: Json | null
        }
        Update: {
          chat_id?: string
          chat_title?: string
          created_at?: string
          last_edited?: string
          matrix_id?: string
          metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "chats_user_id_fkey"
            columns: ["matrix_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["matrix_id"]
          },
        ]
      }
      chats_copy: {
        Row: {
          chat_id: string | null
          chat_title: string | null
          created_at: string | null
          last_edited: string | null
          matrix_id: string | null
          metadata: Json | null
        }
        Insert: {
          chat_id?: string | null
          chat_title?: string | null
          created_at?: string | null
          last_edited?: string | null
          matrix_id?: string | null
          metadata?: Json | null
        }
        Update: {
          chat_id?: string | null
          chat_title?: string | null
          created_at?: string | null
          last_edited?: string | null
          matrix_id?: string | null
          metadata?: Json | null
        }
        Relationships: []
      }
      component: {
        Row: {
          broker_id: string | null
          id: string
          type: Json | null
        }
        Insert: {
          broker_id?: string | null
          id?: string
          type?: Json | null
        }
        Update: {
          broker_id?: string | null
          id?: string
          type?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "component_broker_id_fkey"
            columns: ["broker_id"]
            isOneToOne: false
            referencedRelation: "broker"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          chat_id: string | null
          created_at: string
          id: string
          index: number | null
          message: string | null
          role: string | null
        }
        Insert: {
          chat_id?: string | null
          created_at?: string
          id?: string
          index?: number | null
          message?: string | null
          role?: string | null
        }
        Update: {
          chat_id?: string | null
          created_at?: string
          id?: string
          index?: number | null
          message?: string | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chat_messages_view"
            referencedColumns: ["chat_id"]
          },
          {
            foreignKeyName: "messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["chat_id"]
          },
        ]
      }
      organization: {
        Row: {
          created_at: string
          name: string | null
          org_id: string
          permissions: Json | null
          type: string | null
        }
        Insert: {
          created_at?: string
          name?: string | null
          org_id?: string
          permissions?: Json | null
          type?: string | null
        }
        Update: {
          created_at?: string
          name?: string | null
          org_id?: string
          permissions?: Json | null
          type?: string | null
        }
        Relationships: []
      }
      user: {
        Row: {
          account_status: string | null
          account_type: string | null
          auth0_id: string | null
          auth0_sid: string | null
          created_at: string | null
          email: string | null
          email_verified: boolean | null
          first_name: string | null
          full_name: string | null
          last_activity: string | null
          last_login: string | null
          last_name: string | null
          matrix_id: string
          nickname: string | null
          org_id: string | null
          phone: string | null
          phone_verified: boolean | null
          picture: string | null
          preferred_picture: string | null
          role: string | null
          updated_at: string
        }
        Insert: {
          account_status?: string | null
          account_type?: string | null
          auth0_id?: string | null
          auth0_sid?: string | null
          created_at?: string | null
          email?: string | null
          email_verified?: boolean | null
          first_name?: string | null
          full_name?: string | null
          last_activity?: string | null
          last_login?: string | null
          last_name?: string | null
          matrix_id?: string
          nickname?: string | null
          org_id?: string | null
          phone?: string | null
          phone_verified?: boolean | null
          picture?: string | null
          preferred_picture?: string | null
          role?: string | null
          updated_at?: string
        }
        Update: {
          account_status?: string | null
          account_type?: string | null
          auth0_id?: string | null
          auth0_sid?: string | null
          created_at?: string | null
          email?: string | null
          email_verified?: boolean | null
          first_name?: string | null
          full_name?: string | null
          last_activity?: string | null
          last_login?: string | null
          last_name?: string | null
          matrix_id?: string
          nickname?: string | null
          org_id?: string | null
          phone?: string | null
          phone_verified?: boolean | null
          picture?: string | null
          preferred_picture?: string | null
          role?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organization"
            referencedColumns: ["org_id"]
          },
        ]
      }
    }
    Views: {
      chat_messages_view: {
        Row: {
          chat_created_at: string | null
          chat_id: string | null
          chat_title: string | null
          index: number | null
          last_edited: string | null
          matrix_id: string | null
          message: string | null
          message_created_at: string | null
          message_id: string | null
          metadata: Json | null
          role: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chats_user_id_fkey"
            columns: ["matrix_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["matrix_id"]
          },
        ]
      }
    }
    Functions: {
      add_assistant_message: {
        Args: {
          chat_id: string
          message: string
        }
        Returns: undefined
      }
      add_custom_message: {
        Args: {
          chat_id: string
          role: string
          message: string
          message_index?: number
          message_created_at?: string
        }
        Returns: undefined
      }
      add_system_message: {
        Args: {
          chat_id: string
          message: string
        }
        Returns: undefined
      }
      add_user_message: {
        Args: {
          chat_id: string
          message: string
        }
        Returns: undefined
      }
      clone_and_edit_chat: {
        Args: {
          original_chat_id: string
          edited_index: number
          new_message: string
          new_message_role: string
        }
        Returns: {
          chat_id: string
          chat_title: string
          created_at: string
          last_edited: string
          matrix_id: string
          metadata: Json
          message_id: string
          role: string
          message: string
          message_created_at: string
          message_index: number
        }[]
      }
      clone_chat: {
        Args: {
          original_chat_id: string
        }
        Returns: {
          chat_id: string
          chat_title: string
          created_at: string
          last_edited: string
          matrix_id: string
          metadata: Json
          message_id: string
          role: string
          message: string
          message_created_at: string
          message_index: number
        }[]
      }
      fetch_user_chats: {
        Args: {
          user_matrix_id: string
        }
        Returns: {
          chat_id: string
          chat_title: string
          created_at: string
          last_edited: string
          matrix_id: string
          metadata: Json
        }[]
      }
      start_new_chat: {
        Args: {
          user_matrix_id: string
          system_message: string
          user_message: string
        }
        Returns: {
          chat_id: string
          chat_title: string
          created_at: string
          last_edited: string
          matrix_id: string
          metadata: Json
          message_id: string
          role: string
          message: string
          message_created_at: string
          message_index: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

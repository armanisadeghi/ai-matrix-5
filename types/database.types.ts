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
          component_type: string | null
          created_at: string
          data_type: string
          description: string | null
          display_name: string
          id: string
          matrix_id: string | null
          official_name: string | null
          sample_entries: string | null
          tooltip: string | null
          user_id: string | null
          validation_rules: Json | null
        }
        Insert: {
          component_type?: string | null
          created_at?: string
          data_type?: string
          description?: string | null
          display_name: string
          id: string
          matrix_id?: string | null
          official_name?: string | null
          sample_entries?: string | null
          tooltip?: string | null
          user_id?: string | null
          validation_rules?: Json | null
        }
        Update: {
          component_type?: string | null
          created_at?: string
          data_type?: string
          description?: string | null
          display_name?: string
          id?: string
          matrix_id?: string | null
          official_name?: string | null
          sample_entries?: string | null
          tooltip?: string | null
          user_id?: string | null
          validation_rules?: Json | null
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
          id: string
          type: string | null
        }
        Insert: {
          id?: string
          type?: string | null
        }
        Update: {
          id?: string
          type?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          chat_id: string | null
          created_at: string
          id: string
          index: number | null
          role: string | null
          text: string | null
        }
        Insert: {
          chat_id?: string | null
          created_at?: string
          id?: string
          index?: number | null
          role?: string | null
          text?: string | null
        }
        Update: {
          chat_id?: string | null
          created_at?: string
          id?: string
          index?: number | null
          role?: string | null
          text?: string | null
        }
        Relationships: [
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
          updated_at: string
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
      [_ in never]: never
    }
    Functions: {
      add_assistant_message: {
        Args: {
          chatid: string
          message: string
        }
        Returns: undefined
      }
      add_custom_message:
        | {
            Args: {
              chat_id: string
              id: string
              role: string
              text: string
              index?: number
              created_at?: string
            }
            Returns: undefined
          }
        | {
            Args: {
              chat_id: string
              role: string
              message: string
              created_at: string
              index: number
            }
            Returns: undefined
          }
        | {
            Args: {
              chatid: string
              role: string
              message: string
              messageindex?: number
              messagecreatedat?: string
            }
            Returns: undefined
          }
      add_multiple_custom_messages: {
        Args: {
          p_chat_id: string
          messages: Json[]
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
          chatId: string
          chatTitle: string
          createdAt: string
          lastEdited: string
          matrixId: string
          metadata: Json
          messages: Json
        }[]
      }
      clone_chat: {
        Args: {
          original_chat_id: string
        }
        Returns: {
          chatId: string
          chatTitle: string
          createdAt: string
          lastEdited: string
          matrixId: string
          metadata: Json
          messages: Json
        }[]
      }
      create_chat: {
        Args: {
          chat_data: string
        }
        Returns: string
      }
      create_chat_and_messages: {
        Args: {
          start_chat: Json
        }
        Returns: undefined
      }
      delete_chat: {
        Args: {
          input_chat_id: string
        }
        Returns: boolean
      }
      edit_message: {
        Args: {
          p_message_id: string
          p_updates: Json
        }
        Returns: undefined
      }
      fetch_chat_details: {
        Args: {
          user_matrix_id: string
        }
        Returns: {
          chatId: string
          chatTitle: string
          createdAt: string
          lastEdited: string
          matrixId: string
          metadata: Json
          messages: string[]
        }[]
      }
      fetch_chat_messages: {
        Args: {
          p_chat_id: string
        }
        Returns: {
          chatid: string
          messages: Json
        }[]
      }
      fetch_complete_chat_with_messages: {
        Args: {
          p_chat_id: string
        }
        Returns: Json
      }
      fetch_messages: {
        Args: {
          matrix_chat_id: string
        }
        Returns: {
          chatId: string
          createdAt: string
          id: string
          index: number
          text: string
          role: string
        }[]
      }
      fetch_user_chats: {
        Args: {
          user_matrix_id: string
        }
        Returns: {
          chatId: string
          chatTitle: string
          createdAt: string
          lastEdited: string
          matrixId: string
          metadata: Json
        }[]
      }
      generic_db_request_json: {
        Args: {
          _input_data: Json
        }
        Returns: Json
      }
      read_chat: {
        Args: {
          input_chat_id: string
        }
        Returns: Json
      }
      start_ai_chat: {
        Args: {
          p_chat_id: string
          p_chat_title: string
          p_created_at: string
          p_last_edited: string
          p_matrix_id: string
          p_metadata: Json
          m_id_1: string
          m_role_1: string
          m_text_1: string
          m_index_1: number
          m_created_at_1: string
          m_id_2: string
          m_role_2: string
          m_text_2: string
          m_index_2: number
          m_created_at_2: string
        }
        Returns: {
          chatId: string
          chatTitle: string
          createdAt: string
          lastEdited: string
          matrixId: string
          metadata: Json
          messageId: string
          messageRole: string
          messageText: string
          messageIndex: number
          messageCreatedAt: string
        }[]
      }
      start_chat: {
        Args: {
          p_user_matrix_id: string
          p_new_chat_id: string
          p_new_chat_title: string
          p_new_system_entry: Json
          p_new_user_entry: Json
        }
        Returns: string
      }
      start_new_chat: {
        Args: {
          user_matrix_id: string
          system_message: string
          user_message: string
        }
        Returns: {
          chatId: string
          chatTitle: string
          createdAt: string
          lastEdited: string
          matrixId: string
          metadata: Json
          messages: Json
        }[]
      }
      update_chat: {
        Args: {
          chat_data: Json
        }
        Returns: Json
      }
      update_chat_title: {
        Args: {
          input_chat_id: string
          new_title: string
        }
        Returns: Json
      }
      upsert_from_auth0: {
        Args: {
          p_auth0_id: string
          p_auth0_sid: string
          p_first_name: string
          p_last_name: string
          p_email: string
          p_email_verified: boolean
          p_full_name: string
          p_nickname: string
          p_picture: string
          p_updated_at: string
          p_phone: string
          p_phone_verified: boolean
        }
        Returns: {
          matrixId: string
          auth0Id: string
          auth0Sid: string
          createdAt: string
          firstName: string
          lastName: string
          nickname: string
          fullName: string
          picture: string
          updatedAt: string
          accountType: string
          accountStatus: string
          orgId: string
          role: string
          phone: string
          phoneVerified: boolean
          email: string
          emailVerified: boolean
          preferredPicture: string
          lastLogin: string
          lastActivity: string
        }[]
      }
      upsert_user: {
        Args: {
          p_auth0_id: string
          p_auth0_sid: string
          p_first_name: string
          p_last_name: string
          p_email: string
          p_email_verified: boolean
          p_full_name: string
          p_nickname: string
          p_picture: string
          p_updated_at: string
          p_phone: string
          p_phone_verified: boolean
        }
        Returns: {
          matrixId: string
          auth0Id: string
          auth0Sid: string
          createdAt: string
          firstName: string
          lastName: string
          nickname: string
          fullName: string
          picture: string
          updatedAt: string
          accountType: string
          accountStatus: string
          orgId: string
          role: string
          phone: string
          phoneVerified: boolean
          email: string
          emailVerified: boolean
          preferredPicture: string
          lastLogin: string
          lastActivity: string
        }[]
      }
      upsert_with_any_data: {
        Args: {
          p_matrix_id: string
          p_updated_at: string
          p_first_name?: string
          p_last_name?: string
          p_nickname?: string
          p_full_name?: string
          p_picture?: string
          p_account_type?: string
          p_account_status?: string
          p_org_id?: string
          p_role?: string
          p_phone?: string
          p_phone_verified?: boolean
          p_email?: string
          p_email_verified?: boolean
          p_preferred_picture?: string
          p_last_login?: string
          p_last_activity?: string
        }
        Returns: {
          matrixId: string
          firstName: string
          lastName: string
          nickname: string
          fullName: string
          picture: string
          updatedAt: string
          accountType: string
          accountStatus: string
          orgId: string
          role: string
          phone: string
          phoneVerified: boolean
          email: string
          emailVerified: boolean
          preferredPicture: string
          lastLogin: string
          lastActivity: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      chat_messages_response_type: {
        chat_id: string | null
        messages: Database["public"]["CompositeTypes"]["message_type"][] | null
      }
      chat_type: {
        chat_id: string | null
        chat_title: string | null
        created_at: string | null
        last_edited: string | null
        matrix_id: string | null
        metadata: Json | null
      }
      message_type: {
        chat_id: string | null
        created_at: string | null
        id: string | null
        index: number | null
        text: string | null
        role: string | null
      }
      simple_message_type: {
        index: number | null
        text: string | null
        role: string | null
      }
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

// test

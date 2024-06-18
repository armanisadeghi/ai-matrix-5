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
          messages_array: Json[] | null
          metadata: Json | null
          user_id: string
        }
        Insert: {
          chat_id?: string
          chat_title: string
          created_at?: string
          last_edited: string
          messages_array?: Json[] | null
          metadata?: Json | null
          user_id: string
        }
        Update: {
          chat_id?: string
          chat_title?: string
          created_at?: string
          last_edited?: string
          messages_array?: Json[] | null
          metadata?: Json | null
          user_id?: string
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
      user_old: {
        Row: {
          accountType: string | null
          created_at: string
          email: string | null
          firstName: string | null
          id: string
          lastActivity: string | null
          lastLogin: string | null
          lastName: string | null
          organizationId: string | null
          phone: string | null
          role: string | null
          status: string | null
          token: string | null
          updated_at: string | null
        }
        Insert: {
          accountType?: string | null
          created_at?: string
          email?: string | null
          firstName?: string | null
          id?: string
          lastActivity?: string | null
          lastLogin?: string | null
          lastName?: string | null
          organizationId?: string | null
          phone?: string | null
          role?: string | null
          status?: string | null
          token?: string | null
          updated_at?: string | null
        }
        Update: {
          accountType?: string | null
          created_at?: string
          email?: string | null
          firstName?: string | null
          id?: string
          lastActivity?: string | null
          lastLogin?: string | null
          lastName?: string | null
          organizationId?: string | null
          phone?: string | null
          role?: string | null
          status?: string | null
          token?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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


export type MatrixUser = Database['public']['Tables']['user']['Row'];

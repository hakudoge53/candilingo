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
      glossaries: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          organization_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          organization_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          organization_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "glossaries_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      glossary_settings: {
        Row: {
          created_at: string
          id: string
          public_glossary_enabled: boolean
          selected_glossary_ids: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          public_glossary_enabled?: boolean
          selected_glossary_ids?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          public_glossary_enabled?: boolean
          selected_glossary_ids?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      glossary_terms: {
        Row: {
          category: string | null
          created_at: string
          definition: string
          glossary_id: string
          id: string
          term: string
          updated_at: string
          url: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          definition: string
          glossary_id: string
          id?: string
          term: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          definition?: string
          glossary_id?: string
          id?: string
          term?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "glossary_terms_glossary_id_fkey"
            columns: ["glossary_id"]
            isOneToOne: false
            referencedRelation: "glossaries"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_licenses: {
        Row: {
          created_at: string
          id: string
          license_type: string
          organization_id: string
          total_licenses: number
          updated_at: string
          used_licenses: number
        }
        Insert: {
          created_at?: string
          id?: string
          license_type?: string
          organization_id: string
          total_licenses?: number
          updated_at?: string
          used_licenses?: number
        }
        Update: {
          created_at?: string
          id?: string
          license_type?: string
          organization_id?: string
          total_licenses?: number
          updated_at?: string
          used_licenses?: number
        }
        Relationships: [
          {
            foreignKeyName: "organization_licenses_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_members: {
        Row: {
          created_at: string
          id: string
          invitation_token: string | null
          invited_email: string | null
          invited_name: string | null
          organization_id: string
          role: Database["public"]["Enums"]["user_role"]
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          invitation_token?: string | null
          invited_email?: string | null
          invited_name?: string | null
          organization_id: string
          role?: Database["public"]["Enums"]["user_role"]
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          invitation_token?: string | null
          invited_email?: string | null
          invited_name?: string | null
          organization_id?: string
          role?: Database["public"]["Enums"]["user_role"]
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          active: boolean
          created_at: string
          created_by: string
          id: string
          name: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          created_by: string
          id?: string
          name: string
        }
        Update: {
          active?: boolean
          created_at?: string
          created_by?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          customer_portal_id: string | null
          email: string | null
          extension_settings: Json | null
          id: string
          membership_tier: string | null
          name: string | null
          preferred_language: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          customer_portal_id?: string | null
          email?: string | null
          extension_settings?: Json | null
          id: string
          membership_tier?: string | null
          name?: string | null
          preferred_language?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          customer_portal_id?: string | null
          email?: string | null
          extension_settings?: Json | null
          id?: string
          membership_tier?: string | null
          name?: string | null
          preferred_language?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      referral_codes: {
        Row: {
          code: string
          created_at: string | null
          created_by: string | null
          description: string | null
          duration_months: number
          id: string
          is_active: boolean
          usage_count: number | null
          usage_limit: number | null
        }
        Insert: {
          code: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duration_months?: number
          id?: string
          is_active?: boolean
          usage_count?: number | null
          usage_limit?: number | null
        }
        Update: {
          code?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duration_months?: number
          id?: string
          is_active?: boolean
          usage_count?: number | null
          usage_limit?: number | null
        }
        Relationships: []
      }
      referral_usage: {
        Row: {
          applied_at: string | null
          expires_at: string
          id: string
          referral_code_id: string
          user_id: string
        }
        Insert: {
          applied_at?: string | null
          expires_at: string
          id?: string
          referral_code_id: string
          user_id: string
        }
        Update: {
          applied_at?: string | null
          expires_at?: string
          id?: string
          referral_code_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "referral_usage_referral_code_id_fkey"
            columns: ["referral_code_id"]
            isOneToOne: false
            referencedRelation: "referral_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          created_at: string
          id: string
          is_team_manager: boolean
          member_id: string
          team_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_team_manager?: boolean
          member_id: string
          team_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_team_manager?: boolean
          member_id?: string
          team_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "organization_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          organization_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          organization_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          organization_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "teams_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      techlingo_terms: {
        Row: {
          category: string | null
          created_at: string
          definition: string
          difficulty: string | null
          id: string
          term: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          definition: string
          difficulty?: string | null
          id?: string
          term: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          definition?: string
          difficulty?: string | null
          id?: string
          term?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          active_organization_id: string | null
          created_at: string | null
          highlight_color: string | null
          highlight_enabled: boolean | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          active_organization_id?: string | null
          created_at?: string | null
          highlight_color?: string | null
          highlight_enabled?: boolean | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          active_organization_id?: string | null
          created_at?: string | null
          highlight_color?: string | null
          highlight_enabled?: boolean | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_column_to_table: {
        Args: {
          table_name: string
          column_name: string
          column_type: string
          column_default: string
        }
        Returns: undefined
      }
      akeys: {
        Args: {
          "": unknown
        }
        Returns: string[]
      }
      avals: {
        Args: {
          "": unknown
        }
        Returns: string[]
      }
      check_column_exists: {
        Args: {
          table_name: string
          column_name: string
        }
        Returns: boolean
      }
      citext:
        | {
            Args: {
              "": boolean
            }
            Returns: string
          }
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
      citext_hash: {
        Args: {
          "": string
        }
        Returns: number
      }
      citextin: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      citextout: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      citextrecv: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      citextsend: {
        Args: {
          "": string
        }
        Returns: string
      }
      each: {
        Args: {
          hs: unknown
        }
        Returns: Record<string, unknown>[]
      }
      ghstore_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ghstore_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ghstore_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ghstore_options: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      ghstore_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_options: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      gtrgm_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      has_role: {
        Args: {
          org_id: string
          required_role: Database["public"]["Enums"]["user_role"]
        }
        Returns: boolean
      }
      hstore:
        | {
            Args: {
              "": string[]
            }
            Returns: unknown
          }
        | {
            Args: {
              "": Record<string, unknown>
            }
            Returns: unknown
          }
      hstore_hash: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      hstore_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hstore_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hstore_recv: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hstore_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      hstore_subscript_handler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hstore_to_array: {
        Args: {
          "": unknown
        }
        Returns: string[]
      }
      hstore_to_json: {
        Args: {
          "": unknown
        }
        Returns: Json
      }
      hstore_to_json_loose: {
        Args: {
          "": unknown
        }
        Returns: Json
      }
      hstore_to_jsonb: {
        Args: {
          "": unknown
        }
        Returns: Json
      }
      hstore_to_jsonb_loose: {
        Args: {
          "": unknown
        }
        Returns: Json
      }
      hstore_to_matrix: {
        Args: {
          "": unknown
        }
        Returns: string[]
      }
      hstore_version_diag: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      set_limit: {
        Args: {
          "": number
        }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: {
          "": string
        }
        Returns: string[]
      }
      skeys: {
        Args: {
          "": unknown
        }
        Returns: string[]
      }
      svals: {
        Args: {
          "": unknown
        }
        Returns: string[]
      }
    }
    Enums: {
      user_role: "admin" | "manager" | "team_lead" | "employee" | "consultant"
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

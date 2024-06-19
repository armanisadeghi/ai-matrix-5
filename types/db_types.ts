export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

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
                        foreignKeyName: 'component_broker_id_fkey'
                        columns: ['broker_id']
                        isOneToOne: false
                        referencedRelation: 'broker'
                        referencedColumns: ['id']
                    }
                ]
            }
            matrix_user: {
                Row: {
                    account_type: string | null
                    auth0_id: string | null
                    created_at: string | null
                    email: string | null
                    last_activity: string | null
                    last_login: string | null
                    name: string | null
                    nickname: string | null
                    org_id: string | null
                    phone: string | null
                    picture: string | null
                    role: string | null
                    status: string | null
                    token: string | null
                    updated_at: string | null
                    user_id: string
                }
                Insert: {
                    account_type?: string | null
                    auth0_id?: string | null
                    created_at?: string | null
                    email?: string | null
                    last_activity?: string | null
                    last_login?: string | null
                    name?: string | null
                    nickname?: string | null
                    org_id?: string | null
                    phone?: string | null
                    picture?: string | null
                    role?: string | null
                    status?: string | null
                    token?: string | null
                    updated_at?: string | null
                    user_id?: string
                }
                Update: {
                    account_type?: string | null
                    auth0_id?: string | null
                    created_at?: string | null
                    email?: string | null
                    last_activity?: string | null
                    last_login?: string | null
                    name?: string | null
                    nickname?: string | null
                    org_id?: string | null
                    phone?: string | null
                    picture?: string | null
                    role?: string | null
                    status?: string | null
                    token?: string | null
                    updated_at?: string | null
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'matrix_user_org_id_fkey'
                        columns: ['org_id']
                        isOneToOne: false
                        referencedRelation: 'organization'
                        referencedColumns: ['org_id']
                    }
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
            a_sample_actioname: {
                Row: {
                    action_type: string | null
                    description: string | null
                    id: number
                    name: string
                    params: Json | null
                }
                Insert: {
                    action_type?: string | null
                    description?: string | null
                    id?: number
                    name: string
                    params?: Json | null
                }
                Update: {
                    action_type?: string | null
                    description?: string | null
                    id?: number
                    name?: string
                    params?: Json | null
                }
                Relationships: []
            }
            a_sample_actionfunctioname: {
                Row: {
                    action_id: number | null
                    function_id: number | null
                    id: number
                    order: number
                    role: string
                }
                Insert: {
                    action_id?: number | null
                    function_id?: number | null
                    id?: number
                    order: number
                    role: string
                }
                Update: {
                    action_id?: number | null
                    function_id?: number | null
                    id?: number
                    order?: number
                    role?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'a_sample_actionfunct_action_id_48723932_fk_a_sample_'
                        columns: ['action_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_actioname'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'a_sample_actionfunct_function_id_9b20a353_fk_a_sample_'
                        columns: ['function_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_functioname'
                        referencedColumns: ['id']
                    }
                ]
            }
            a_sample_actioninputame: {
                Row: {
                    action_id: number
                    data_type: string
                    default_value: string | null
                    dynamic_processing: boolean
                    function_arg_id: number | null
                    id: number
                    is_required: boolean
                    name: string
                    source_type: string | null
                    used_as: string | null
                    variable_id: number | null
                }
                Insert: {
                    action_id: number
                    data_type: string
                    default_value?: string | null
                    dynamic_processing: boolean
                    function_arg_id?: number | null
                    id?: number
                    is_required: boolean
                    name: string
                    source_type?: string | null
                    used_as?: string | null
                    variable_id?: number | null
                }
                Update: {
                    action_id?: number
                    data_type?: string
                    default_value?: string | null
                    dynamic_processing?: boolean
                    function_arg_id?: number | null
                    id?: number
                    is_required?: boolean
                    name?: string
                    source_type?: string | null
                    used_as?: string | null
                    variable_id?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'a_sample_actioninput_action_id_e0bc123f_fk_a_sample_'
                        columns: ['action_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_actioname'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'a_sample_actioninput_function_arg_id_3252b65e_fk_a_sample_'
                        columns: ['function_arg_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_argumentame'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'a_sample_actioninput_variable_id_2686ffef_fk_a_sample_'
                        columns: ['variable_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_latticevariableame'
                        referencedColumns: ['id']
                    }
                ]
            }
            a_sample_actionoutputame: {
                Row: {
                    action_id: number
                    data_type: string
                    default_value: string | null
                    destination_type: string | null
                    function_return_id: number | null
                    id: number
                    is_guaranteed: boolean
                    is_stream: boolean
                    name: string
                    variable_id: number | null
                }
                Insert: {
                    action_id: number
                    data_type: string
                    default_value?: string | null
                    destination_type?: string | null
                    function_return_id?: number | null
                    id?: number
                    is_guaranteed: boolean
                    is_stream: boolean
                    name: string
                    variable_id?: number | null
                }
                Update: {
                    action_id?: number
                    data_type?: string
                    default_value?: string | null
                    destination_type?: string | null
                    function_return_id?: number | null
                    id?: number
                    is_guaranteed?: boolean
                    is_stream?: boolean
                    name?: string
                    variable_id?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'a_sample_actionoutpu_action_id_cd15b0bd_fk_a_sample_'
                        columns: ['action_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_actioname'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'a_sample_actionoutpu_function_return_id_e5b320c1_fk_a_sample_'
                        columns: ['function_return_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_returname'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'a_sample_actionoutpu_variable_id_0fe4e6d3_fk_a_sample_'
                        columns: ['variable_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_latticevariableame'
                        referencedColumns: ['id']
                    }
                ]
            }
            a_sample_argumentame: {
                Row: {
                    data_type: string
                    default_value: string | null
                    function_id: number | null
                    id: number
                    is_required: boolean
                    name: string
                }
                Insert: {
                    data_type: string
                    default_value?: string | null
                    function_id?: number | null
                    id?: number
                    is_required: boolean
                    name: string
                }
                Update: {
                    data_type?: string
                    default_value?: string | null
                    function_id?: number | null
                    id?: number
                    is_required?: boolean
                    name?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'a_sample_argumentame_function_id_a7b3ef3c_fk_a_sample_'
                        columns: ['function_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_functioname'
                        referencedColumns: ['id']
                    }
                ]
            }
            a_sample_compiledaction: {
                Row: {
                    access_control: Json | null
                    action_id: number
                    id: number
                    is_active: boolean
                    name: string | null
                    structure: Json | null
                    workflow_id: number
                }
                Insert: {
                    access_control?: Json | null
                    action_id: number
                    id?: number
                    is_active: boolean
                    name?: string | null
                    structure?: Json | null
                    workflow_id: number
                }
                Update: {
                    access_control?: Json | null
                    action_id?: number
                    id?: number
                    is_active?: boolean
                    name?: string | null
                    structure?: Json | null
                    workflow_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'a_sample_compiledact_action_id_38c7b2ce_fk_a_sample_'
                        columns: ['action_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_actioname'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'a_sample_compiledact_workflow_id_7008db3a_fk_a_sample_'
                        columns: ['workflow_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_compiledworkflow'
                        referencedColumns: ['id']
                    }
                ]
            }
            a_sample_compiledlattice: {
                Row: {
                    actions: Json | null
                    args: Json | null
                    compiled_lattice: Json | null
                    functions: Json | null
                    id: number
                    inputs: Json | null
                    instructions: Json | null
                    lattice_id_id: number | null
                    maps: Json | null
                    name: string | null
                    outputs: Json | null
                    returns: Json | null
                    variables: Json | null
                    version_id: number | null
                }
                Insert: {
                    actions?: Json | null
                    args?: Json | null
                    compiled_lattice?: Json | null
                    functions?: Json | null
                    id?: number
                    inputs?: Json | null
                    instructions?: Json | null
                    lattice_id_id?: number | null
                    maps?: Json | null
                    name?: string | null
                    outputs?: Json | null
                    returns?: Json | null
                    variables?: Json | null
                    version_id?: number | null
                }
                Update: {
                    actions?: Json | null
                    args?: Json | null
                    compiled_lattice?: Json | null
                    functions?: Json | null
                    id?: number
                    inputs?: Json | null
                    instructions?: Json | null
                    lattice_id_id?: number | null
                    maps?: Json | null
                    name?: string | null
                    outputs?: Json | null
                    returns?: Json | null
                    variables?: Json | null
                    version_id?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'a_sample_compiledlat_lattice_id_id_459f298a_fk_a_sample_'
                        columns: ['lattice_id_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_latticeame'
                        referencedColumns: ['id']
                    }
                ]
            }
            a_sample_compiledworkflow: {
                Row: {
                    access_control: Json | null
                    description: string | null
                    id: number
                    is_active: boolean
                    name: string | null
                    structure: Json | null
                }
                Insert: {
                    access_control?: Json | null
                    description?: string | null
                    id?: number
                    is_active: boolean
                    name?: string | null
                    structure?: Json | null
                }
                Update: {
                    access_control?: Json | null
                    description?: string | null
                    id?: number
                    is_active?: boolean
                    name?: string | null
                    structure?: Json | null
                }
                Relationships: []
            }
            a_sample_elementoptionsame: {
                Row: {
                    default_value: string | null
                    events: Json | null
                    help_options: Json | null
                    id: number
                    type: string | null
                    used_for: string | null
                    validations: Json | null
                    visual_options: Json | null
                }
                Insert: {
                    default_value?: string | null
                    events?: Json | null
                    help_options?: Json | null
                    id?: number
                    type?: string | null
                    used_for?: string | null
                    validations?: Json | null
                    visual_options?: Json | null
                }
                Update: {
                    default_value?: string | null
                    events?: Json | null
                    help_options?: Json | null
                    id?: number
                    type?: string | null
                    used_for?: string | null
                    validations?: Json | null
                    visual_options?: Json | null
                }
                Relationships: []
            }
            a_sample_functioname: {
                Row: {
                    description: string | null
                    function_name: string | null
                    id: number
                    is_async: boolean
                    module_path: string | null
                    name: string
                }
                Insert: {
                    description?: string | null
                    function_name?: string | null
                    id?: number
                    is_async: boolean
                    module_path?: string | null
                    name: string
                }
                Update: {
                    description?: string | null
                    function_name?: string | null
                    id?: number
                    is_async?: boolean
                    module_path?: string | null
                    name?: string
                }
                Relationships: []
            }
            a_sample_hyperclusterame: {
                Row: {
                    description: string | null
                    id: number
                    name: string
                    params: Json | null
                }
                Insert: {
                    description?: string | null
                    id?: number
                    name: string
                    params?: Json | null
                }
                Update: {
                    description?: string | null
                    id?: number
                    name?: string
                    params?: Json | null
                }
                Relationships: []
            }
            a_sample_hyperclusterlatticeame: {
                Row: {
                    hypercluster_id: number | null
                    id: number
                    lattice_id: number | null
                    order: number | null
                }
                Insert: {
                    hypercluster_id?: number | null
                    id?: number
                    lattice_id?: number | null
                    order?: number | null
                }
                Update: {
                    hypercluster_id?: number | null
                    id?: number
                    lattice_id?: number | null
                    order?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'a_sample_hypercluste_hypercluster_id_d80a96b3_fk_a_sample_'
                        columns: ['hypercluster_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_hyperclusterame'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'a_sample_hypercluste_lattice_id_355bbe15_fk_a_sample_'
                        columns: ['lattice_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_latticeame'
                        referencedColumns: ['id']
                    }
                ]
            }
            a_sample_latticeactioname: {
                Row: {
                    action_id: number | null
                    id: number
                    lattice_id: number | null
                    order: number | null
                }
                Insert: {
                    action_id?: number | null
                    id?: number
                    lattice_id?: number | null
                    order?: number | null
                }
                Update: {
                    action_id?: number | null
                    id?: number
                    lattice_id?: number | null
                    order?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'a_sample_latticeacti_action_id_a4f4c978_fk_a_sample_'
                        columns: ['action_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_actioname'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'a_sample_latticeacti_lattice_id_d01bf6d9_fk_a_sample_'
                        columns: ['lattice_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_latticeame'
                        referencedColumns: ['id']
                    }
                ]
            }
            a_sample_latticeame: {
                Row: {
                    description: string | null
                    id: number
                    name: string
                    params: Json | null
                }
                Insert: {
                    description?: string | null
                    id?: number
                    name: string
                    params?: Json | null
                }
                Update: {
                    description?: string | null
                    id?: number
                    name?: string
                    params?: Json | null
                }
                Relationships: []
            }
            a_sample_latticeruntimevariables: {
                Row: {
                    args: Json | null
                    conversion_map: Json | null
                    data_type: string
                    dynamic: boolean
                    id: number
                    inputs: Json | null
                    lattice_id: number
                    name: string
                    outputs: Json | null
                    parent: number
                    ready: boolean
                    returns: Json | null
                    value: string | null
                }
                Insert: {
                    args?: Json | null
                    conversion_map?: Json | null
                    data_type: string
                    dynamic: boolean
                    id?: number
                    inputs?: Json | null
                    lattice_id: number
                    name: string
                    outputs?: Json | null
                    parent: number
                    ready: boolean
                    returns?: Json | null
                    value?: string | null
                }
                Update: {
                    args?: Json | null
                    conversion_map?: Json | null
                    data_type?: string
                    dynamic?: boolean
                    id?: number
                    inputs?: Json | null
                    lattice_id?: number
                    name?: string
                    outputs?: Json | null
                    parent?: number
                    ready?: boolean
                    returns?: Json | null
                    value?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'a_sample_latticerunt_lattice_id_d86f20f9_fk_a_sample_'
                        columns: ['lattice_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_runtimelattice'
                        referencedColumns: ['id']
                    }
                ]
            }
            a_sample_latticevariableame: {
                Row: {
                    data_type: string
                    default_value: string | null
                    destination_type: string | null
                    id: number
                    is_dynamic: boolean
                    name: string
                    source_type: string | null
                }
                Insert: {
                    data_type: string
                    default_value?: string | null
                    destination_type?: string | null
                    id?: number
                    is_dynamic: boolean
                    name: string
                    source_type?: string | null
                }
                Update: {
                    data_type?: string
                    default_value?: string | null
                    destination_type?: string | null
                    id?: number
                    is_dynamic?: boolean
                    name?: string
                    source_type?: string | null
                }
                Relationships: []
            }
            a_sample_returname: {
                Row: {
                    data_type: string
                    function_id: number | null
                    id: number
                    is_guaranteed: boolean
                    is_stream: boolean
                    name: string
                }
                Insert: {
                    data_type: string
                    function_id?: number | null
                    id?: number
                    is_guaranteed: boolean
                    is_stream: boolean
                    name: string
                }
                Update: {
                    data_type?: string
                    function_id?: number | null
                    id?: number
                    is_guaranteed?: boolean
                    is_stream?: boolean
                    name?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'a_sample_returname_function_id_6166ebc6_fk_a_sample_'
                        columns: ['function_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_functioname'
                        referencedColumns: ['id']
                    }
                ]
            }
            a_sample_runtimearguments: {
                Row: {
                    arg_params: Json | null
                    compiled_action_id: number | null
                    data_type: string | null
                    db_read_params: Json | null
                    db_write_params: Json | null
                    destination_type: string | null
                    id: number
                    is_dynamic: boolean
                    name: string | null
                    return_params: Json | null
                    runtime_instance_id: number
                    source_type: string | null
                    user_input_params: Json | null
                    user_output_params: Json | null
                    value: string | null
                    variable_id: number | null
                }
                Insert: {
                    arg_params?: Json | null
                    compiled_action_id?: number | null
                    data_type?: string | null
                    db_read_params?: Json | null
                    db_write_params?: Json | null
                    destination_type?: string | null
                    id?: number
                    is_dynamic: boolean
                    name?: string | null
                    return_params?: Json | null
                    runtime_instance_id: number
                    source_type?: string | null
                    user_input_params?: Json | null
                    user_output_params?: Json | null
                    value?: string | null
                    variable_id?: number | null
                }
                Update: {
                    arg_params?: Json | null
                    compiled_action_id?: number | null
                    data_type?: string | null
                    db_read_params?: Json | null
                    db_write_params?: Json | null
                    destination_type?: string | null
                    id?: number
                    is_dynamic?: boolean
                    name?: string | null
                    return_params?: Json | null
                    runtime_instance_id?: number
                    source_type?: string | null
                    user_input_params?: Json | null
                    user_output_params?: Json | null
                    value?: string | null
                    variable_id?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'a_sample_runtimeargu_compiled_action_id_4da667bc_fk_a_sample_'
                        columns: ['compiled_action_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_compiledaction'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'a_sample_runtimeargu_runtime_instance_id_88249e3f_fk_a_sample_'
                        columns: ['runtime_instance_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_workflowinstance'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'a_sample_runtimeargu_variable_id_257e5c66_fk_a_sample_'
                        columns: ['variable_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_latticevariableame'
                        referencedColumns: ['id']
                    }
                ]
            }
            a_sample_runtimelattice: {
                Row: {
                    actions: Json | null
                    args: Json | null
                    blueprint: Json | null
                    compiled_id_id: number | null
                    functions: Json | null
                    id: number
                    inputs: Json | null
                    maps: Json | null
                    name: string | null
                    outputs: Json | null
                    params: Json | null
                    returns: Json | null
                    state: Json | null
                    status: string
                    version: string
                }
                Insert: {
                    actions?: Json | null
                    args?: Json | null
                    blueprint?: Json | null
                    compiled_id_id?: number | null
                    functions?: Json | null
                    id?: number
                    inputs?: Json | null
                    maps?: Json | null
                    name?: string | null
                    outputs?: Json | null
                    params?: Json | null
                    returns?: Json | null
                    state?: Json | null
                    status: string
                    version: string
                }
                Update: {
                    actions?: Json | null
                    args?: Json | null
                    blueprint?: Json | null
                    compiled_id_id?: number | null
                    functions?: Json | null
                    id?: number
                    inputs?: Json | null
                    maps?: Json | null
                    name?: string | null
                    outputs?: Json | null
                    params?: Json | null
                    returns?: Json | null
                    state?: Json | null
                    status?: string
                    version?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'a_sample_runtimelatt_compiled_id_id_3d698cab_fk_a_sample_'
                        columns: ['compiled_id_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_compiledlattice'
                        referencedColumns: ['id']
                    }
                ]
            }
            a_sample_variableactioname: {
                Row: {
                    action_default_id: number | null
                    default_value: string | null
                    destination_type: string | null
                    id: number
                    is_dynamic: boolean
                    source_type: string | null
                    variable_id: number | null
                }
                Insert: {
                    action_default_id?: number | null
                    default_value?: string | null
                    destination_type?: string | null
                    id?: number
                    is_dynamic: boolean
                    source_type?: string | null
                    variable_id?: number | null
                }
                Update: {
                    action_default_id?: number | null
                    default_value?: string | null
                    destination_type?: string | null
                    id?: number
                    is_dynamic?: boolean
                    source_type?: string | null
                    variable_id?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'a_sample_variableact_action_default_id_5dc45d0f_fk_a_sample_'
                        columns: ['action_default_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_actioname'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'a_sample_variableact_variable_id_de22234c_fk_a_sample_'
                        columns: ['variable_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_latticevariableame'
                        referencedColumns: ['id']
                    }
                ]
            }
            a_sample_variableargame: {
                Row: {
                    function_arg_id: number | null
                    id: number
                    variable_id: number | null
                }
                Insert: {
                    function_arg_id?: number | null
                    id?: number
                    variable_id?: number | null
                }
                Update: {
                    function_arg_id?: number | null
                    id?: number
                    variable_id?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'a_sample_variablearg_function_arg_id_195b8188_fk_a_sample_'
                        columns: ['function_arg_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_argumentame'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'a_sample_variablearg_variable_id_2398279a_fk_a_sample_'
                        columns: ['variable_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_latticevariableame'
                        referencedColumns: ['id']
                    }
                ]
            }
            a_sample_variabledbreadame: {
                Row: {
                    fields_to_retrieve: string
                    id: number
                    query_conditions: Json
                    table_name: string
                    variable_id: number
                }
                Insert: {
                    fields_to_retrieve: string
                    id?: number
                    query_conditions: Json
                    table_name: string
                    variable_id: number
                }
                Update: {
                    fields_to_retrieve?: string
                    id?: number
                    query_conditions?: Json
                    table_name?: string
                    variable_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'a_sample_variabledbr_variable_id_aa956ea6_fk_a_sample_'
                        columns: ['variable_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_latticevariableame'
                        referencedColumns: ['id']
                    }
                ]
            }
            a_sample_variabledbwriteame: {
                Row: {
                    data_to_write: Json
                    id: number
                    table_name: string
                    variable_id: number
                }
                Insert: {
                    data_to_write: Json
                    id?: number
                    table_name: string
                    variable_id: number
                }
                Update: {
                    data_to_write?: Json
                    id?: number
                    table_name?: string
                    variable_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'a_sample_variabledbw_variable_id_a913a822_fk_a_sample_'
                        columns: ['variable_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_latticevariableame'
                        referencedColumns: ['id']
                    }
                ]
            }
            a_sample_variablereturname: {
                Row: {
                    function_return_id: number | null
                    id: number
                    variable_id: number | null
                }
                Insert: {
                    function_return_id?: number | null
                    id?: number
                    variable_id?: number | null
                }
                Update: {
                    function_return_id?: number | null
                    id?: number
                    variable_id?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'a_sample_variableret_function_return_id_5506c6b5_fk_a_sample_'
                        columns: ['function_return_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_returname'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'a_sample_variableret_variable_id_f79876df_fk_a_sample_'
                        columns: ['variable_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_latticevariableame'
                        referencedColumns: ['id']
                    }
                ]
            }
            a_sample_variableuserinputame: {
                Row: {
                    element_id: number | null
                    element_params: Json | null
                    id: number
                    input_params: Json | null
                    variable_id: number | null
                }
                Insert: {
                    element_id?: number | null
                    element_params?: Json | null
                    id?: number
                    input_params?: Json | null
                    variable_id?: number | null
                }
                Update: {
                    element_id?: number | null
                    element_params?: Json | null
                    id?: number
                    input_params?: Json | null
                    variable_id?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'a_sample_variableuse_element_id_a6471b22_fk_a_sample_'
                        columns: ['element_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_elementoptionsame'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'a_sample_variableuse_variable_id_5850ca3c_fk_a_sample_'
                        columns: ['variable_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_latticevariableame'
                        referencedColumns: ['id']
                    }
                ]
            }
            a_sample_variableuseroutputame: {
                Row: {
                    element_id: number | null
                    element_params: Json | null
                    id: number
                    output_params: Json | null
                    variable_id: number | null
                }
                Insert: {
                    element_id?: number | null
                    element_params?: Json | null
                    id?: number
                    output_params?: Json | null
                    variable_id?: number | null
                }
                Update: {
                    element_id?: number | null
                    element_params?: Json | null
                    id?: number
                    output_params?: Json | null
                    variable_id?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'a_sample_variableuse_element_id_20353ae3_fk_a_sample_'
                        columns: ['element_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_elementoptionsame'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'a_sample_variableuse_variable_id_9f528d62_fk_a_sample_'
                        columns: ['variable_id']
                        isOneToOne: false
                        referencedRelation: 'a_sample_latticevariableame'
                        referencedColumns: ['id']
                    }
                ]
            }
            a_sample_workflowinstance: {
                Row: {
                    id: number
                    next_step: Json | null
                    params: Json | null
                    runtime_instance: Json | null
                    status: string | null
                }
                Insert: {
                    id?: number
                    next_step?: Json | null
                    params?: Json | null
                    runtime_instance?: Json | null
                    status?: string | null
                }
                Update: {
                    id?: number
                    next_step?: Json | null
                    params?: Json | null
                    runtime_instance?: Json | null
                    status?: string | null
                }
                Relationships: []
            }
            a_starter_actiontemplate: {
                Row: {
                    action_type: string | null
                    actionDetails: Json | null
                    definedVariables: Json | null
                    description: string | null
                    dynamicVariables: boolean | null
                    function_id: number | null
                    functionCall: Json | null
                    id: number
                    name: string
                    optionalArgs: Json | null
                    post_processing_function_id: number | null
                    requireArgs: Json | null
                    returns_map: Json | null
                }
                Insert: {
                    action_type?: string | null
                    actionDetails?: Json | null
                    definedVariables?: Json | null
                    description?: string | null
                    dynamicVariables?: boolean | null
                    function_id?: number | null
                    functionCall?: Json | null
                    id?: number
                    name: string
                    optionalArgs?: Json | null
                    post_processing_function_id?: number | null
                    requireArgs?: Json | null
                    returns_map?: Json | null
                }
                Update: {
                    action_type?: string | null
                    actionDetails?: Json | null
                    definedVariables?: Json | null
                    description?: string | null
                    dynamicVariables?: boolean | null
                    function_id?: number | null
                    functionCall?: Json | null
                    id?: number
                    name?: string
                    optionalArgs?: Json | null
                    post_processing_function_id?: number | null
                    requireArgs?: Json | null
                    returns_map?: Json | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'a_starter_actiontemp_function_id_1d1331e0_fk_a_starter'
                        columns: ['function_id']
                        isOneToOne: false
                        referencedRelation: 'a_starter_amefunctionregistry'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'a_starter_actiontemp_post_processing_func_c2ccfada_fk_a_starter'
                        columns: ['post_processing_function_id']
                        isOneToOne: false
                        referencedRelation: 'a_starter_amefunctionregistry'
                        referencedColumns: ['id']
                    }
                ]
            }
            a_starter_actionvariant: {
                Row: {
                    action_template_id: number | null
                    id: number
                    input_map: Json | null
                    is_deleted: boolean
                    output_map: Json | null
                    overrides: Json | null
                    params: Json | null
                    variant_name: string
                }
                Insert: {
                    action_template_id?: number | null
                    id?: number
                    input_map?: Json | null
                    is_deleted: boolean
                    output_map?: Json | null
                    overrides?: Json | null
                    params?: Json | null
                    variant_name: string
                }
                Update: {
                    action_template_id?: number | null
                    id?: number
                    input_map?: Json | null
                    is_deleted?: boolean
                    output_map?: Json | null
                    overrides?: Json | null
                    params?: Json | null
                    variant_name?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'a_starter_actionvari_action_template_id_f15b7502_fk_a_starter'
                        columns: ['action_template_id']
                        isOneToOne: false
                        referencedRelation: 'a_starter_actiontemplate'
                        referencedColumns: ['id']
                    }
                ]
            }
            a_starter_amefunctionregistry: {
                Row: {
                    additional_params: Json | null
                    args: Json | null
                    async_function: boolean
                    description: string | null
                    function_name: string | null
                    id: number
                    module_path: string | null
                    name: string
                    returns: Json | null
                }
                Insert: {
                    additional_params?: Json | null
                    args?: Json | null
                    async_function: boolean
                    description?: string | null
                    function_name?: string | null
                    id?: number
                    module_path?: string | null
                    name: string
                    returns?: Json | null
                }
                Update: {
                    additional_params?: Json | null
                    args?: Json | null
                    async_function?: boolean
                    description?: string | null
                    function_name?: string | null
                    id?: number
                    module_path?: string | null
                    name?: string
                    returns?: Json | null
                }
                Relationships: []
            }
            a_starter_functionarg: {
                Row: {
                    data_type: string
                    default: string | null
                    function_id: number | null
                    id: number
                    is_required: boolean
                    is_validated: boolean
                    name: string
                    sample_data: string | null
                }
                Insert: {
                    data_type: string
                    default?: string | null
                    function_id?: number | null
                    id?: number
                    is_required: boolean
                    is_validated: boolean
                    name: string
                    sample_data?: string | null
                }
                Update: {
                    data_type?: string
                    default?: string | null
                    function_id?: number | null
                    id?: number
                    is_required?: boolean
                    is_validated?: boolean
                    name?: string
                    sample_data?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'a_starter_functionar_function_id_beba903e_fk_a_starter'
                        columns: ['function_id']
                        isOneToOne: false
                        referencedRelation: 'a_starter_amefunctionregistry'
                        referencedColumns: ['id']
                    }
                ]
            }
            a_starter_functionreturn: {
                Row: {
                    data_type: string
                    function_id: number | null
                    id: number
                    is_required: boolean
                    is_validated: boolean
                    name: string
                    sample_data: string | null
                }
                Insert: {
                    data_type: string
                    function_id?: number | null
                    id?: number
                    is_required: boolean
                    is_validated: boolean
                    name: string
                    sample_data?: string | null
                }
                Update: {
                    data_type?: string
                    function_id?: number | null
                    id?: number
                    is_required?: boolean
                    is_validated?: boolean
                    name?: string
                    sample_data?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'a_starter_functionre_function_id_bb15bb16_fk_a_starter'
                        columns: ['function_id']
                        isOneToOne: false
                        referencedRelation: 'a_starter_amefunctionregistry'
                        referencedColumns: ['id']
                    }
                ]
            }
            a_starter_runtimearguments: {
                Row: {
                    data_type: string | null
                    id: number
                    name: string | null
                    runtime_instance_id: number
                    value: string | null
                }
                Insert: {
                    data_type?: string | null
                    id?: number
                    name?: string | null
                    runtime_instance_id: number
                    value?: string | null
                }
                Update: {
                    data_type?: string | null
                    id?: number
                    name?: string | null
                    runtime_instance_id?: number
                    value?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'a_starter_argumentva_runtime_instance_id_1117e292_fk_a_starter'
                        columns: ['runtime_instance_id']
                        isOneToOne: false
                        referencedRelation: 'a_starter_runtimeinstance'
                        referencedColumns: ['id']
                    }
                ]
            }
            a_starter_runtimeinstance: {
                Row: {
                    id: number
                    next_step: Json | null
                    runtime_instance: Json | null
                    status: string | null
                }
                Insert: {
                    id?: number
                    next_step?: Json | null
                    runtime_instance?: Json | null
                    status?: string | null
                }
                Update: {
                    id?: number
                    next_step?: Json | null
                    runtime_instance?: Json | null
                    status?: string | null
                }
                Relationships: []
            }
            account_emailaddress: {
                Row: {
                    email: string
                    id: number
                    primary: boolean
                    user_id: number
                    verified: boolean
                }
                Insert: {
                    email: string
                    id?: number
                    primary: boolean
                    user_id: number
                    verified: boolean
                }
                Update: {
                    email?: string
                    id?: number
                    primary?: boolean
                    user_id?: number
                    verified?: boolean
                }
                Relationships: [
                    {
                        foreignKeyName: 'account_emailaddress_user_id_2c513194_fk_auth_user_id'
                        columns: ['user_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    }
                ]
            }
            account_emailconfirmation: {
                Row: {
                    created: string
                    email_address_id: number
                    id: number
                    key: string
                    sent: string | null
                }
                Insert: {
                    created: string
                    email_address_id: number
                    id?: number
                    key: string
                    sent?: string | null
                }
                Update: {
                    created?: string
                    email_address_id?: number
                    id?: number
                    key?: string
                    sent?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'account_emailconfirm_email_address_id_5b7f8c58_fk_account_e'
                        columns: ['email_address_id']
                        isOneToOne: false
                        referencedRelation: 'account_emailaddress'
                        referencedColumns: ['id']
                    }
                ]
            }
            ai_infinity_matrix_action: {
                Row: {
                    additional_params: Json | null
                    description: string | null
                    function_id: number
                    id: number
                    is_active: boolean
                    is_user_input: boolean
                    is_user_output: boolean
                    name: string
                }
                Insert: {
                    additional_params?: Json | null
                    description?: string | null
                    function_id: number
                    id?: number
                    is_active: boolean
                    is_user_input: boolean
                    is_user_output: boolean
                    name: string
                }
                Update: {
                    additional_params?: Json | null
                    description?: string | null
                    function_id?: number
                    id?: number
                    is_active?: boolean
                    is_user_input?: boolean
                    is_user_output?: boolean
                    name?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'ai_infinity_matrix_a_function_id_e18928c5_fk_ai_infini'
                        columns: ['function_id']
                        isOneToOne: false
                        referencedRelation: 'ai_infinity_matrix_functionregistry'
                        referencedColumns: ['id']
                    }
                ]
            }
            ai_infinity_matrix_actionargmapping: {
                Row: {
                    action_id: number
                    arg_id: number
                    composite_template: string | null
                    id: number
                    is_composite: boolean
                }
                Insert: {
                    action_id: number
                    arg_id: number
                    composite_template?: string | null
                    id?: number
                    is_composite: boolean
                }
                Update: {
                    action_id?: number
                    arg_id?: number
                    composite_template?: string | null
                    id?: number
                    is_composite?: boolean
                }
                Relationships: [
                    {
                        foreignKeyName: 'ai_infinity_matrix_a_action_id_98787fd2_fk_ai_infini'
                        columns: ['action_id']
                        isOneToOne: false
                        referencedRelation: 'ai_infinity_matrix_action'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'ai_infinity_matrix_a_arg_id_aa90db1d_fk_ai_infini'
                        columns: ['arg_id']
                        isOneToOne: false
                        referencedRelation: 'ai_infinity_matrix_functionarg'
                        referencedColumns: ['id']
                    }
                ]
            }
            ai_infinity_matrix_actionreturnmapping: {
                Row: {
                    action_id: number
                    id: number
                    return_val_id: number
                    target_variable_id: number | null
                }
                Insert: {
                    action_id: number
                    id?: number
                    return_val_id: number
                    target_variable_id?: number | null
                }
                Update: {
                    action_id?: number
                    id?: number
                    return_val_id?: number
                    target_variable_id?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'ai_infinity_matrix_a_action_id_3b076266_fk_ai_infini'
                        columns: ['action_id']
                        isOneToOne: false
                        referencedRelation: 'ai_infinity_matrix_action'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'ai_infinity_matrix_a_return_val_id_62f0cbf8_fk_ai_infini'
                        columns: ['return_val_id']
                        isOneToOne: false
                        referencedRelation: 'ai_infinity_matrix_functionreturn'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'ai_infinity_matrix_a_target_variable_id_535dbf1b_fk_ai_infini'
                        columns: ['target_variable_id']
                        isOneToOne: false
                        referencedRelation: 'ai_infinity_matrix_variable'
                        referencedColumns: ['id']
                    }
                ]
            }
            ai_infinity_matrix_compositevariablemapping: {
                Row: {
                    arg_mapping_id: number
                    function_return_id: number | null
                    id: number
                    variable_id: number | null
                }
                Insert: {
                    arg_mapping_id: number
                    function_return_id?: number | null
                    id?: number
                    variable_id?: number | null
                }
                Update: {
                    arg_mapping_id?: number
                    function_return_id?: number | null
                    id?: number
                    variable_id?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'ai_infinity_matrix_c_arg_mapping_id_2d159cc9_fk_ai_infini'
                        columns: ['arg_mapping_id']
                        isOneToOne: false
                        referencedRelation: 'ai_infinity_matrix_actionargmapping'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'ai_infinity_matrix_c_function_return_id_dd2f7b63_fk_ai_infini'
                        columns: ['function_return_id']
                        isOneToOne: false
                        referencedRelation: 'ai_infinity_matrix_functionreturn'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'ai_infinity_matrix_c_variable_id_c45d7b0f_fk_ai_infini'
                        columns: ['variable_id']
                        isOneToOne: false
                        referencedRelation: 'ai_infinity_matrix_variable'
                        referencedColumns: ['id']
                    }
                ]
            }
            ai_infinity_matrix_functionarg: {
                Row: {
                    arg_name: string
                    data_type: string
                    default_value: string | null
                    description: string | null
                    function_id: number
                    id: number
                    required: boolean
                }
                Insert: {
                    arg_name: string
                    data_type: string
                    default_value?: string | null
                    description?: string | null
                    function_id: number
                    id?: number
                    required: boolean
                }
                Update: {
                    arg_name?: string
                    data_type?: string
                    default_value?: string | null
                    description?: string | null
                    function_id?: number
                    id?: number
                    required?: boolean
                }
                Relationships: [
                    {
                        foreignKeyName: 'ai_infinity_matrix_f_function_id_631e5d04_fk_ai_infini'
                        columns: ['function_id']
                        isOneToOne: false
                        referencedRelation: 'ai_infinity_matrix_functionregistry'
                        referencedColumns: ['id']
                    }
                ]
            }
            ai_infinity_matrix_functionregistry: {
                Row: {
                    additional_params: Json | null
                    app_name: string | null
                    description: string | null
                    entity_name: string | null
                    id: number
                    is_class: boolean
                    method_name: string | null
                    module_path: string | null
                    name: string
                }
                Insert: {
                    additional_params?: Json | null
                    app_name?: string | null
                    description?: string | null
                    entity_name?: string | null
                    id?: number
                    is_class: boolean
                    method_name?: string | null
                    module_path?: string | null
                    name: string
                }
                Update: {
                    additional_params?: Json | null
                    app_name?: string | null
                    description?: string | null
                    entity_name?: string | null
                    id?: number
                    is_class?: boolean
                    method_name?: string | null
                    module_path?: string | null
                    name?: string
                }
                Relationships: []
            }
            ai_infinity_matrix_functionreturn: {
                Row: {
                    data_type: string
                    description: string | null
                    function_id: number
                    id: number
                    return_name: string
                }
                Insert: {
                    data_type: string
                    description?: string | null
                    function_id: number
                    id?: number
                    return_name: string
                }
                Update: {
                    data_type?: string
                    description?: string | null
                    function_id?: number
                    id?: number
                    return_name?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'ai_infinity_matrix_f_function_id_4252ab8d_fk_ai_infini'
                        columns: ['function_id']
                        isOneToOne: false
                        referencedRelation: 'ai_infinity_matrix_functionregistry'
                        referencedColumns: ['id']
                    }
                ]
            }
            ai_infinity_matrix_hypercluster: {
                Row: {
                    additional_params: Json | null
                    description: string | null
                    id: number
                    is_active: boolean
                    name: string
                }
                Insert: {
                    additional_params?: Json | null
                    description?: string | null
                    id?: number
                    is_active: boolean
                    name: string
                }
                Update: {
                    additional_params?: Json | null
                    description?: string | null
                    id?: number
                    is_active?: boolean
                    name?: string
                }
                Relationships: []
            }
            ai_infinity_matrix_hyperclusterlattice: {
                Row: {
                    dependency_id: number | null
                    hypercluster_id: number
                    id: number
                    lattice_id: number
                    sequence_order: number
                }
                Insert: {
                    dependency_id?: number | null
                    hypercluster_id: number
                    id?: number
                    lattice_id: number
                    sequence_order: number
                }
                Update: {
                    dependency_id?: number | null
                    hypercluster_id?: number
                    id?: number
                    lattice_id?: number
                    sequence_order?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'ai_infinity_matrix_h_dependency_id_28606b1a_fk_ai_infini'
                        columns: ['dependency_id']
                        isOneToOne: false
                        referencedRelation: 'ai_infinity_matrix_hyperclusterlattice'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'ai_infinity_matrix_h_hypercluster_id_352cd119_fk_ai_infini'
                        columns: ['hypercluster_id']
                        isOneToOne: false
                        referencedRelation: 'ai_infinity_matrix_hypercluster'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'ai_infinity_matrix_h_lattice_id_bf44fe77_fk_ai_infini'
                        columns: ['lattice_id']
                        isOneToOne: false
                        referencedRelation: 'ai_infinity_matrix_lattice'
                        referencedColumns: ['id']
                    }
                ]
            }
            ai_infinity_matrix_lattice: {
                Row: {
                    additional_params: Json | null
                    description: string | null
                    id: number
                    name: string
                }
                Insert: {
                    additional_params?: Json | null
                    description?: string | null
                    id?: number
                    name: string
                }
                Update: {
                    additional_params?: Json | null
                    description?: string | null
                    id?: number
                    name?: string
                }
                Relationships: []
            }
            ai_infinity_matrix_latticeaction: {
                Row: {
                    action_id: number
                    depends_on_id: number | null
                    id: number
                    lattice_id: number
                    order: number
                }
                Insert: {
                    action_id: number
                    depends_on_id?: number | null
                    id?: number
                    lattice_id: number
                    order: number
                }
                Update: {
                    action_id?: number
                    depends_on_id?: number | null
                    id?: number
                    lattice_id?: number
                    order?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'ai_infinity_matrix_l_action_id_2c938ce5_fk_ai_infini'
                        columns: ['action_id']
                        isOneToOne: false
                        referencedRelation: 'ai_infinity_matrix_action'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'ai_infinity_matrix_l_depends_on_id_501bf3b5_fk_ai_infini'
                        columns: ['depends_on_id']
                        isOneToOne: false
                        referencedRelation: 'ai_infinity_matrix_latticeaction'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'ai_infinity_matrix_l_lattice_id_b6ba5a37_fk_ai_infini'
                        columns: ['lattice_id']
                        isOneToOne: false
                        referencedRelation: 'ai_infinity_matrix_lattice'
                        referencedColumns: ['id']
                    }
                ]
            }
            ai_infinity_matrix_variable: {
                Row: {
                    data_type: string
                    description: string | null
                    id: number
                    name: string
                }
                Insert: {
                    data_type: string
                    description?: string | null
                    id?: number
                    name: string
                }
                Update: {
                    data_type?: string
                    description?: string | null
                    id?: number
                    name?: string
                }
                Relationships: []
            }
            api_management_apiconfiguration: {
                Row: {
                    api_version: string | null
                    auth_key_ref: string | null
                    base_url: string | null
                    environment: string | null
                    id: number
                    name: string | null
                    rate_limit_info: Json | null
                    request_headers: Json | null
                    status: string | null
                    timeout: number | null
                }
                Insert: {
                    api_version?: string | null
                    auth_key_ref?: string | null
                    base_url?: string | null
                    environment?: string | null
                    id?: number
                    name?: string | null
                    rate_limit_info?: Json | null
                    request_headers?: Json | null
                    status?: string | null
                    timeout?: number | null
                }
                Update: {
                    api_version?: string | null
                    auth_key_ref?: string | null
                    base_url?: string | null
                    environment?: string | null
                    id?: number
                    name?: string | null
                    rate_limit_info?: Json | null
                    request_headers?: Json | null
                    status?: string | null
                    timeout?: number | null
                }
                Relationships: []
            }
            api_management_apiendpoint: {
                Row: {
                    api_id: number
                    endpoint_name: string | null
                    endpoint_path: string | null
                    id: number
                    method: string | null
                }
                Insert: {
                    api_id: number
                    endpoint_name?: string | null
                    endpoint_path?: string | null
                    id?: number
                    method?: string | null
                }
                Update: {
                    api_id?: number
                    endpoint_name?: string | null
                    endpoint_path?: string | null
                    id?: number
                    method?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'api_management_apien_api_id_36297de3_fk_api_manag'
                        columns: ['api_id']
                        isOneToOne: false
                        referencedRelation: 'api_management_apiconfiguration'
                        referencedColumns: ['id']
                    }
                ]
            }
            api_management_apiparameter: {
                Row: {
                    default_value: string | null
                    description: string | null
                    endpoint_id: number
                    id: number
                    is_required: string | null
                    param_name: string | null
                    param_type: string | null
                }
                Insert: {
                    default_value?: string | null
                    description?: string | null
                    endpoint_id: number
                    id?: number
                    is_required?: string | null
                    param_name?: string | null
                    param_type?: string | null
                }
                Update: {
                    default_value?: string | null
                    description?: string | null
                    endpoint_id?: number
                    id?: number
                    is_required?: string | null
                    param_name?: string | null
                    param_type?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'api_management_apipa_endpoint_id_c81e2591_fk_api_manag'
                        columns: ['endpoint_id']
                        isOneToOne: false
                        referencedRelation: 'api_management_apiendpoint'
                        referencedColumns: ['id']
                    }
                ]
            }
            api_management_apiresponse: {
                Row: {
                    endpoint_id: number
                    id: number
                    response_structure: Json | null
                }
                Insert: {
                    endpoint_id: number
                    id?: number
                    response_structure?: Json | null
                }
                Update: {
                    endpoint_id?: number
                    id?: number
                    response_structure?: Json | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'api_management_apire_endpoint_id_c6fc0c9a_fk_api_manag'
                        columns: ['endpoint_id']
                        isOneToOne: true
                        referencedRelation: 'api_management_apiendpoint'
                        referencedColumns: ['id']
                    }
                ]
            }
            audit_log_auditlog: {
                Row: {
                    action: string
                    data: Json | null
                    id: number
                    identifier: string
                    model: string
                    timestamp: string
                    user_id: number
                }
                Insert: {
                    action: string
                    data?: Json | null
                    id?: number
                    identifier: string
                    model: string
                    timestamp: string
                    user_id: number
                }
                Update: {
                    action?: string
                    data?: Json | null
                    id?: number
                    identifier?: string
                    model?: string
                    timestamp?: string
                    user_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'audit_log_auditlog_user_id_e60de996_fk_auth_user_id'
                        columns: ['user_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    }
                ]
            }
            auth_group: {
                Row: {
                    id: number
                    name: string
                }
                Insert: {
                    id?: number
                    name: string
                }
                Update: {
                    id?: number
                    name?: string
                }
                Relationships: []
            }
            auth_group_permissions: {
                Row: {
                    group_id: number
                    id: number
                    permission_id: number
                }
                Insert: {
                    group_id: number
                    id?: number
                    permission_id: number
                }
                Update: {
                    group_id?: number
                    id?: number
                    permission_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'auth_group_permissio_permission_id_84c5c92e_fk_auth_perm'
                        columns: ['permission_id']
                        isOneToOne: false
                        referencedRelation: 'auth_permission'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'auth_group_permissions_group_id_b120cbf9_fk_auth_group_id'
                        columns: ['group_id']
                        isOneToOne: false
                        referencedRelation: 'auth_group'
                        referencedColumns: ['id']
                    }
                ]
            }
            auth_permission: {
                Row: {
                    codename: string
                    content_type_id: number
                    id: number
                    name: string
                }
                Insert: {
                    codename: string
                    content_type_id: number
                    id?: number
                    name: string
                }
                Update: {
                    codename?: string
                    content_type_id?: number
                    id?: number
                    name?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'auth_permission_content_type_id_2f476e4b_fk_django_co'
                        columns: ['content_type_id']
                        isOneToOne: false
                        referencedRelation: 'django_content_type'
                        referencedColumns: ['id']
                    }
                ]
            }
            auth_user: {
                Row: {
                    date_joined: string
                    email: string
                    first_name: string
                    id: number
                    is_active: boolean
                    is_staff: boolean
                    is_superuser: boolean
                    last_login: string | null
                    last_name: string
                    password: string
                    username: string
                }
                Insert: {
                    date_joined: string
                    email: string
                    first_name: string
                    id?: number
                    is_active: boolean
                    is_staff: boolean
                    is_superuser: boolean
                    last_login?: string | null
                    last_name: string
                    password: string
                    username: string
                }
                Update: {
                    date_joined?: string
                    email?: string
                    first_name?: string
                    id?: number
                    is_active?: boolean
                    is_staff?: boolean
                    is_superuser?: boolean
                    last_login?: string | null
                    last_name?: string
                    password?: string
                    username?: string
                }
                Relationships: []
            }
            auth_user_groups: {
                Row: {
                    group_id: number
                    id: number
                    user_id: number
                }
                Insert: {
                    group_id: number
                    id?: number
                    user_id: number
                }
                Update: {
                    group_id?: number
                    id?: number
                    user_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'auth_user_groups_group_id_97559544_fk_auth_group_id'
                        columns: ['group_id']
                        isOneToOne: false
                        referencedRelation: 'auth_group'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'auth_user_groups_user_id_6a12ed8b_fk_auth_user_id'
                        columns: ['user_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    }
                ]
            }
            auth_user_user_permissions: {
                Row: {
                    id: number
                    permission_id: number
                    user_id: number
                }
                Insert: {
                    id?: number
                    permission_id: number
                    user_id: number
                }
                Update: {
                    id?: number
                    permission_id?: number
                    user_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm'
                        columns: ['permission_id']
                        isOneToOne: false
                        referencedRelation: 'auth_permission'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id'
                        columns: ['user_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    }
                ]
            }
            authtoken_token: {
                Row: {
                    created: string
                    key: string
                    user_id: number
                }
                Insert: {
                    created: string
                    key: string
                    user_id: number
                }
                Update: {
                    created?: string
                    key?: string
                    user_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'authtoken_token_user_id_35299eff_fk_auth_user_id'
                        columns: ['user_id']
                        isOneToOne: true
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    }
                ]
            }
            business_workflows_action: {
                Row: {
                    action_data: Json
                    action_type: string
                    id: number
                    task_instance_id: number
                }
                Insert: {
                    action_data: Json
                    action_type: string
                    id?: number
                    task_instance_id: number
                }
                Update: {
                    action_data?: Json
                    action_type?: string
                    id?: number
                    task_instance_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'business_workflows_a_task_instance_id_972dd870_fk_business_'
                        columns: ['task_instance_id']
                        isOneToOne: false
                        referencedRelation: 'business_workflows_taskinstance'
                        referencedColumns: ['id']
                    }
                ]
            }
            business_workflows_decisionpoint: {
                Row: {
                    decision_logic: Json
                    id: number
                    task_id: number
                }
                Insert: {
                    decision_logic: Json
                    id?: number
                    task_id: number
                }
                Update: {
                    decision_logic?: Json
                    id?: number
                    task_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'business_workflows_d_task_id_eb333679_fk_business_'
                        columns: ['task_id']
                        isOneToOne: false
                        referencedRelation: 'business_workflows_task'
                        referencedColumns: ['id']
                    }
                ]
            }
            business_workflows_notification: {
                Row: {
                    created_at: string
                    id: number
                    is_read: boolean
                    message: string
                    user_id: number
                    workflow_instance_id: number | null
                }
                Insert: {
                    created_at: string
                    id?: number
                    is_read: boolean
                    message: string
                    user_id: number
                    workflow_instance_id?: number | null
                }
                Update: {
                    created_at?: string
                    id?: number
                    is_read?: boolean
                    message?: string
                    user_id?: number
                    workflow_instance_id?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'business_workflows_n_user_id_4cc153cb_fk_auth_user'
                        columns: ['user_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'business_workflows_n_workflow_instance_id_579f3bff_fk_business_'
                        columns: ['workflow_instance_id']
                        isOneToOne: false
                        referencedRelation: 'business_workflows_workflowinstance'
                        referencedColumns: ['id']
                    }
                ]
            }
            business_workflows_task: {
                Row: {
                    id: number
                    name: string
                    next_task_id: number | null
                    task_data: Json
                    task_type: string
                    workflow_id: number
                }
                Insert: {
                    id?: number
                    name: string
                    next_task_id?: number | null
                    task_data: Json
                    task_type: string
                    workflow_id: number
                }
                Update: {
                    id?: number
                    name?: string
                    next_task_id?: number | null
                    task_data?: Json
                    task_type?: string
                    workflow_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'business_workflows_t_next_task_id_e388c2c1_fk_business_'
                        columns: ['next_task_id']
                        isOneToOne: false
                        referencedRelation: 'business_workflows_task'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'business_workflows_t_workflow_id_3b299647_fk_business_'
                        columns: ['workflow_id']
                        isOneToOne: false
                        referencedRelation: 'business_workflows_workflow'
                        referencedColumns: ['id']
                    }
                ]
            }
            business_workflows_taskinstance: {
                Row: {
                    id: number
                    output: Json
                    state: string
                    task_id: number
                    workflow_instance_id: number
                }
                Insert: {
                    id?: number
                    output: Json
                    state: string
                    task_id: number
                    workflow_instance_id: number
                }
                Update: {
                    id?: number
                    output?: Json
                    state?: string
                    task_id?: number
                    workflow_instance_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'business_workflows_t_task_id_13477bb7_fk_business_'
                        columns: ['task_id']
                        isOneToOne: false
                        referencedRelation: 'business_workflows_task'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'business_workflows_t_workflow_instance_id_13f8373f_fk_business_'
                        columns: ['workflow_instance_id']
                        isOneToOne: false
                        referencedRelation: 'business_workflows_workflowinstance'
                        referencedColumns: ['id']
                    }
                ]
            }
            business_workflows_userworkflowpermission: {
                Row: {
                    can_edit: boolean
                    can_execute: boolean
                    can_view: boolean
                    id: number
                    user_id: number
                    workflow_id: number
                }
                Insert: {
                    can_edit: boolean
                    can_execute: boolean
                    can_view: boolean
                    id?: number
                    user_id: number
                    workflow_id: number
                }
                Update: {
                    can_edit?: boolean
                    can_execute?: boolean
                    can_view?: boolean
                    id?: number
                    user_id?: number
                    workflow_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'business_workflows_u_user_id_0f66159c_fk_auth_user'
                        columns: ['user_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'business_workflows_u_workflow_id_5c3b36d5_fk_business_'
                        columns: ['workflow_id']
                        isOneToOne: false
                        referencedRelation: 'business_workflows_workflow'
                        referencedColumns: ['id']
                    }
                ]
            }
            business_workflows_workflow: {
                Row: {
                    created_at: string
                    created_by_id: number
                    description: string
                    id: number
                    is_active: boolean
                    layout_data: Json | null
                    name: string
                    owner_id: number
                    version: number
                }
                Insert: {
                    created_at: string
                    created_by_id: number
                    description: string
                    id?: number
                    is_active: boolean
                    layout_data?: Json | null
                    name: string
                    owner_id: number
                    version: number
                }
                Update: {
                    created_at?: string
                    created_by_id?: number
                    description?: string
                    id?: number
                    is_active?: boolean
                    layout_data?: Json | null
                    name?: string
                    owner_id?: number
                    version?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'business_workflows_w_created_by_id_6780bf5a_fk_auth_user'
                        columns: ['created_by_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'business_workflows_workflow_owner_id_763df9d9_fk_auth_user_id'
                        columns: ['owner_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    }
                ]
            }
            business_workflows_workflowinstance: {
                Row: {
                    context: Json
                    id: number
                    state: string
                    workflow_id: number
                }
                Insert: {
                    context: Json
                    id?: number
                    state: string
                    workflow_id: number
                }
                Update: {
                    context?: Json
                    id?: number
                    state?: string
                    workflow_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'business_workflows_w_workflow_id_a439f51a_fk_business_'
                        columns: ['workflow_id']
                        isOneToOne: false
                        referencedRelation: 'business_workflows_workflow'
                        referencedColumns: ['id']
                    }
                ]
            }
            client_management_client: {
                Row: {
                    address_line_1: string | null
                    address_line_2: string | null
                    city: string | null
                    client_official_name: string | null
                    client_short_name: string | null
                    company_name: string
                    country: string | null
                    id: number
                    notes: string | null
                    phone1: string | null
                    phone2: string | null
                    primary_contact_user_id: number | null
                    secondary_contact_user_id: number | null
                    state: string | null
                    zip: string | null
                }
                Insert: {
                    address_line_1?: string | null
                    address_line_2?: string | null
                    city?: string | null
                    client_official_name?: string | null
                    client_short_name?: string | null
                    company_name: string
                    country?: string | null
                    id?: number
                    notes?: string | null
                    phone1?: string | null
                    phone2?: string | null
                    primary_contact_user_id?: number | null
                    secondary_contact_user_id?: number | null
                    state?: string | null
                    zip?: string | null
                }
                Update: {
                    address_line_1?: string | null
                    address_line_2?: string | null
                    city?: string | null
                    client_official_name?: string | null
                    client_short_name?: string | null
                    company_name?: string
                    country?: string | null
                    id?: number
                    notes?: string | null
                    phone1?: string | null
                    phone2?: string | null
                    primary_contact_user_id?: number | null
                    secondary_contact_user_id?: number | null
                    state?: string | null
                    zip?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'client_management_cl_primary_contact_user_28186967_fk_auth_user'
                        columns: ['primary_contact_user_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'client_management_cl_secondary_contact_us_198650ef_fk_auth_user'
                        columns: ['secondary_contact_user_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    }
                ]
            }
            common_jsonfieldtemplate: {
                Row: {
                    content_type_id: number
                    created_at: string
                    field_name: string
                    id: number
                    template: Json
                    updated_at: string
                    version: number
                }
                Insert: {
                    content_type_id: number
                    created_at: string
                    field_name: string
                    id?: number
                    template: Json
                    updated_at: string
                    version: number
                }
                Update: {
                    content_type_id?: number
                    created_at?: string
                    field_name?: string
                    id?: number
                    template?: Json
                    updated_at?: string
                    version?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'common_jsonfieldtemp_content_type_id_6f3fb934_fk_django_co'
                        columns: ['content_type_id']
                        isOneToOne: false
                        referencedRelation: 'django_content_type'
                        referencedColumns: ['id']
                    }
                ]
            }
            common_usersessiondata: {
                Row: {
                    id: number
                    session_json: Json | null
                    socket_id: string | null
                    timestamp: string
                    url: string | null
                    user_id: number
                }
                Insert: {
                    id?: number
                    session_json?: Json | null
                    socket_id?: string | null
                    timestamp: string
                    url?: string | null
                    user_id: number
                }
                Update: {
                    id?: number
                    session_json?: Json | null
                    socket_id?: string | null
                    timestamp?: string
                    url?: string | null
                    user_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'common_usersessiondata_user_id_2dcb3a54_fk_auth_user_id'
                        columns: ['user_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    }
                ]
            }
            content_management_aicliche: {
                Row: {
                    cliche: string
                    id: number
                    info: string | null
                    params: Json | null
                    severity: string
                    type: string
                }
                Insert: {
                    cliche: string
                    id?: number
                    info?: string | null
                    params?: Json | null
                    severity: string
                    type: string
                }
                Update: {
                    cliche?: string
                    id?: number
                    info?: string | null
                    params?: Json | null
                    severity?: string
                    type?: string
                }
                Relationships: []
            }
            content_management_contentsilo: {
                Row: {
                    description: string
                    id: number
                    name: string
                    website_id: number
                }
                Insert: {
                    description: string
                    id?: number
                    name: string
                    website_id: number
                }
                Update: {
                    description?: string
                    id?: number
                    name?: string
                    website_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'content_management_c_website_id_72e9c565_fk_website_m'
                        columns: ['website_id']
                        isOneToOne: false
                        referencedRelation: 'website_management_clientwebsite'
                        referencedColumns: ['id']
                    }
                ]
            }
            django_admin_log: {
                Row: {
                    action_flag: number
                    action_time: string
                    change_message: string
                    content_type_id: number | null
                    id: number
                    object_id: string | null
                    object_repr: string
                    user_id: number
                }
                Insert: {
                    action_flag: number
                    action_time: string
                    change_message: string
                    content_type_id?: number | null
                    id?: number
                    object_id?: string | null
                    object_repr: string
                    user_id: number
                }
                Update: {
                    action_flag?: number
                    action_time?: string
                    change_message?: string
                    content_type_id?: number | null
                    id?: number
                    object_id?: string | null
                    object_repr?: string
                    user_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'django_admin_log_content_type_id_c4bce8eb_fk_django_co'
                        columns: ['content_type_id']
                        isOneToOne: false
                        referencedRelation: 'django_content_type'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'django_admin_log_user_id_c564eba6_fk_auth_user_id'
                        columns: ['user_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    }
                ]
            }
            django_content_type: {
                Row: {
                    app_label: string
                    id: number
                    model: string
                }
                Insert: {
                    app_label: string
                    id?: number
                    model: string
                }
                Update: {
                    app_label?: string
                    id?: number
                    model?: string
                }
                Relationships: []
            }
            django_migrations: {
                Row: {
                    app: string
                    applied: string
                    id: number
                    name: string
                }
                Insert: {
                    app: string
                    applied: string
                    id?: number
                    name: string
                }
                Update: {
                    app?: string
                    applied?: string
                    id?: number
                    name?: string
                }
                Relationships: []
            }
            django_session: {
                Row: {
                    expire_date: string
                    session_data: string
                    session_key: string
                }
                Insert: {
                    expire_date: string
                    session_data: string
                    session_key: string
                }
                Update: {
                    expire_date?: string
                    session_data?: string
                    session_key?: string
                }
                Relationships: []
            }
            django_site: {
                Row: {
                    domain: string
                    id: number
                    name: string
                }
                Insert: {
                    domain: string
                    id?: number
                    name: string
                }
                Update: {
                    domain?: string
                    id?: number
                    name?: string
                }
                Relationships: []
            }
            g_search_console_gsccountries: {
                Row: {
                    country_id: number
                    country_name: string
                }
                Insert: {
                    country_id?: number
                    country_name: string
                }
                Update: {
                    country_id?: number
                    country_name?: string
                }
                Relationships: []
            }
            g_search_console_gscdatecombinationmetrics: {
                Row: {
                    clicks: number
                    combination_id: number
                    country_id: number | null
                    ctr: number
                    date_id: number
                    device_id: number | null
                    id: number
                    impressions: number
                    page_id: number | null
                    position: number
                    property_id: number
                    query_id: number | null
                    search_appearance_id: number | null
                }
                Insert: {
                    clicks: number
                    combination_id: number
                    country_id?: number | null
                    ctr: number
                    date_id: number
                    device_id?: number | null
                    id?: number
                    impressions: number
                    page_id?: number | null
                    position: number
                    property_id: number
                    query_id?: number | null
                    search_appearance_id?: number | null
                }
                Update: {
                    clicks?: number
                    combination_id?: number
                    country_id?: number | null
                    ctr?: number
                    date_id?: number
                    device_id?: number | null
                    id?: number
                    impressions?: number
                    page_id?: number | null
                    position?: number
                    property_id?: number
                    query_id?: number | null
                    search_appearance_id?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'g_search_console_gsc_combination_id_4942e471_fk_g_search_'
                        columns: ['combination_id']
                        isOneToOne: false
                        referencedRelation: 'g_search_console_gscdimensioncombinations'
                        referencedColumns: ['combination_id']
                    },
                    {
                        foreignKeyName: 'g_search_console_gsc_country_id_33df5afb_fk_g_search_'
                        columns: ['country_id']
                        isOneToOne: false
                        referencedRelation: 'g_search_console_gsccountries'
                        referencedColumns: ['country_id']
                    },
                    {
                        foreignKeyName: 'g_search_console_gsc_date_id_be0636f1_fk_g_search_'
                        columns: ['date_id']
                        isOneToOne: false
                        referencedRelation: 'g_search_console_gscdates'
                        referencedColumns: ['date_id']
                    },
                    {
                        foreignKeyName: 'g_search_console_gsc_device_id_1518b668_fk_g_search_'
                        columns: ['device_id']
                        isOneToOne: false
                        referencedRelation: 'g_search_console_gscdevices'
                        referencedColumns: ['device_id']
                    },
                    {
                        foreignKeyName: 'g_search_console_gsc_page_id_a5ea6d0c_fk_g_search_'
                        columns: ['page_id']
                        isOneToOne: false
                        referencedRelation: 'g_search_console_gscpages'
                        referencedColumns: ['page_id']
                    },
                    {
                        foreignKeyName: 'g_search_console_gsc_property_id_8690b538_fk_g_search_'
                        columns: ['property_id']
                        isOneToOne: false
                        referencedRelation: 'g_search_console_gscproperties'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'g_search_console_gsc_query_id_e7ac0021_fk_g_search_'
                        columns: ['query_id']
                        isOneToOne: false
                        referencedRelation: 'g_search_console_gscqueries'
                        referencedColumns: ['query_id']
                    },
                    {
                        foreignKeyName: 'g_search_console_gsc_search_appearance_id_a2f9e2d1_fk_g_search_'
                        columns: ['search_appearance_id']
                        isOneToOne: false
                        referencedRelation: 'g_search_console_gscsearchappearances'
                        referencedColumns: ['search_appearance_id']
                    }
                ]
            }
            g_search_console_gscdatemetrics: {
                Row: {
                    clicks: number
                    ctr: number
                    date_id: number
                    id: number
                    impressions: number
                    position: number
                    property_id: number
                }
                Insert: {
                    clicks: number
                    ctr: number
                    date_id: number
                    id?: number
                    impressions: number
                    position: number
                    property_id: number
                }
                Update: {
                    clicks?: number
                    ctr?: number
                    date_id?: number
                    id?: number
                    impressions?: number
                    position?: number
                    property_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'g_search_console_gsc_date_id_e75abd35_fk_g_search_'
                        columns: ['date_id']
                        isOneToOne: false
                        referencedRelation: 'g_search_console_gscdates'
                        referencedColumns: ['date_id']
                    },
                    {
                        foreignKeyName: 'g_search_console_gsc_property_id_db6d83e8_fk_g_search_'
                        columns: ['property_id']
                        isOneToOne: false
                        referencedRelation: 'g_search_console_gscproperties'
                        referencedColumns: ['id']
                    }
                ]
            }
            g_search_console_gscdatepagemetrics: {
                Row: {
                    clicks: number
                    ctr: number
                    date_id: number
                    id: number
                    impressions: number
                    page_id: number
                    position: number
                    property_id: number
                }
                Insert: {
                    clicks: number
                    ctr: number
                    date_id: number
                    id?: number
                    impressions: number
                    page_id: number
                    position: number
                    property_id: number
                }
                Update: {
                    clicks?: number
                    ctr?: number
                    date_id?: number
                    id?: number
                    impressions?: number
                    page_id?: number
                    position?: number
                    property_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'g_search_console_gsc_date_id_78048378_fk_g_search_'
                        columns: ['date_id']
                        isOneToOne: false
                        referencedRelation: 'g_search_console_gscdates'
                        referencedColumns: ['date_id']
                    },
                    {
                        foreignKeyName: 'g_search_console_gsc_page_id_e8f9acf4_fk_g_search_'
                        columns: ['page_id']
                        isOneToOne: false
                        referencedRelation: 'g_search_console_gscpages'
                        referencedColumns: ['page_id']
                    },
                    {
                        foreignKeyName: 'g_search_console_gsc_property_id_6ce2d723_fk_g_search_'
                        columns: ['property_id']
                        isOneToOne: false
                        referencedRelation: 'g_search_console_gscproperties'
                        referencedColumns: ['id']
                    }
                ]
            }
            g_search_console_gscdatepagequerymetrics: {
                Row: {
                    clicks: number
                    ctr: number
                    date_id: number
                    id: number
                    impressions: number
                    page_id: number
                    position: number
                    property_id: number
                    query_id: number
                }
                Insert: {
                    clicks: number
                    ctr: number
                    date_id: number
                    id?: number
                    impressions: number
                    page_id: number
                    position: number
                    property_id: number
                    query_id: number
                }
                Update: {
                    clicks?: number
                    ctr?: number
                    date_id?: number
                    id?: number
                    impressions?: number
                    page_id?: number
                    position?: number
                    property_id?: number
                    query_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'g_search_console_gsc_date_id_17cfd113_fk_g_search_'
                        columns: ['date_id']
                        isOneToOne: false
                        referencedRelation: 'g_search_console_gscdates'
                        referencedColumns: ['date_id']
                    },
                    {
                        foreignKeyName: 'g_search_console_gsc_page_id_c22b6469_fk_g_search_'
                        columns: ['page_id']
                        isOneToOne: false
                        referencedRelation: 'g_search_console_gscpages'
                        referencedColumns: ['page_id']
                    },
                    {
                        foreignKeyName: 'g_search_console_gsc_property_id_e8430be4_fk_g_search_'
                        columns: ['property_id']
                        isOneToOne: false
                        referencedRelation: 'g_search_console_gscproperties'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'g_search_console_gsc_query_id_e4af58c9_fk_g_search_'
                        columns: ['query_id']
                        isOneToOne: false
                        referencedRelation: 'g_search_console_gscqueries'
                        referencedColumns: ['query_id']
                    }
                ]
            }
            g_search_console_gscdatequerymetrics: {
                Row: {
                    clicks: number
                    ctr: number
                    date_id: number
                    id: number
                    impressions: number
                    position: number
                    property_id: number
                    query_id: number
                }
                Insert: {
                    clicks: number
                    ctr: number
                    date_id: number
                    id?: number
                    impressions: number
                    position: number
                    property_id: number
                    query_id: number
                }
                Update: {
                    clicks?: number
                    ctr?: number
                    date_id?: number
                    id?: number
                    impressions?: number
                    position?: number
                    property_id?: number
                    query_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'g_search_console_gsc_date_id_e16a8443_fk_g_search_'
                        columns: ['date_id']
                        isOneToOne: false
                        referencedRelation: 'g_search_console_gscdates'
                        referencedColumns: ['date_id']
                    },
                    {
                        foreignKeyName: 'g_search_console_gsc_property_id_cb851ae4_fk_g_search_'
                        columns: ['property_id']
                        isOneToOne: false
                        referencedRelation: 'g_search_console_gscproperties'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'g_search_console_gsc_query_id_90198145_fk_g_search_'
                        columns: ['query_id']
                        isOneToOne: false
                        referencedRelation: 'g_search_console_gscqueries'
                        referencedColumns: ['query_id']
                    }
                ]
            }
            g_search_console_gscdates: {
                Row: {
                    date: string
                    date_id: number
                }
                Insert: {
                    date: string
                    date_id?: number
                }
                Update: {
                    date?: string
                    date_id?: number
                }
                Relationships: []
            }
            g_search_console_gscdevices: {
                Row: {
                    device_id: number
                    device_type: string
                }
                Insert: {
                    device_id?: number
                    device_type: string
                }
                Update: {
                    device_id?: number
                    device_type?: string
                }
                Relationships: []
            }
            g_search_console_gscdimensioncombinations: {
                Row: {
                    combination_id: number
                    description: string
                    name: string
                }
                Insert: {
                    combination_id?: number
                    description: string
                    name: string
                }
                Update: {
                    combination_id?: number
                    description?: string
                    name?: string
                }
                Relationships: []
            }
            g_search_console_gscpages: {
                Row: {
                    page_id: number
                    page_url: string
                }
                Insert: {
                    page_id?: number
                    page_url: string
                }
                Update: {
                    page_id?: number
                    page_url?: string
                }
                Relationships: []
            }
            g_search_console_gscproperties: {
                Row: {
                    client_website_id: number
                    created_at: string
                    id: number
                    property_url: string
                    site_url_type: string
                    updated_at: string
                }
                Insert: {
                    client_website_id: number
                    created_at: string
                    id?: number
                    property_url: string
                    site_url_type: string
                    updated_at: string
                }
                Update: {
                    client_website_id?: number
                    created_at?: string
                    id?: number
                    property_url?: string
                    site_url_type?: string
                    updated_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'g_search_console_gsc_client_website_id_8427e3df_fk_website_m'
                        columns: ['client_website_id']
                        isOneToOne: false
                        referencedRelation: 'website_management_clientwebsite'
                        referencedColumns: ['id']
                    }
                ]
            }
            g_search_console_gscqueries: {
                Row: {
                    query_id: number
                    query_text: string
                }
                Insert: {
                    query_id?: number
                    query_text: string
                }
                Update: {
                    query_id?: number
                    query_text?: string
                }
                Relationships: []
            }
            g_search_console_gscsearchappearances: {
                Row: {
                    search_appearance_id: number
                    search_appearance_type: string
                }
                Insert: {
                    search_appearance_id?: number
                    search_appearance_type: string
                }
                Update: {
                    search_appearance_id?: number
                    search_appearance_type?: string
                }
                Relationships: []
            }
            google_search_googleimageresults: {
                Row: {
                    byte_size: number | null
                    date_searched: string
                    file_format: string
                    height: number | null
                    html_title: string
                    id: number
                    link: string
                    query_term: string
                    rank: number
                    snippet: string
                    title: string
                    width: number | null
                }
                Insert: {
                    byte_size?: number | null
                    date_searched: string
                    file_format: string
                    height?: number | null
                    html_title: string
                    id?: number
                    link: string
                    query_term: string
                    rank: number
                    snippet: string
                    title: string
                    width?: number | null
                }
                Update: {
                    byte_size?: number | null
                    date_searched?: string
                    file_format?: string
                    height?: number | null
                    html_title?: string
                    id?: number
                    link?: string
                    query_term?: string
                    rank?: number
                    snippet?: string
                    title?: string
                    width?: number | null
                }
                Relationships: []
            }
            google_search_googlewebresults: {
                Row: {
                    date_searched: string
                    id: number
                    is_deleted: boolean
                    known_update: string | null
                    link: string
                    query_term: string
                    rank: number
                    snippet: string
                    title: string
                    url_params: string
                    url_query: string
                    website: string
                }
                Insert: {
                    date_searched: string
                    id?: number
                    is_deleted: boolean
                    known_update?: string | null
                    link: string
                    query_term: string
                    rank: number
                    snippet: string
                    title: string
                    url_params: string
                    url_query: string
                    website: string
                }
                Update: {
                    date_searched?: string
                    id?: number
                    is_deleted?: boolean
                    known_update?: string | null
                    link?: string
                    query_term?: string
                    rank?: number
                    snippet?: string
                    title?: string
                    url_params?: string
                    url_query?: string
                    website?: string
                }
                Relationships: []
            }
            google_search_searchresult: {
                Row: {
                    date_retrieved: string
                    description: string
                    id: number
                    link: string
                    rank_position: number
                    task_id: number
                    title: string
                }
                Insert: {
                    date_retrieved: string
                    description: string
                    id?: number
                    link: string
                    rank_position: number
                    task_id: number
                    title: string
                }
                Update: {
                    date_retrieved?: string
                    description?: string
                    id?: number
                    link?: string
                    rank_position?: number
                    task_id?: number
                    title?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'google_search_search_task_id_fb4aec98_fk_google_se'
                        columns: ['task_id']
                        isOneToOne: false
                        referencedRelation: 'google_search_searchtask'
                        referencedColumns: ['id']
                    }
                ]
            }
            google_search_searchresultdetail: {
                Row: {
                    content: string
                    date_scraped: string
                    id: number
                    search_result_id: number
                }
                Insert: {
                    content: string
                    date_scraped: string
                    id?: number
                    search_result_id: number
                }
                Update: {
                    content?: string
                    date_scraped?: string
                    id?: number
                    search_result_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'google_search_search_search_result_id_4429be4c_fk_google_se'
                        columns: ['search_result_id']
                        isOneToOne: true
                        referencedRelation: 'google_search_searchresult'
                        referencedColumns: ['id']
                    }
                ]
            }
            google_search_searchtask: {
                Row: {
                    action: string
                    date_added: string
                    date_completed: string | null
                    id: number
                    keyword_id: number
                    num_results: number
                    priority: number
                    status: string
                }
                Insert: {
                    action: string
                    date_added: string
                    date_completed?: string | null
                    id?: number
                    keyword_id: number
                    num_results: number
                    priority: number
                    status: string
                }
                Update: {
                    action?: string
                    date_added?: string
                    date_completed?: string | null
                    id?: number
                    keyword_id?: number
                    num_results?: number
                    priority?: number
                    status?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'google_search_search_keyword_id_1b79237e_fk_keyword_a'
                        columns: ['keyword_id']
                        isOneToOne: false
                        referencedRelation: 'keyword_analysis_keyword'
                        referencedColumns: ['id']
                    }
                ]
            }
            google_search_siteauthority: {
                Row: {
                    authority_score: number
                    authority_source: string | null
                    domain_id: number
                    id: number
                    params: Json | null
                    relevance_score: number
                }
                Insert: {
                    authority_score: number
                    authority_source?: string | null
                    domain_id: number
                    id?: number
                    params?: Json | null
                    relevance_score: number
                }
                Update: {
                    authority_score?: number
                    authority_source?: string | null
                    domain_id?: number
                    id?: number
                    params?: Json | null
                    relevance_score?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'google_search_siteau_domain_id_9796ac57_fk_google_se'
                        columns: ['domain_id']
                        isOneToOne: true
                        referencedRelation: 'google_search_websitedomain'
                        referencedColumns: ['id']
                    }
                ]
            }
            google_search_websitedomain: {
                Row: {
                    core_url: string
                    description: string
                    id: number
                    name: string
                }
                Insert: {
                    core_url: string
                    description: string
                    id?: number
                    name: string
                }
                Update: {
                    core_url?: string
                    description?: string
                    id?: number
                    name?: string
                }
                Relationships: []
            }
            keyword_analysis_additionalkeywordcategorization: {
                Row: {
                    category_id: number
                    custom_value: string | null
                    id: number
                    keyword_id: number
                    last_updated: string
                    updated_by_id: number | null
                    value_id: number | null
                }
                Insert: {
                    category_id: number
                    custom_value?: string | null
                    id?: number
                    keyword_id: number
                    last_updated: string
                    updated_by_id?: number | null
                    value_id?: number | null
                }
                Update: {
                    category_id?: number
                    custom_value?: string | null
                    id?: number
                    keyword_id?: number
                    last_updated?: string
                    updated_by_id?: number | null
                    value_id?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'keyword_analysis_add_category_id_a5ce8751_fk_keyword_a'
                        columns: ['category_id']
                        isOneToOne: false
                        referencedRelation: 'keyword_analysis_categorydefinition'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'keyword_analysis_add_keyword_id_f4068447_fk_keyword_a'
                        columns: ['keyword_id']
                        isOneToOne: false
                        referencedRelation: 'keyword_analysis_keyword'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'keyword_analysis_add_updated_by_id_2b2b06de_fk_auth_user'
                        columns: ['updated_by_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'keyword_analysis_add_value_id_7d6405e8_fk_keyword_a'
                        columns: ['value_id']
                        isOneToOne: false
                        referencedRelation: 'keyword_analysis_categoryvalue'
                        referencedColumns: ['id']
                    }
                ]
            }
            keyword_analysis_categorydefinition: {
                Row: {
                    category_name: string
                    category_type: string
                    id: number
                    last_updated: string
                    updated_by_id: number | null
                    value_type: string
                }
                Insert: {
                    category_name: string
                    category_type: string
                    id?: number
                    last_updated: string
                    updated_by_id?: number | null
                    value_type: string
                }
                Update: {
                    category_name?: string
                    category_type?: string
                    id?: number
                    last_updated?: string
                    updated_by_id?: number | null
                    value_type?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'keyword_analysis_cat_updated_by_id_b9947971_fk_auth_user'
                        columns: ['updated_by_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    }
                ]
            }
            keyword_analysis_categoryvalue: {
                Row: {
                    category_id: number
                    description: string
                    example: string
                    id: number
                    last_updated: string
                    updated_by_id: number | null
                    value: string
                }
                Insert: {
                    category_id: number
                    description: string
                    example: string
                    id?: number
                    last_updated: string
                    updated_by_id?: number | null
                    value: string
                }
                Update: {
                    category_id?: number
                    description?: string
                    example?: string
                    id?: number
                    last_updated?: string
                    updated_by_id?: number | null
                    value?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'keyword_analysis_cat_category_id_ae209c4f_fk_keyword_a'
                        columns: ['category_id']
                        isOneToOne: false
                        referencedRelation: 'keyword_analysis_categorydefinition'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'keyword_analysis_cat_updated_by_id_1e37bfa3_fk_auth_user'
                        columns: ['updated_by_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    }
                ]
            }
            keyword_analysis_dataforseolocationcode: {
                Row: {
                    available_sources: string
                    country_iso_code: string
                    keywords: number
                    language_code: string
                    language_name: string
                    location_code: number
                    location_code_parent: string | null
                    location_name: string
                    location_type: string
                    serps: number
                }
                Insert: {
                    available_sources: string
                    country_iso_code: string
                    keywords: number
                    language_code: string
                    language_name: string
                    location_code: number
                    location_code_parent?: string | null
                    location_name: string
                    location_type: string
                    serps: number
                }
                Update: {
                    available_sources?: string
                    country_iso_code?: string
                    keywords?: number
                    language_code?: string
                    language_name?: string
                    location_code?: number
                    location_code_parent?: string | null
                    location_name?: string
                    location_type?: string
                    serps?: number
                }
                Relationships: []
            }
            keyword_analysis_keyword: {
                Row: {
                    id: number
                    keyword_text: string
                    last_updated: string
                    updated_by_id: number | null
                }
                Insert: {
                    id?: number
                    keyword_text: string
                    last_updated: string
                    updated_by_id?: number | null
                }
                Update: {
                    id?: number
                    keyword_text?: string
                    last_updated?: string
                    updated_by_id?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'keyword_analysis_keyword_updated_by_id_52476b17_fk_auth_user_id'
                        columns: ['updated_by_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    }
                ]
            }
            keyword_analysis_keywordcategorization: {
                Row: {
                    additional_info: Json
                    brand_orientation: string | null
                    comparison: boolean | null
                    core: boolean | null
                    feature_specificity: string | null
                    head: boolean | null
                    id: number
                    keyword_id: number
                    last_updated: string
                    price_conscious: boolean | null
                    primary_focus: string | null
                    problem_solution_driven: string | null
                    purchase_readiness: string | null
                    purpose: string | null
                    root: boolean | null
                    type_of_result_desired: string | null
                    updated_by_id: number | null
                    user_intent_classification: string | null
                }
                Insert: {
                    additional_info: Json
                    brand_orientation?: string | null
                    comparison?: boolean | null
                    core?: boolean | null
                    feature_specificity?: string | null
                    head?: boolean | null
                    id?: number
                    keyword_id: number
                    last_updated: string
                    price_conscious?: boolean | null
                    primary_focus?: string | null
                    problem_solution_driven?: string | null
                    purchase_readiness?: string | null
                    purpose?: string | null
                    root?: boolean | null
                    type_of_result_desired?: string | null
                    updated_by_id?: number | null
                    user_intent_classification?: string | null
                }
                Update: {
                    additional_info?: Json
                    brand_orientation?: string | null
                    comparison?: boolean | null
                    core?: boolean | null
                    feature_specificity?: string | null
                    head?: boolean | null
                    id?: number
                    keyword_id?: number
                    last_updated?: string
                    price_conscious?: boolean | null
                    primary_focus?: string | null
                    problem_solution_driven?: string | null
                    purchase_readiness?: string | null
                    purpose?: string | null
                    root?: boolean | null
                    type_of_result_desired?: string | null
                    updated_by_id?: number | null
                    user_intent_classification?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'keyword_analysis_key_keyword_id_6e56f903_fk_keyword_a'
                        columns: ['keyword_id']
                        isOneToOne: false
                        referencedRelation: 'keyword_analysis_keyword'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'keyword_analysis_key_updated_by_id_36d87c3c_fk_auth_user'
                        columns: ['updated_by_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    }
                ]
            }
            keyword_analysis_keyworddata: {
                Row: {
                    competition: number | null
                    cpc: number | null
                    difficulty: number | null
                    global_search_volume: number | null
                    global_traffic_potential: number | null
                    id: number
                    is_primary: boolean
                    keyword_id: number
                    last_updated: string
                    source: string
                    specificity_score: number | null
                    top10_authority_min: number | null
                    updated_by_id: number | null
                }
                Insert: {
                    competition?: number | null
                    cpc?: number | null
                    difficulty?: number | null
                    global_search_volume?: number | null
                    global_traffic_potential?: number | null
                    id?: number
                    is_primary: boolean
                    keyword_id: number
                    last_updated: string
                    source: string
                    specificity_score?: number | null
                    top10_authority_min?: number | null
                    updated_by_id?: number | null
                }
                Update: {
                    competition?: number | null
                    cpc?: number | null
                    difficulty?: number | null
                    global_search_volume?: number | null
                    global_traffic_potential?: number | null
                    id?: number
                    is_primary?: boolean
                    keyword_id?: number
                    last_updated?: string
                    source?: string
                    specificity_score?: number | null
                    top10_authority_min?: number | null
                    updated_by_id?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'keyword_analysis_key_keyword_id_5f50f56d_fk_keyword_a'
                        columns: ['keyword_id']
                        isOneToOne: false
                        referencedRelation: 'keyword_analysis_keyword'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'keyword_analysis_key_updated_by_id_b3abb232_fk_auth_user'
                        columns: ['updated_by_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    }
                ]
            }
            keyword_analysis_keywordgroup: {
                Row: {
                    description: string | null
                    group_name: string
                    id: number
                    last_updated: string
                    updated_by_id: number | null
                }
                Insert: {
                    description?: string | null
                    group_name: string
                    id?: number
                    last_updated: string
                    updated_by_id?: number | null
                }
                Update: {
                    description?: string | null
                    group_name?: string
                    id?: number
                    last_updated?: string
                    updated_by_id?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'keyword_analysis_key_updated_by_id_a97a3ae3_fk_auth_user'
                        columns: ['updated_by_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    }
                ]
            }
            keyword_analysis_keywordgroupmembership: {
                Row: {
                    group_id: number
                    id: number
                    is_primary: boolean
                    keyword_id: number
                    last_updated: string
                    updated_by_id: number | null
                }
                Insert: {
                    group_id: number
                    id?: number
                    is_primary: boolean
                    keyword_id: number
                    last_updated: string
                    updated_by_id?: number | null
                }
                Update: {
                    group_id?: number
                    id?: number
                    is_primary?: boolean
                    keyword_id?: number
                    last_updated?: string
                    updated_by_id?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'keyword_analysis_key_group_id_0a478026_fk_keyword_a'
                        columns: ['group_id']
                        isOneToOne: false
                        referencedRelation: 'keyword_analysis_keywordgroup'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'keyword_analysis_key_keyword_id_028ceae2_fk_keyword_a'
                        columns: ['keyword_id']
                        isOneToOne: false
                        referencedRelation: 'keyword_analysis_keyword'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'keyword_analysis_key_updated_by_id_7bcf43b6_fk_auth_user'
                        columns: ['updated_by_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    }
                ]
            }
            keyword_analysis_keywordhierarchy: {
                Row: {
                    child_keyword_id: number
                    id: number
                    last_updated: string
                    parent_keyword_id: number
                    updated_by_id: number | null
                }
                Insert: {
                    child_keyword_id: number
                    id?: number
                    last_updated: string
                    parent_keyword_id: number
                    updated_by_id?: number | null
                }
                Update: {
                    child_keyword_id?: number
                    id?: number
                    last_updated?: string
                    parent_keyword_id?: number
                    updated_by_id?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'keyword_analysis_key_child_keyword_id_1c597271_fk_keyword_a'
                        columns: ['child_keyword_id']
                        isOneToOne: false
                        referencedRelation: 'keyword_analysis_keyword'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'keyword_analysis_key_parent_keyword_id_9d0a0080_fk_keyword_a'
                        columns: ['parent_keyword_id']
                        isOneToOne: false
                        referencedRelation: 'keyword_analysis_keyword'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'keyword_analysis_key_updated_by_id_177202a6_fk_auth_user'
                        columns: ['updated_by_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    }
                ]
            }
            keyword_analysis_keywordnote: {
                Row: {
                    content: string
                    group_id: number | null
                    id: number
                    keyword_id: number | null
                    last_updated: string
                    updated_by_id: number | null
                }
                Insert: {
                    content: string
                    group_id?: number | null
                    id?: number
                    keyword_id?: number | null
                    last_updated: string
                    updated_by_id?: number | null
                }
                Update: {
                    content?: string
                    group_id?: number | null
                    id?: number
                    keyword_id?: number | null
                    last_updated?: string
                    updated_by_id?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'keyword_analysis_key_group_id_4f62e54f_fk_keyword_a'
                        columns: ['group_id']
                        isOneToOne: false
                        referencedRelation: 'keyword_analysis_keywordgroup'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'keyword_analysis_key_keyword_id_206720dc_fk_keyword_a'
                        columns: ['keyword_id']
                        isOneToOne: false
                        referencedRelation: 'keyword_analysis_keyword'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'keyword_analysis_key_updated_by_id_c237f741_fk_auth_user'
                        columns: ['updated_by_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    }
                ]
            }
            keyword_analysis_keywordresearch: {
                Row: {
                    ahrefs_data: Json
                    google_ads_data: Json
                    id: number
                    keyword_id: number
                    last_updated: string
                    updated_by_id: number | null
                }
                Insert: {
                    ahrefs_data: Json
                    google_ads_data: Json
                    id?: number
                    keyword_id: number
                    last_updated: string
                    updated_by_id?: number | null
                }
                Update: {
                    ahrefs_data?: Json
                    google_ads_data?: Json
                    id?: number
                    keyword_id?: number
                    last_updated?: string
                    updated_by_id?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'keyword_analysis_key_keyword_id_9ce201a5_fk_keyword_a'
                        columns: ['keyword_id']
                        isOneToOne: false
                        referencedRelation: 'keyword_analysis_keyword'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'keyword_analysis_key_updated_by_id_ed5f645d_fk_auth_user'
                        columns: ['updated_by_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    }
                ]
            }
            knowledgebase_cleandata: {
                Row: {
                    comments: string | null
                    dict_content: Json | null
                    id: number
                    name: string | null
                    source: string | null
                    status: string | null
                    text_content: string | null
                }
                Insert: {
                    comments?: string | null
                    dict_content?: Json | null
                    id?: number
                    name?: string | null
                    source?: string | null
                    status?: string | null
                    text_content?: string | null
                }
                Update: {
                    comments?: string | null
                    dict_content?: Json | null
                    id?: number
                    name?: string | null
                    source?: string | null
                    status?: string | null
                    text_content?: string | null
                }
                Relationships: []
            }
            knowledgebase_datapoint: {
                Row: {
                    char_count: number | null
                    clean_source_id: number
                    comments: string | null
                    dict_content: Json | null
                    id: number
                    name: string | null
                    order: number | null
                    raw_source_id: number
                    status: string | null
                    text_content: string | null
                }
                Insert: {
                    char_count?: number | null
                    clean_source_id: number
                    comments?: string | null
                    dict_content?: Json | null
                    id?: number
                    name?: string | null
                    order?: number | null
                    raw_source_id: number
                    status?: string | null
                    text_content?: string | null
                }
                Update: {
                    char_count?: number | null
                    clean_source_id?: number
                    comments?: string | null
                    dict_content?: Json | null
                    id?: number
                    name?: string | null
                    order?: number | null
                    raw_source_id?: number
                    status?: string | null
                    text_content?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'knowledgebase_datapo_clean_source_id_6637bbb6_fk_knowledge'
                        columns: ['clean_source_id']
                        isOneToOne: false
                        referencedRelation: 'knowledgebase_cleandata'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'knowledgebase_datapo_raw_source_id_83a32c4b_fk_knowledge'
                        columns: ['raw_source_id']
                        isOneToOne: false
                        referencedRelation: 'knowledgebase_rawdata'
                        referencedColumns: ['id']
                    }
                ]
            }
            knowledgebase_finetunedata: {
                Row: {
                    assistant_content: string | null
                    char_count: number | null
                    comments: string | null
                    datapoint_id: number
                    finetuneset_id: number
                    id: number
                    name: string | null
                    order: number | null
                    status: string | null
                    system_content: string | null
                    user_content: string | null
                }
                Insert: {
                    assistant_content?: string | null
                    char_count?: number | null
                    comments?: string | null
                    datapoint_id: number
                    finetuneset_id: number
                    id?: number
                    name?: string | null
                    order?: number | null
                    status?: string | null
                    system_content?: string | null
                    user_content?: string | null
                }
                Update: {
                    assistant_content?: string | null
                    char_count?: number | null
                    comments?: string | null
                    datapoint_id?: number
                    finetuneset_id?: number
                    id?: number
                    name?: string | null
                    order?: number | null
                    status?: string | null
                    system_content?: string | null
                    user_content?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'knowledgebase_finetu_datapoint_id_39003ba8_fk_knowledge'
                        columns: ['datapoint_id']
                        isOneToOne: false
                        referencedRelation: 'knowledgebase_datapoint'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'knowledgebase_finetu_finetuneset_id_99b0ed08_fk_knowledge'
                        columns: ['finetuneset_id']
                        isOneToOne: false
                        referencedRelation: 'knowledgebase_finetuneset'
                        referencedColumns: ['id']
                    }
                ]
            }
            knowledgebase_finetuneset: {
                Row: {
                    description: string | null
                    id: number
                    name: string | null
                    params: Json | null
                    params_auto_instructions: Json | null
                    status: string | null
                    system_auto_instructions: string | null
                    system_datapoint: string | null
                    user_auto_instructions: string | null
                }
                Insert: {
                    description?: string | null
                    id?: number
                    name?: string | null
                    params?: Json | null
                    params_auto_instructions?: Json | null
                    status?: string | null
                    system_auto_instructions?: string | null
                    system_datapoint?: string | null
                    user_auto_instructions?: string | null
                }
                Update: {
                    description?: string | null
                    id?: number
                    name?: string | null
                    params?: Json | null
                    params_auto_instructions?: Json | null
                    status?: string | null
                    system_auto_instructions?: string | null
                    system_datapoint?: string | null
                    user_auto_instructions?: string | null
                }
                Relationships: []
            }
            knowledgebase_historicalcleandata: {
                Row: {
                    comments: string | null
                    dict_content: Json | null
                    history_change_reason: string | null
                    history_date: string
                    history_id: number
                    history_type: string
                    history_user_id: number | null
                    id: number
                    name: string | null
                    source: string | null
                    status: string | null
                    text_content: string | null
                }
                Insert: {
                    comments?: string | null
                    dict_content?: Json | null
                    history_change_reason?: string | null
                    history_date: string
                    history_id?: number
                    history_type: string
                    history_user_id?: number | null
                    id: number
                    name?: string | null
                    source?: string | null
                    status?: string | null
                    text_content?: string | null
                }
                Update: {
                    comments?: string | null
                    dict_content?: Json | null
                    history_change_reason?: string | null
                    history_date?: string
                    history_id?: number
                    history_type?: string
                    history_user_id?: number | null
                    id?: number
                    name?: string | null
                    source?: string | null
                    status?: string | null
                    text_content?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'knowledgebase_histor_history_user_id_57f4b7e5_fk_auth_user'
                        columns: ['history_user_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    }
                ]
            }
            knowledgebase_historicaldatapoint: {
                Row: {
                    char_count: number | null
                    clean_source_id: number | null
                    comments: string | null
                    dict_content: Json | null
                    history_change_reason: string | null
                    history_date: string
                    history_id: number
                    history_type: string
                    history_user_id: number | null
                    id: number
                    name: string | null
                    order: number | null
                    raw_source_id: number | null
                    status: string | null
                    text_content: string | null
                }
                Insert: {
                    char_count?: number | null
                    clean_source_id?: number | null
                    comments?: string | null
                    dict_content?: Json | null
                    history_change_reason?: string | null
                    history_date: string
                    history_id?: number
                    history_type: string
                    history_user_id?: number | null
                    id: number
                    name?: string | null
                    order?: number | null
                    raw_source_id?: number | null
                    status?: string | null
                    text_content?: string | null
                }
                Update: {
                    char_count?: number | null
                    clean_source_id?: number | null
                    comments?: string | null
                    dict_content?: Json | null
                    history_change_reason?: string | null
                    history_date?: string
                    history_id?: number
                    history_type?: string
                    history_user_id?: number | null
                    id?: number
                    name?: string | null
                    order?: number | null
                    raw_source_id?: number | null
                    status?: string | null
                    text_content?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'knowledgebase_histor_history_user_id_39b3c541_fk_auth_user'
                        columns: ['history_user_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    }
                ]
            }
            knowledgebase_historicalrawdata: {
                Row: {
                    comments: string | null
                    dict_content: Json | null
                    history_change_reason: string | null
                    history_date: string
                    history_id: number
                    history_type: string
                    history_user_id: number | null
                    id: number
                    name: string | null
                    source: string | null
                    text_content: string | null
                }
                Insert: {
                    comments?: string | null
                    dict_content?: Json | null
                    history_change_reason?: string | null
                    history_date: string
                    history_id?: number
                    history_type: string
                    history_user_id?: number | null
                    id: number
                    name?: string | null
                    source?: string | null
                    text_content?: string | null
                }
                Update: {
                    comments?: string | null
                    dict_content?: Json | null
                    history_change_reason?: string | null
                    history_date?: string
                    history_id?: number
                    history_type?: string
                    history_user_id?: number | null
                    id?: number
                    name?: string | null
                    source?: string | null
                    text_content?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'knowledgebase_histor_history_user_id_34e3f2d4_fk_auth_user'
                        columns: ['history_user_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    }
                ]
            }
            knowledgebase_rawdata: {
                Row: {
                    comments: string | null
                    dict_content: Json | null
                    id: number
                    name: string | null
                    source: string | null
                    text_content: string | null
                }
                Insert: {
                    comments?: string | null
                    dict_content?: Json | null
                    id?: number
                    name?: string | null
                    source?: string | null
                    text_content?: string | null
                }
                Update: {
                    comments?: string | null
                    dict_content?: Json | null
                    id?: number
                    name?: string | null
                    source?: string | null
                    text_content?: string | null
                }
                Relationships: []
            }
            oai_aimodel: {
                Row: {
                    additional_info: Json | null
                    context_window: number | null
                    description: string | null
                    id: number
                    link_to_documentation: string | null
                    name: string
                    parent_model_id: number | null
                    status: string
                    strengths: string | null
                    training_date: string | null
                    weaknesses: string | null
                }
                Insert: {
                    additional_info?: Json | null
                    context_window?: number | null
                    description?: string | null
                    id?: number
                    link_to_documentation?: string | null
                    name: string
                    parent_model_id?: number | null
                    status: string
                    strengths?: string | null
                    training_date?: string | null
                    weaknesses?: string | null
                }
                Update: {
                    additional_info?: Json | null
                    context_window?: number | null
                    description?: string | null
                    id?: number
                    link_to_documentation?: string | null
                    name?: string
                    parent_model_id?: number | null
                    status?: string
                    strengths?: string | null
                    training_date?: string | null
                    weaknesses?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'oai_aimodel_parent_model_id_605a9d6e_fk_oai_aimodelfamily_id'
                        columns: ['parent_model_id']
                        isOneToOne: false
                        referencedRelation: 'oai_aimodelfamily'
                        referencedColumns: ['id']
                    }
                ]
            }
            oai_aimodelfamily: {
                Row: {
                    additional_info: Json | null
                    description: string | null
                    endpoint_id: number
                    id: number
                    link_to_documentation: string | null
                    name: string
                    sample_response: Json | null
                    status: string
                }
                Insert: {
                    additional_info?: Json | null
                    description?: string | null
                    endpoint_id: number
                    id?: number
                    link_to_documentation?: string | null
                    name: string
                    sample_response?: Json | null
                    status: string
                }
                Update: {
                    additional_info?: Json | null
                    description?: string | null
                    endpoint_id?: number
                    id?: number
                    link_to_documentation?: string | null
                    name?: string
                    sample_response?: Json | null
                    status?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'oai_aimodelfamily_endpoint_id_aba4e492_fk_oai_apiendpoint_id'
                        columns: ['endpoint_id']
                        isOneToOne: false
                        referencedRelation: 'oai_apiendpoint'
                        referencedColumns: ['id']
                    }
                ]
            }
            oai_api: {
                Row: {
                    id: number
                    is_active: boolean
                    link_to_documentation: string | null
                    name: string | null
                    provider: string
                    purpose: string
                    version: string | null
                }
                Insert: {
                    id?: number
                    is_active: boolean
                    link_to_documentation?: string | null
                    name?: string | null
                    provider: string
                    purpose: string
                    version?: string | null
                }
                Update: {
                    id?: number
                    is_active?: boolean
                    link_to_documentation?: string | null
                    name?: string | null
                    provider?: string
                    purpose?: string
                    version?: string | null
                }
                Relationships: []
            }
            oai_apicallhistory: {
                Row: {
                    additional_details: Json | null
                    ai_model_id: number | null
                    api_id: number | null
                    created_at: string
                    full_request: Json | null
                    full_response: Json | null
                    id: number
                    prompt_recipe_id: number | null
                    recipe_category_id: number | null
                    response_quality: number | null
                    response_quality_feedback: string | null
                    use_for_training: boolean | null
                }
                Insert: {
                    additional_details?: Json | null
                    ai_model_id?: number | null
                    api_id?: number | null
                    created_at: string
                    full_request?: Json | null
                    full_response?: Json | null
                    id?: number
                    prompt_recipe_id?: number | null
                    recipe_category_id?: number | null
                    response_quality?: number | null
                    response_quality_feedback?: string | null
                    use_for_training?: boolean | null
                }
                Update: {
                    additional_details?: Json | null
                    ai_model_id?: number | null
                    api_id?: number | null
                    created_at?: string
                    full_request?: Json | null
                    full_response?: Json | null
                    id?: number
                    prompt_recipe_id?: number | null
                    recipe_category_id?: number | null
                    response_quality?: number | null
                    response_quality_feedback?: string | null
                    use_for_training?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'oai_apicallhistory_ai_model_id_bbd21985_fk_oai_aimodel_id'
                        columns: ['ai_model_id']
                        isOneToOne: false
                        referencedRelation: 'oai_aimodel'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'oai_apicallhistory_api_id_590cd6e4_fk_oai_api_id'
                        columns: ['api_id']
                        isOneToOne: false
                        referencedRelation: 'oai_api'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'oai_apicallhistory_prompt_recipe_id_49f2943e_fk_oai_recipe_id'
                        columns: ['prompt_recipe_id']
                        isOneToOne: false
                        referencedRelation: 'oai_recipe'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'oai_apicallhistory_recipe_category_id_aad43d44_fk_oai_recip'
                        columns: ['recipe_category_id']
                        isOneToOne: false
                        referencedRelation: 'oai_recipecategory'
                        referencedColumns: ['id']
                    }
                ]
            }
            oai_apicost: {
                Row: {
                    cost_by_api_id: number | null
                    cost_by_endpoint_id: number | null
                    cost_by_model_id: number | null
                    cost_by_other: string | null
                    id: number
                    input_cost: number | null
                    input_cost_per: string | null
                    input_per_count: number | null
                    output_cost: number | null
                    output_cost_per: string | null
                    output_per_count: number | null
                }
                Insert: {
                    cost_by_api_id?: number | null
                    cost_by_endpoint_id?: number | null
                    cost_by_model_id?: number | null
                    cost_by_other?: string | null
                    id?: number
                    input_cost?: number | null
                    input_cost_per?: string | null
                    input_per_count?: number | null
                    output_cost?: number | null
                    output_cost_per?: string | null
                    output_per_count?: number | null
                }
                Update: {
                    cost_by_api_id?: number | null
                    cost_by_endpoint_id?: number | null
                    cost_by_model_id?: number | null
                    cost_by_other?: string | null
                    id?: number
                    input_cost?: number | null
                    input_cost_per?: string | null
                    input_per_count?: number | null
                    output_cost?: number | null
                    output_cost_per?: string | null
                    output_per_count?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'oai_apicost_cost_by_api_id_34561cbd_fk_oai_api_id'
                        columns: ['cost_by_api_id']
                        isOneToOne: false
                        referencedRelation: 'oai_api'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'oai_apicost_cost_by_endpoint_id_38ff016f_fk_oai_apiendpoint_id'
                        columns: ['cost_by_endpoint_id']
                        isOneToOne: false
                        referencedRelation: 'oai_apiendpoint'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'oai_apicost_cost_by_model_id_6d4959ec_fk_oai_aimodel_id'
                        columns: ['cost_by_model_id']
                        isOneToOne: false
                        referencedRelation: 'oai_aimodel'
                        referencedColumns: ['id']
                    }
                ]
            }
            oai_apiendpoint: {
                Row: {
                    api_id: number
                    audio_speech_request_id: number | null
                    audio_transcription_request_id: number | null
                    audio_translation_request_id: number | null
                    chat_completion_request_id: number | null
                    description: string | null
                    id: number
                    image_task_request_id: number | null
                    method: string | null
                    path: string
                }
                Insert: {
                    api_id: number
                    audio_speech_request_id?: number | null
                    audio_transcription_request_id?: number | null
                    audio_translation_request_id?: number | null
                    chat_completion_request_id?: number | null
                    description?: string | null
                    id?: number
                    image_task_request_id?: number | null
                    method?: string | null
                    path: string
                }
                Update: {
                    api_id?: number
                    audio_speech_request_id?: number | null
                    audio_transcription_request_id?: number | null
                    audio_translation_request_id?: number | null
                    chat_completion_request_id?: number | null
                    description?: string | null
                    id?: number
                    image_task_request_id?: number | null
                    method?: string | null
                    path?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'oai_apiendpoint_api_id_c6f88844_fk_oai_api_id'
                        columns: ['api_id']
                        isOneToOne: false
                        referencedRelation: 'oai_api'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'oai_apiendpoint_audio_speech_request_9190f702_fk_oai_audio'
                        columns: ['audio_speech_request_id']
                        isOneToOne: false
                        referencedRelation: 'oai_audiospeechrequest'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'oai_apiendpoint_audio_transcription__9f446d90_fk_oai_audio'
                        columns: ['audio_transcription_request_id']
                        isOneToOne: false
                        referencedRelation: 'oai_audiotranscriptionrequest'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'oai_apiendpoint_audio_translation_re_79ee649e_fk_oai_audio'
                        columns: ['audio_translation_request_id']
                        isOneToOne: false
                        referencedRelation: 'oai_audiotranslationrequest'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'oai_apiendpoint_chat_completion_requ_9c6d8904_fk_oai_chatc'
                        columns: ['chat_completion_request_id']
                        isOneToOne: false
                        referencedRelation: 'oai_chatcompletionrequest'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'oai_apiendpoint_image_task_request_i_9636c444_fk_oai_image'
                        columns: ['image_task_request_id']
                        isOneToOne: false
                        referencedRelation: 'oai_imagetaskrequest'
                        referencedColumns: ['id']
                    }
                ]
            }
            oai_audiospeechrequest: {
                Row: {
                    api_id: number
                    audio_file: string | null
                    id: number
                    input_text: string
                    link_to_documentation: string | null
                    model: string
                    response_format: string
                    speed: number | null
                    voice: string
                }
                Insert: {
                    api_id: number
                    audio_file?: string | null
                    id?: number
                    input_text: string
                    link_to_documentation?: string | null
                    model: string
                    response_format: string
                    speed?: number | null
                    voice: string
                }
                Update: {
                    api_id?: number
                    audio_file?: string | null
                    id?: number
                    input_text?: string
                    link_to_documentation?: string | null
                    model?: string
                    response_format?: string
                    speed?: number | null
                    voice?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'oai_audiospeechrequest_api_id_9e29d9a9_fk_oai_api_id'
                        columns: ['api_id']
                        isOneToOne: false
                        referencedRelation: 'oai_api'
                        referencedColumns: ['id']
                    }
                ]
            }
            oai_audiotranscriptionrequest: {
                Row: {
                    api_id: number
                    audio_file: string
                    id: number
                    language: string | null
                    link_to_documentation: string | null
                    model: string
                    prompt: string | null
                    response_format: string
                    temperature: number | null
                    transcript: string | null
                }
                Insert: {
                    api_id: number
                    audio_file: string
                    id?: number
                    language?: string | null
                    link_to_documentation?: string | null
                    model: string
                    prompt?: string | null
                    response_format: string
                    temperature?: number | null
                    transcript?: string | null
                }
                Update: {
                    api_id?: number
                    audio_file?: string
                    id?: number
                    language?: string | null
                    link_to_documentation?: string | null
                    model?: string
                    prompt?: string | null
                    response_format?: string
                    temperature?: number | null
                    transcript?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'oai_audiotranscriptionrequest_api_id_e2312e81_fk_oai_api_id'
                        columns: ['api_id']
                        isOneToOne: false
                        referencedRelation: 'oai_api'
                        referencedColumns: ['id']
                    }
                ]
            }
            oai_audiotranslationrequest: {
                Row: {
                    api_id: number
                    audio_file: string
                    id: number
                    link_to_documentation: string | null
                    model: string
                    prompt: string | null
                    response_format: string
                    temperature: number | null
                    translated_text: string | null
                }
                Insert: {
                    api_id: number
                    audio_file: string
                    id?: number
                    link_to_documentation?: string | null
                    model: string
                    prompt?: string | null
                    response_format: string
                    temperature?: number | null
                    translated_text?: string | null
                }
                Update: {
                    api_id?: number
                    audio_file?: string
                    id?: number
                    link_to_documentation?: string | null
                    model?: string
                    prompt?: string | null
                    response_format?: string
                    temperature?: number | null
                    translated_text?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'oai_audiotranslationrequest_api_id_3ab7c8d9_fk_oai_api_id'
                        columns: ['api_id']
                        isOneToOne: false
                        referencedRelation: 'oai_api'
                        referencedColumns: ['id']
                    }
                ]
            }
            oai_chatcompletionrequest: {
                Row: {
                    additional_params: Json | null
                    api_id: number
                    frequency_penalty: number
                    id: number
                    link_to_documentation: string | null
                    logit_bias: Json | null
                    logprobs: boolean
                    max_tokens: number | null
                    n: number
                    name: string | null
                    presence_penalty: number
                    prompt_character_limit: number | null
                    response_format: Json | null
                    seed: number | null
                    stop: Json | null
                    stream: boolean
                    temperature: number
                    tool_choice: Json | null
                    tools: Json | null
                    top_logprobs: number | null
                    top_p: number
                    user: string | null
                }
                Insert: {
                    additional_params?: Json | null
                    api_id: number
                    frequency_penalty: number
                    id?: number
                    link_to_documentation?: string | null
                    logit_bias?: Json | null
                    logprobs: boolean
                    max_tokens?: number | null
                    n: number
                    name?: string | null
                    presence_penalty: number
                    prompt_character_limit?: number | null
                    response_format?: Json | null
                    seed?: number | null
                    stop?: Json | null
                    stream: boolean
                    temperature: number
                    tool_choice?: Json | null
                    tools?: Json | null
                    top_logprobs?: number | null
                    top_p: number
                    user?: string | null
                }
                Update: {
                    additional_params?: Json | null
                    api_id?: number
                    frequency_penalty?: number
                    id?: number
                    link_to_documentation?: string | null
                    logit_bias?: Json | null
                    logprobs?: boolean
                    max_tokens?: number | null
                    n?: number
                    name?: string | null
                    presence_penalty?: number
                    prompt_character_limit?: number | null
                    response_format?: Json | null
                    seed?: number | null
                    stop?: Json | null
                    stream?: boolean
                    temperature?: number
                    tool_choice?: Json | null
                    tools?: Json | null
                    top_logprobs?: number | null
                    top_p?: number
                    user?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'oai_chatcompletionrequest_api_id_3a1da9aa_fk_oai_api_id'
                        columns: ['api_id']
                        isOneToOne: false
                        referencedRelation: 'oai_api'
                        referencedColumns: ['id']
                    }
                ]
            }
            oai_compiledrecipe: {
                Row: {
                    backend_pack: Json | null
                    core_recipe: Json | null
                    frontend_pack: Json | null
                    id: number
                    is_deleted: boolean
                    recipe_id: number
                    slug: string
                }
                Insert: {
                    backend_pack?: Json | null
                    core_recipe?: Json | null
                    frontend_pack?: Json | null
                    id?: number
                    is_deleted: boolean
                    recipe_id: number
                    slug: string
                }
                Update: {
                    backend_pack?: Json | null
                    core_recipe?: Json | null
                    frontend_pack?: Json | null
                    id?: number
                    is_deleted?: boolean
                    recipe_id?: number
                    slug?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'oai_compiledrecipe_recipe_id_c5087b3a_fk_oai_recipe_id'
                        columns: ['recipe_id']
                        isOneToOne: false
                        referencedRelation: 'oai_recipe'
                        referencedColumns: ['id']
                    }
                ]
            }
            oai_error: {
                Row: {
                    api_id: number
                    description: string | null
                    error_code: number | null
                    id: number
                    user_friendly_message: string | null
                }
                Insert: {
                    api_id: number
                    description?: string | null
                    error_code?: number | null
                    id?: number
                    user_friendly_message?: string | null
                }
                Update: {
                    api_id?: number
                    description?: string | null
                    error_code?: number | null
                    id?: number
                    user_friendly_message?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'oai_error_api_id_2131aac5_fk_oai_api_id'
                        columns: ['api_id']
                        isOneToOne: false
                        referencedRelation: 'oai_api'
                        referencedColumns: ['id']
                    }
                ]
            }
            oai_field: {
                Row: {
                    default_order: number | null
                    field_type: string
                    id: number
                    label: string
                    user_display_options: Json | null
                }
                Insert: {
                    default_order?: number | null
                    field_type: string
                    id?: number
                    label: string
                    user_display_options?: Json | null
                }
                Update: {
                    default_order?: number | null
                    field_type?: string
                    id?: number
                    label?: string
                    user_display_options?: Json | null
                }
                Relationships: []
            }
            oai_imagetaskrequest: {
                Row: {
                    api_id: number
                    b64_json: string | null
                    id: number
                    link_to_documentation: string | null
                    model: string
                    n: number
                    prompt: string
                    quality: string | null
                    response_format: string
                    revised_prompt: string | null
                    size: string | null
                    style: string | null
                    url: string | null
                    user: string | null
                }
                Insert: {
                    api_id: number
                    b64_json?: string | null
                    id?: number
                    link_to_documentation?: string | null
                    model: string
                    n: number
                    prompt: string
                    quality?: string | null
                    response_format: string
                    revised_prompt?: string | null
                    size?: string | null
                    style?: string | null
                    url?: string | null
                    user?: string | null
                }
                Update: {
                    api_id?: number
                    b64_json?: string | null
                    id?: number
                    link_to_documentation?: string | null
                    model?: string
                    n?: number
                    prompt?: string
                    quality?: string | null
                    response_format?: string
                    revised_prompt?: string | null
                    size?: string | null
                    style?: string | null
                    url?: string | null
                    user?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'oai_imagetaskrequest_api_id_e020bb46_fk_oai_api_id'
                        columns: ['api_id']
                        isOneToOne: false
                        referencedRelation: 'oai_api'
                        referencedColumns: ['id']
                    }
                ]
            }
            oai_promptmessage: {
                Row: {
                    comes_after_id: number | null
                    content: string
                    direct_field_type: string | null
                    id: number
                    message_order: number | null
                    prompt_recipe_id: number
                    role: string
                }
                Insert: {
                    comes_after_id?: number | null
                    content: string
                    direct_field_type?: string | null
                    id?: number
                    message_order?: number | null
                    prompt_recipe_id: number
                    role: string
                }
                Update: {
                    comes_after_id?: number | null
                    content?: string
                    direct_field_type?: string | null
                    id?: number
                    message_order?: number | null
                    prompt_recipe_id?: number
                    role?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'oai_promptmessage_comes_after_id_a9dee798_fk_oai_promp'
                        columns: ['comes_after_id']
                        isOneToOne: false
                        referencedRelation: 'oai_promptmessage'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'oai_promptmessage_prompt_recipe_id_8daa17c6_fk_oai_recipe_id'
                        columns: ['prompt_recipe_id']
                        isOneToOne: false
                        referencedRelation: 'oai_recipe'
                        referencedColumns: ['id']
                    }
                ]
            }
            oai_promptmessage_variables: {
                Row: {
                    id: number
                    promptmessage_id: number
                    variable_id: number
                }
                Insert: {
                    id?: number
                    promptmessage_id: number
                    variable_id: number
                }
                Update: {
                    id?: number
                    promptmessage_id?: number
                    variable_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'oai_promptmessage_va_promptmessage_id_09b78240_fk_oai_promp'
                        columns: ['promptmessage_id']
                        isOneToOne: false
                        referencedRelation: 'oai_promptmessage'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'oai_promptmessage_va_variable_id_e5418b23_fk_oai_varia'
                        columns: ['variable_id']
                        isOneToOne: false
                        referencedRelation: 'oai_variable'
                        referencedColumns: ['id']
                    }
                ]
            }
            oai_ratelimit: {
                Row: {
                    active_jobs: number | null
                    id: number
                    images_per_minute: number | null
                    jobs_per_day: number | null
                    model_id: number
                    requests_per_day: number | null
                    requests_per_minute: number | null
                    tokens_per_minute: number | null
                }
                Insert: {
                    active_jobs?: number | null
                    id?: number
                    images_per_minute?: number | null
                    jobs_per_day?: number | null
                    model_id: number
                    requests_per_day?: number | null
                    requests_per_minute?: number | null
                    tokens_per_minute?: number | null
                }
                Update: {
                    active_jobs?: number | null
                    id?: number
                    images_per_minute?: number | null
                    jobs_per_day?: number | null
                    model_id?: number
                    requests_per_day?: number | null
                    requests_per_minute?: number | null
                    tokens_per_minute?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'oai_ratelimit_model_id_7de85f54_fk_oai_aimodel_id'
                        columns: ['model_id']
                        isOneToOne: false
                        referencedRelation: 'oai_aimodel'
                        referencedColumns: ['id']
                    }
                ]
            }
            oai_recipe: {
                Row: {
                    additional_info: Json | null
                    category_id: number
                    created_by: string | null
                    decision_function_import_path: string | null
                    default_display: string
                    description: string | null
                    destination_function_import_path: string | null
                    id: number
                    Max_Tokens_Override: number | null
                    model_id: number | null
                    name: string
                    param_overrides: Json | null
                    sample_output: string | null
                    status: string
                    usage_guidelines: string
                    validation_function_import_path: string | null
                }
                Insert: {
                    additional_info?: Json | null
                    category_id: number
                    created_by?: string | null
                    decision_function_import_path?: string | null
                    default_display: string
                    description?: string | null
                    destination_function_import_path?: string | null
                    id?: number
                    Max_Tokens_Override?: number | null
                    model_id?: number | null
                    name: string
                    param_overrides?: Json | null
                    sample_output?: string | null
                    status: string
                    usage_guidelines: string
                    validation_function_import_path?: string | null
                }
                Update: {
                    additional_info?: Json | null
                    category_id?: number
                    created_by?: string | null
                    decision_function_import_path?: string | null
                    default_display?: string
                    description?: string | null
                    destination_function_import_path?: string | null
                    id?: number
                    Max_Tokens_Override?: number | null
                    model_id?: number | null
                    name?: string
                    param_overrides?: Json | null
                    sample_output?: string | null
                    status?: string
                    usage_guidelines?: string
                    validation_function_import_path?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'oai_recipe_category_id_bf17e445_fk_oai_recipecategory_id'
                        columns: ['category_id']
                        isOneToOne: false
                        referencedRelation: 'oai_recipecategory'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'oai_recipe_model_id_e95ca9af_fk_oai_aimodel_id'
                        columns: ['model_id']
                        isOneToOne: false
                        referencedRelation: 'oai_aimodel'
                        referencedColumns: ['id']
                    }
                ]
            }
            oai_recipecategory: {
                Row: {
                    description: string | null
                    id: number
                    name: string
                    parent_category_id: number | null
                }
                Insert: {
                    description?: string | null
                    id?: number
                    name: string
                    parent_category_id?: number | null
                }
                Update: {
                    description?: string | null
                    id?: number
                    name?: string
                    parent_category_id?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'oai_recipecategory_parent_category_id_8e216efa_fk_oai_recip'
                        columns: ['parent_category_id']
                        isOneToOne: false
                        referencedRelation: 'oai_recipecategory'
                        referencedColumns: ['id']
                    }
                ]
            }
            oai_recipes_oairecipe: {
                Row: {
                    api_method: string
                    id: number
                    name: string
                    request_data: Json
                }
                Insert: {
                    api_method: string
                    id?: number
                    name: string
                    request_data: Json
                }
                Update: {
                    api_method?: string
                    id?: number
                    name?: string
                    request_data?: Json
                }
                Relationships: []
            }
            oai_recipes_oairesponse: {
                Row: {
                    created_at: string
                    id: number
                    recipe_id: number | null
                    response_data: Json
                }
                Insert: {
                    created_at: string
                    id?: number
                    recipe_id?: number | null
                    response_data: Json
                }
                Update: {
                    created_at?: string
                    id?: number
                    recipe_id?: number | null
                    response_data?: Json
                }
                Relationships: [
                    {
                        foreignKeyName: 'oai_recipes_oairesponse_recipe_id_254d4063_fk'
                        columns: ['recipe_id']
                        isOneToOne: false
                        referencedRelation: 'oai_recipes_oairecipe'
                        referencedColumns: ['id']
                    }
                ]
            }
            oai_recipes_textanalysis: {
                Row: {
                    created_at: string
                    feedback_message: string
                    gpt_generated_sentences: Json
                    id: number
                    is_gpt_generated: number
                    is_human_written: number
                    text: string
                    words_count: number
                }
                Insert: {
                    created_at: string
                    feedback_message: string
                    gpt_generated_sentences: Json
                    id?: number
                    is_gpt_generated: number
                    is_human_written: number
                    text: string
                    words_count: number
                }
                Update: {
                    created_at?: string
                    feedback_message?: string
                    gpt_generated_sentences?: Json
                    id?: number
                    is_gpt_generated?: number
                    is_human_written?: number
                    text?: string
                    words_count?: number
                }
                Relationships: []
            }
            oai_textanalysis: {
                Row: {
                    created_at: string
                    feedback_message: string | null
                    gpt_generated_sentences: Json | null
                    human_generated_score: number | null
                    id: number
                    is_gpt_generated: number | null
                    is_human_written: number | null
                    text: string | null
                    words_count: number | null
                }
                Insert: {
                    created_at: string
                    feedback_message?: string | null
                    gpt_generated_sentences?: Json | null
                    human_generated_score?: number | null
                    id?: number
                    is_gpt_generated?: number | null
                    is_human_written?: number | null
                    text?: string | null
                    words_count?: number | null
                }
                Update: {
                    created_at?: string
                    feedback_message?: string | null
                    gpt_generated_sentences?: Json | null
                    human_generated_score?: number | null
                    id?: number
                    is_gpt_generated?: number | null
                    is_human_written?: number | null
                    text?: string | null
                    words_count?: number | null
                }
                Relationships: []
            }
            oai_variable: {
                Row: {
                    data_type: string
                    default_value: string | null
                    id: number
                    max_length: number | null
                    name: string
                    name_for_display: string | null
                    order: number | null
                    source: string
                    source_class_import_path: string | null
                    source_database_column_name: string | null
                    source_database_table_name: string | null
                    source_function_import_path: string | null
                    source_params: Json | null
                    source_user_input_field_id: number | null
                    tooltip: string | null
                    validation_function: string | null
                }
                Insert: {
                    data_type: string
                    default_value?: string | null
                    id?: number
                    max_length?: number | null
                    name: string
                    name_for_display?: string | null
                    order?: number | null
                    source: string
                    source_class_import_path?: string | null
                    source_database_column_name?: string | null
                    source_database_table_name?: string | null
                    source_function_import_path?: string | null
                    source_params?: Json | null
                    source_user_input_field_id?: number | null
                    tooltip?: string | null
                    validation_function?: string | null
                }
                Update: {
                    data_type?: string
                    default_value?: string | null
                    id?: number
                    max_length?: number | null
                    name?: string
                    name_for_display?: string | null
                    order?: number | null
                    source?: string
                    source_class_import_path?: string | null
                    source_database_column_name?: string | null
                    source_database_table_name?: string | null
                    source_function_import_path?: string | null
                    source_params?: Json | null
                    source_user_input_field_id?: number | null
                    tooltip?: string | null
                    validation_function?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'oai_variable_source_user_input_fi_d2dc960d_fk_oai_field'
                        columns: ['source_user_input_field_id']
                        isOneToOne: false
                        referencedRelation: 'oai_field'
                        referencedColumns: ['id']
                    }
                ]
            }
            openai_management_decisionpoint: {
                Row: {
                    description: string
                    id: number
                    prompt_recipe_id: number
                }
                Insert: {
                    description: string
                    id?: number
                    prompt_recipe_id: number
                }
                Update: {
                    description?: string
                    id?: number
                    prompt_recipe_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'openai_management_de_prompt_recipe_id_969a522b_fk_openai_ma'
                        columns: ['prompt_recipe_id']
                        isOneToOne: false
                        referencedRelation: 'openai_management_promptrecipe'
                        referencedColumns: ['id']
                    }
                ]
            }
            openai_management_decisionrule: {
                Row: {
                    action: string
                    decision_point_id: number
                    id: number
                    trigger: string
                }
                Insert: {
                    action: string
                    decision_point_id: number
                    id?: number
                    trigger: string
                }
                Update: {
                    action?: string
                    decision_point_id?: number
                    id?: number
                    trigger?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'openai_management_de_decision_point_id_0bcdefe7_fk_openai_ma'
                        columns: ['decision_point_id']
                        isOneToOne: false
                        referencedRelation: 'openai_management_decisionpoint'
                        referencedColumns: ['id']
                    }
                ]
            }
            openai_management_message: {
                Row: {
                    content: string
                    id: number
                    position: number
                    prompt_recipe_id: number
                    role: string
                }
                Insert: {
                    content: string
                    id?: number
                    position: number
                    prompt_recipe_id: number
                    role: string
                }
                Update: {
                    content?: string
                    id?: number
                    position?: number
                    prompt_recipe_id?: number
                    role?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'openai_management_me_prompt_recipe_id_e221c123_fk_openai_ma'
                        columns: ['prompt_recipe_id']
                        isOneToOne: false
                        referencedRelation: 'openai_management_promptrecipe'
                        referencedColumns: ['id']
                    }
                ]
            }
            openai_management_prompt: {
                Row: {
                    id: number
                    prompt_text: string
                    timestamp: string
                }
                Insert: {
                    id?: number
                    prompt_text: string
                    timestamp: string
                }
                Update: {
                    id?: number
                    prompt_text?: string
                    timestamp?: string
                }
                Relationships: []
            }
            openai_management_promptrecipe: {
                Row: {
                    created_at: string
                    created_by_id: number
                    description: string
                    id: number
                    name: string
                }
                Insert: {
                    created_at: string
                    created_by_id: number
                    description: string
                    id?: number
                    name: string
                }
                Update: {
                    created_at?: string
                    created_by_id?: number
                    description?: string
                    id?: number
                    name?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'openai_management_pr_created_by_id_2f095208_fk_auth_user'
                        columns: ['created_by_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    }
                ]
            }
            openai_management_response: {
                Row: {
                    id: number
                    prompt_id: number
                    response_text: string
                    timestamp: string
                }
                Insert: {
                    id?: number
                    prompt_id: number
                    response_text: string
                    timestamp: string
                }
                Update: {
                    id?: number
                    prompt_id?: number
                    response_text?: string
                    timestamp?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'openai_management_re_prompt_id_c78fed16_fk_openai_ma'
                        columns: ['prompt_id']
                        isOneToOne: false
                        referencedRelation: 'openai_management_prompt'
                        referencedColumns: ['id']
                    }
                ]
            }
            openai_management_variable: {
                Row: {
                    id: number
                    key: string
                    message_id: number
                    value: string
                }
                Insert: {
                    id?: number
                    key: string
                    message_id: number
                    value: string
                }
                Update: {
                    id?: number
                    key?: string
                    message_id?: number
                    value?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'openai_management_va_message_id_a3172a3a_fk_openai_ma'
                        columns: ['message_id']
                        isOneToOne: false
                        referencedRelation: 'openai_management_message'
                        referencedColumns: ['id']
                    }
                ]
            }
            search_console_comprehensivetrafficmetrics: {
                Row: {
                    clicks: number
                    country_id: string | null
                    ctr: number
                    date: string
                    device: string | null
                    final: boolean
                    id: number
                    impressions: number
                    page: string
                    position: number
                    query: string | null
                    website_property_id: number
                }
                Insert: {
                    clicks: number
                    country_id?: string | null
                    ctr: number
                    date: string
                    device?: string | null
                    final: boolean
                    id?: number
                    impressions: number
                    page: string
                    position: number
                    query?: string | null
                    website_property_id: number
                }
                Update: {
                    clicks?: number
                    country_id?: string | null
                    ctr?: number
                    date?: string
                    device?: string | null
                    final?: boolean
                    id?: number
                    impressions?: number
                    page?: string
                    position?: number
                    query?: string | null
                    website_property_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'search_console_compr_country_id_78426536_fk_search_co'
                        columns: ['country_id']
                        isOneToOne: false
                        referencedRelation: 'search_console_searchcountry'
                        referencedColumns: ['country_code']
                    },
                    {
                        foreignKeyName: 'search_console_compr_website_property_id_1926cce7_fk_search_co'
                        columns: ['website_property_id']
                        isOneToOne: false
                        referencedRelation: 'search_console_websiteproperty'
                        referencedColumns: ['id']
                    }
                ]
            }
            search_console_gscurlinspection: {
                Row: {
                    coverage_state: string | null
                    crawled_as: string | null
                    google_canonical: string | null
                    id: number
                    indexing_state: string | null
                    last_crawl_time: string | null
                    page_fetch_state: string | null
                    referring_urls: Json | null
                    robots_txt_state: string | null
                    sitemap: Json | null
                    user_canonical: string | null
                    verdict: string | null
                }
                Insert: {
                    coverage_state?: string | null
                    crawled_as?: string | null
                    google_canonical?: string | null
                    id?: number
                    indexing_state?: string | null
                    last_crawl_time?: string | null
                    page_fetch_state?: string | null
                    referring_urls?: Json | null
                    robots_txt_state?: string | null
                    sitemap?: Json | null
                    user_canonical?: string | null
                    verdict?: string | null
                }
                Update: {
                    coverage_state?: string | null
                    crawled_as?: string | null
                    google_canonical?: string | null
                    id?: number
                    indexing_state?: string | null
                    last_crawl_time?: string | null
                    page_fetch_state?: string | null
                    referring_urls?: Json | null
                    robots_txt_state?: string | null
                    sitemap?: Json | null
                    user_canonical?: string | null
                    verdict?: string | null
                }
                Relationships: []
            }
            search_console_metricsbydate: {
                Row: {
                    clicks: number
                    ctr: number
                    date: string
                    final: boolean
                    id: number
                    impressions: number
                    position: number
                    website_property_id: number
                }
                Insert: {
                    clicks: number
                    ctr: number
                    date: string
                    final: boolean
                    id?: number
                    impressions: number
                    position: number
                    website_property_id: number
                }
                Update: {
                    clicks?: number
                    ctr?: number
                    date?: string
                    final?: boolean
                    id?: number
                    impressions?: number
                    position?: number
                    website_property_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'search_console_metri_website_property_id_c6471ce6_fk_search_co'
                        columns: ['website_property_id']
                        isOneToOne: false
                        referencedRelation: 'search_console_websiteproperty'
                        referencedColumns: ['id']
                    }
                ]
            }
            search_console_pagequerytrafficmetrics: {
                Row: {
                    clicks: number
                    ctr: number
                    date: string
                    final: boolean
                    id: number
                    impressions: number
                    page: string
                    position: number
                    query: string
                    website_property_id: number
                }
                Insert: {
                    clicks: number
                    ctr: number
                    date: string
                    final: boolean
                    id?: number
                    impressions: number
                    page: string
                    position: number
                    query: string
                    website_property_id: number
                }
                Update: {
                    clicks?: number
                    ctr?: number
                    date?: string
                    final?: boolean
                    id?: number
                    impressions?: number
                    page?: string
                    position?: number
                    query?: string
                    website_property_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'search_console_pageq_website_property_id_86943507_fk_search_co'
                        columns: ['website_property_id']
                        isOneToOne: false
                        referencedRelation: 'search_console_websiteproperty'
                        referencedColumns: ['id']
                    }
                ]
            }
            search_console_pagetrafficmetrics: {
                Row: {
                    clicks: number
                    ctr: number
                    date: string
                    final: boolean
                    id: number
                    impressions: number
                    page: string
                    position: number
                    website_property_id: number
                }
                Insert: {
                    clicks: number
                    ctr: number
                    date: string
                    final: boolean
                    id?: number
                    impressions: number
                    page: string
                    position: number
                    website_property_id: number
                }
                Update: {
                    clicks?: number
                    ctr?: number
                    date?: string
                    final?: boolean
                    id?: number
                    impressions?: number
                    page?: string
                    position?: number
                    website_property_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'search_console_paget_website_property_id_f988635f_fk_search_co'
                        columns: ['website_property_id']
                        isOneToOne: false
                        referencedRelation: 'search_console_websiteproperty'
                        referencedColumns: ['id']
                    }
                ]
            }
            search_console_querytrafficmetrics: {
                Row: {
                    clicks: number
                    ctr: number
                    date: string
                    final: boolean
                    id: number
                    impressions: number
                    position: number
                    query: string
                    website_property_id: number
                }
                Insert: {
                    clicks: number
                    ctr: number
                    date: string
                    final: boolean
                    id?: number
                    impressions: number
                    position: number
                    query: string
                    website_property_id: number
                }
                Update: {
                    clicks?: number
                    ctr?: number
                    date?: string
                    final?: boolean
                    id?: number
                    impressions?: number
                    position?: number
                    query?: string
                    website_property_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'search_console_query_website_property_id_4b3a34a1_fk_search_co'
                        columns: ['website_property_id']
                        isOneToOne: false
                        referencedRelation: 'search_console_websiteproperty'
                        referencedColumns: ['id']
                    }
                ]
            }
            search_console_searchcountry: {
                Row: {
                    country_code: string
                    country_name: string
                }
                Insert: {
                    country_code: string
                    country_name: string
                }
                Update: {
                    country_code?: string
                    country_name?: string
                }
                Relationships: []
            }
            search_console_temporarysearchconsoledata: {
                Row: {
                    created_at: string
                    data: Json
                    db_model_info: string | null
                    error_log: string | null
                    failed_script_info: string | null
                    id: number
                }
                Insert: {
                    created_at: string
                    data: Json
                    db_model_info?: string | null
                    error_log?: string | null
                    failed_script_info?: string | null
                    id?: number
                }
                Update: {
                    created_at?: string
                    data?: Json
                    db_model_info?: string | null
                    error_log?: string | null
                    failed_script_info?: string | null
                    id?: number
                }
                Relationships: []
            }
            search_console_websiteproperty: {
                Row: {
                    bigquery_dataset: string | null
                    client_website_id: number
                    id: number
                    is_active: boolean
                    property_url: string
                    python_auto: boolean
                    site_url_type: string
                }
                Insert: {
                    bigquery_dataset?: string | null
                    client_website_id: number
                    id?: number
                    is_active: boolean
                    property_url: string
                    python_auto: boolean
                    site_url_type: string
                }
                Update: {
                    bigquery_dataset?: string | null
                    client_website_id?: number
                    id?: number
                    is_active?: boolean
                    property_url?: string
                    python_auto?: boolean
                    site_url_type?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'search_console_websi_client_website_id_c10f2d0e_fk_website_m'
                        columns: ['client_website_id']
                        isOneToOne: false
                        referencedRelation: 'website_management_clientwebsite'
                        referencedColumns: ['id']
                    }
                ]
            }
            socialaccount_socialaccount: {
                Row: {
                    date_joined: string
                    extra_data: Json
                    id: number
                    last_login: string
                    provider: string
                    uid: string
                    user_id: number
                }
                Insert: {
                    date_joined: string
                    extra_data: Json
                    id?: number
                    last_login: string
                    provider: string
                    uid: string
                    user_id: number
                }
                Update: {
                    date_joined?: string
                    extra_data?: Json
                    id?: number
                    last_login?: string
                    provider?: string
                    uid?: string
                    user_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'socialaccount_socialaccount_user_id_8146e70c_fk_auth_user_id'
                        columns: ['user_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    }
                ]
            }
            socialaccount_socialapp: {
                Row: {
                    client_id: string
                    id: number
                    key: string
                    name: string
                    provider: string
                    provider_id: string
                    secret: string
                    settings: Json
                }
                Insert: {
                    client_id: string
                    id?: number
                    key: string
                    name: string
                    provider: string
                    provider_id: string
                    secret: string
                    settings: Json
                }
                Update: {
                    client_id?: string
                    id?: number
                    key?: string
                    name?: string
                    provider?: string
                    provider_id?: string
                    secret?: string
                    settings?: Json
                }
                Relationships: []
            }
            socialaccount_socialapp_sites: {
                Row: {
                    id: number
                    site_id: number
                    socialapp_id: number
                }
                Insert: {
                    id?: number
                    site_id: number
                    socialapp_id: number
                }
                Update: {
                    id?: number
                    site_id?: number
                    socialapp_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'socialaccount_social_site_id_2579dee5_fk_django_si'
                        columns: ['site_id']
                        isOneToOne: false
                        referencedRelation: 'django_site'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'socialaccount_social_socialapp_id_97fb6e7d_fk_socialacc'
                        columns: ['socialapp_id']
                        isOneToOne: false
                        referencedRelation: 'socialaccount_socialapp'
                        referencedColumns: ['id']
                    }
                ]
            }
            socialaccount_socialtoken: {
                Row: {
                    account_id: number
                    app_id: number | null
                    expires_at: string | null
                    id: number
                    token: string
                    token_secret: string
                }
                Insert: {
                    account_id: number
                    app_id?: number | null
                    expires_at?: string | null
                    id?: number
                    token: string
                    token_secret: string
                }
                Update: {
                    account_id?: number
                    app_id?: number | null
                    expires_at?: string | null
                    id?: number
                    token?: string
                    token_secret?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'socialaccount_social_account_id_951f210e_fk_socialacc'
                        columns: ['account_id']
                        isOneToOne: false
                        referencedRelation: 'socialaccount_socialaccount'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'socialaccount_social_app_id_636a42d7_fk_socialacc'
                        columns: ['app_id']
                        isOneToOne: false
                        referencedRelation: 'socialaccount_socialapp'
                        referencedColumns: ['id']
                    }
                ]
            }
            task_management_task: {
                Row: {
                    config: Json
                    id: number
                    name: string
                }
                Insert: {
                    config: Json
                    id?: number
                    name: string
                }
                Update: {
                    config?: Json
                    id?: number
                    name?: string
                }
                Relationships: []
            }
            task_management_taskexecution: {
                Row: {
                    end_time: string | null
                    error_info: Json | null
                    id: number
                    progress: Json | null
                    result: Json | null
                    start_time: string
                    status: string
                    task_id: number
                }
                Insert: {
                    end_time?: string | null
                    error_info?: Json | null
                    id?: number
                    progress?: Json | null
                    result?: Json | null
                    start_time: string
                    status: string
                    task_id: number
                }
                Update: {
                    end_time?: string | null
                    error_info?: Json | null
                    id?: number
                    progress?: Json | null
                    result?: Json | null
                    start_time?: string
                    status?: string
                    task_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'task_management_task_task_id_8d3f8a02_fk_task_mana'
                        columns: ['task_id']
                        isOneToOne: false
                        referencedRelation: 'task_management_task'
                        referencedColumns: ['id']
                    }
                ]
            }
            transcription_transcriptioncorrection: {
                Row: {
                    correct_text: string
                    id: number
                    incorrect_text: string
                }
                Insert: {
                    correct_text: string
                    id?: number
                    incorrect_text: string
                }
                Update: {
                    correct_text?: string
                    id?: number
                    incorrect_text?: string
                }
                Relationships: []
            }
            webcrawler_crawlheader: {
                Row: {
                    content: string
                    id: number
                    tag: string
                    webpage_id: number
                }
                Insert: {
                    content: string
                    id?: number
                    tag: string
                    webpage_id: number
                }
                Update: {
                    content?: string
                    id?: number
                    tag?: string
                    webpage_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'webcrawler_crawlhead_webpage_id_8c3ecb98_fk_webcrawle'
                        columns: ['webpage_id']
                        isOneToOne: false
                        referencedRelation: 'webcrawler_crawlwebpage'
                        referencedColumns: ['id']
                    }
                ]
            }
            webcrawler_crawlimage: {
                Row: {
                    alt_text: string | null
                    id: number
                    src: string
                    webpage_id: number
                }
                Insert: {
                    alt_text?: string | null
                    id?: number
                    src: string
                    webpage_id: number
                }
                Update: {
                    alt_text?: string | null
                    id?: number
                    src?: string
                    webpage_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'webcrawler_crawlimag_webpage_id_17c3127c_fk_webcrawle'
                        columns: ['webpage_id']
                        isOneToOne: false
                        referencedRelation: 'webcrawler_crawlwebpage'
                        referencedColumns: ['id']
                    }
                ]
            }
            webcrawler_crawllink: {
                Row: {
                    destination_id: number
                    id: number
                    source_id: number
                }
                Insert: {
                    destination_id: number
                    id?: number
                    source_id: number
                }
                Update: {
                    destination_id?: number
                    id?: number
                    source_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'webcrawler_crawllink_destination_id_105f7d85_fk_webcrawle'
                        columns: ['destination_id']
                        isOneToOne: false
                        referencedRelation: 'webcrawler_crawlwebpage'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'webcrawler_crawllink_source_id_81902db7_fk_webcrawle'
                        columns: ['source_id']
                        isOneToOne: false
                        referencedRelation: 'webcrawler_crawlwebpage'
                        referencedColumns: ['id']
                    }
                ]
            }
            webcrawler_crawlmetaelement: {
                Row: {
                    content: string
                    id: number
                    tag: string
                    webpage_id: number
                }
                Insert: {
                    content: string
                    id?: number
                    tag: string
                    webpage_id: number
                }
                Update: {
                    content?: string
                    id?: number
                    tag?: string
                    webpage_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'webcrawler_crawlmeta_webpage_id_d134bf0c_fk_webcrawle'
                        columns: ['webpage_id']
                        isOneToOne: false
                        referencedRelation: 'webcrawler_crawlwebpage'
                        referencedColumns: ['id']
                    }
                ]
            }
            webcrawler_crawlnonhtmlcontent: {
                Row: {
                    content: string
                    content_type: string
                    id: number
                    url: string
                }
                Insert: {
                    content: string
                    content_type: string
                    id?: number
                    url: string
                }
                Update: {
                    content?: string
                    content_type?: string
                    id?: number
                    url?: string
                }
                Relationships: []
            }
            webcrawler_crawlrecord: {
                Row: {
                    end_time: string | null
                    id: number
                    pages_crawled: number
                    pages_failed: number
                    start_time: string
                }
                Insert: {
                    end_time?: string | null
                    id?: number
                    pages_crawled: number
                    pages_failed: number
                    start_time: string
                }
                Update: {
                    end_time?: string | null
                    id?: number
                    pages_crawled?: number
                    pages_failed?: number
                    start_time?: string
                }
                Relationships: []
            }
            webcrawler_crawlwebpage: {
                Row: {
                    content: string
                    content_html: string
                    crawl_time: string
                    id: number
                    load_time: number
                    status_code: number
                    url: string
                }
                Insert: {
                    content: string
                    content_html: string
                    crawl_time: string
                    id?: number
                    load_time: number
                    status_code: number
                    url: string
                }
                Update: {
                    content?: string
                    content_html?: string
                    crawl_time?: string
                    id?: number
                    load_time?: number
                    status_code?: number
                    url?: string
                }
                Relationships: []
            }
            webscraper_api: {
                Row: {
                    details: string
                    documentation_url: string | null
                    id: number
                    name: string
                }
                Insert: {
                    details: string
                    documentation_url?: string | null
                    id?: number
                    name: string
                }
                Update: {
                    details?: string
                    documentation_url?: string | null
                    id?: number
                    name?: string
                }
                Relationships: []
            }
            webscraper_domain: {
                Row: {
                    id: number
                    last_updated: string
                    rate_limit_info: string
                    redirection_patterns: string
                    robots_txt: string | null
                    security_policies: string
                    server_type: string
                    url: string
                }
                Insert: {
                    id?: number
                    last_updated: string
                    rate_limit_info: string
                    redirection_patterns: string
                    robots_txt?: string | null
                    security_policies: string
                    server_type: string
                    url: string
                }
                Update: {
                    id?: number
                    last_updated?: string
                    rate_limit_info?: string
                    redirection_patterns?: string
                    robots_txt?: string | null
                    security_policies?: string
                    server_type?: string
                    url?: string
                }
                Relationships: []
            }
            webscraper_domainscrapemethod: {
                Row: {
                    domain_id: number
                    id: number
                    method_id: number | null
                }
                Insert: {
                    domain_id: number
                    id?: number
                    method_id?: number | null
                }
                Update: {
                    domain_id?: number
                    id?: number
                    method_id?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'webscraper_domainscr_domain_id_518e6c13_fk_webscrape'
                        columns: ['domain_id']
                        isOneToOne: true
                        referencedRelation: 'webscraper_domain'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'webscraper_domainscr_method_id_0fa76e4c_fk_webscrape'
                        columns: ['method_id']
                        isOneToOne: false
                        referencedRelation: 'webscraper_scrapemethod'
                        referencedColumns: ['id']
                    }
                ]
            }
            webscraper_headingstructure: {
                Row: {
                    data: Json
                    id: number
                    result_id: number
                }
                Insert: {
                    data: Json
                    id?: number
                    result_id: number
                }
                Update: {
                    data?: Json
                    id?: number
                    result_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'webscraper_headingst_result_id_a4ee1e04_fk_webscrape'
                        columns: ['result_id']
                        isOneToOne: true
                        referencedRelation: 'webscraper_scraperesult'
                        referencedColumns: ['id']
                    }
                ]
            }
            webscraper_image: {
                Row: {
                    alt: string
                    class_attr: string
                    id: number
                    id_attr: string
                    page_id: number
                    src: string
                }
                Insert: {
                    alt: string
                    class_attr: string
                    id?: number
                    id_attr: string
                    page_id: number
                    src: string
                }
                Update: {
                    alt?: string
                    class_attr?: string
                    id?: number
                    id_attr?: string
                    page_id?: number
                    src?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'webscraper_image_page_id_e38b3d36_fk_webscraper_webpage_id'
                        columns: ['page_id']
                        isOneToOne: false
                        referencedRelation: 'webscraper_webpage'
                        referencedColumns: ['id']
                    }
                ]
            }
            webscraper_link: {
                Row: {
                    class_attr: string
                    href: string
                    id: number
                    id_attr: string
                    page_id: number
                    text: string
                }
                Insert: {
                    class_attr: string
                    href: string
                    id?: number
                    id_attr: string
                    page_id: number
                    text: string
                }
                Update: {
                    class_attr?: string
                    href?: string
                    id?: number
                    id_attr?: string
                    page_id?: number
                    text?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'webscraper_link_page_id_a0c2dce0_fk_webscraper_webpage_id'
                        columns: ['page_id']
                        isOneToOne: false
                        referencedRelation: 'webscraper_webpage'
                        referencedColumns: ['id']
                    }
                ]
            }
            webscraper_scrapecombination: {
                Row: {
                    description: string
                    id: number
                    name: string
                }
                Insert: {
                    description: string
                    id?: number
                    name: string
                }
                Update: {
                    description?: string
                    id?: number
                    name?: string
                }
                Relationships: []
            }
            webscraper_scrapecombination_methods: {
                Row: {
                    id: number
                    scrapecombination_id: number
                    scrapemethod_id: number
                }
                Insert: {
                    id?: number
                    scrapecombination_id: number
                    scrapemethod_id: number
                }
                Update: {
                    id?: number
                    scrapecombination_id?: number
                    scrapemethod_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'webscraper_scrapecom_scrapecombination_id_47471ae7_fk_webscrape'
                        columns: ['scrapecombination_id']
                        isOneToOne: false
                        referencedRelation: 'webscraper_scrapecombination'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'webscraper_scrapecom_scrapemethod_id_e9740a5d_fk_webscrape'
                        columns: ['scrapemethod_id']
                        isOneToOne: false
                        referencedRelation: 'webscraper_scrapemethod'
                        referencedColumns: ['id']
                    }
                ]
            }
            webscraper_scrapehistory: {
                Row: {
                    date_scraped: string
                    id: number
                    status: string
                    task_id: number
                }
                Insert: {
                    date_scraped: string
                    id?: number
                    status: string
                    task_id: number
                }
                Update: {
                    date_scraped?: string
                    id?: number
                    status?: string
                    task_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'webscraper_scrapehis_task_id_029eef34_fk_webscrape'
                        columns: ['task_id']
                        isOneToOne: false
                        referencedRelation: 'webscraper_scrapetask'
                        referencedColumns: ['id']
                    }
                ]
            }
            webscraper_scrapemethod: {
                Row: {
                    description: string
                    id: number
                    name: string
                }
                Insert: {
                    description: string
                    id?: number
                    name: string
                }
                Update: {
                    description?: string
                    id?: number
                    name?: string
                }
                Relationships: []
            }
            webscraper_scraperesult: {
                Row: {
                    content: string
                    content_hash: string | null
                    content_length: number
                    id: number
                    last_updated: string
                    title: string
                    url_id: number
                }
                Insert: {
                    content: string
                    content_hash?: string | null
                    content_length: number
                    id?: number
                    last_updated: string
                    title: string
                    url_id: number
                }
                Update: {
                    content?: string
                    content_hash?: string | null
                    content_length?: number
                    id?: number
                    last_updated?: string
                    title?: string
                    url_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'webscraper_scraperes_url_id_129d3952_fk_webscrape'
                        columns: ['url_id']
                        isOneToOne: false
                        referencedRelation: 'webscraper_webpage'
                        referencedColumns: ['id']
                    }
                ]
            }
            webscraper_scrapetask: {
                Row: {
                    date_added: string
                    force_new_scrape: boolean
                    id: number
                    preprocess_status: string
                    priority: number
                    scrape_result_id: number | null
                    scrape_status: string
                    url_to_scrape: string
                    webpage_id: number | null
                }
                Insert: {
                    date_added: string
                    force_new_scrape: boolean
                    id?: number
                    preprocess_status: string
                    priority: number
                    scrape_result_id?: number | null
                    scrape_status: string
                    url_to_scrape: string
                    webpage_id?: number | null
                }
                Update: {
                    date_added?: string
                    force_new_scrape?: boolean
                    id?: number
                    preprocess_status?: string
                    priority?: number
                    scrape_result_id?: number | null
                    scrape_status?: string
                    url_to_scrape?: string
                    webpage_id?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'webscraper_scrapetas_scrape_result_id_3355a853_fk_webscrape'
                        columns: ['scrape_result_id']
                        isOneToOne: false
                        referencedRelation: 'webscraper_scraperesult'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'webscraper_scrapetas_webpage_id_9db537e0_fk_webscrape'
                        columns: ['webpage_id']
                        isOneToOne: false
                        referencedRelation: 'webscraper_webpage'
                        referencedColumns: ['id']
                    }
                ]
            }
            webscraper_sitemapcontent: {
                Row: {
                    content: string
                    domain_id: number
                    id: number
                    last_fetched: string
                }
                Insert: {
                    content: string
                    domain_id: number
                    id?: number
                    last_fetched: string
                }
                Update: {
                    content?: string
                    domain_id?: number
                    id?: number
                    last_fetched?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'webscraper_sitemapco_domain_id_09053f75_fk_webscrape'
                        columns: ['domain_id']
                        isOneToOne: false
                        referencedRelation: 'webscraper_domain'
                        referencedColumns: ['id']
                    }
                ]
            }
            webscraper_sitemapurl: {
                Row: {
                    domain_id: number
                    id: number
                    url: string
                }
                Insert: {
                    domain_id: number
                    id?: number
                    url: string
                }
                Update: {
                    domain_id?: number
                    id?: number
                    url?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'webscraper_sitemapur_domain_id_fe4a459b_fk_webscrape'
                        columns: ['domain_id']
                        isOneToOne: false
                        referencedRelation: 'webscraper_domain'
                        referencedColumns: ['id']
                    }
                ]
            }
            webscraper_structureddata: {
                Row: {
                    id: number
                    result_id: number
                    schema_org_data: Json
                }
                Insert: {
                    id?: number
                    result_id: number
                    schema_org_data: Json
                }
                Update: {
                    id?: number
                    result_id?: number
                    schema_org_data?: Json
                }
                Relationships: [
                    {
                        foreignKeyName: 'webscraper_structure_result_id_89d6b8f6_fk_webscrape'
                        columns: ['result_id']
                        isOneToOne: true
                        referencedRelation: 'webscraper_scraperesult'
                        referencedColumns: ['id']
                    }
                ]
            }
            webscraper_technologystack: {
                Row: {
                    category: string
                    cms_technology: string
                    domain_id: number
                    id: number
                    last_updated: string
                    version: string | null
                }
                Insert: {
                    category: string
                    cms_technology: string
                    domain_id: number
                    id?: number
                    last_updated: string
                    version?: string | null
                }
                Update: {
                    category?: string
                    cms_technology?: string
                    domain_id?: number
                    id?: number
                    last_updated?: string
                    version?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'webscraper_technolog_domain_id_921eb897_fk_webscrape'
                        columns: ['domain_id']
                        isOneToOne: false
                        referencedRelation: 'webscraper_domain'
                        referencedColumns: ['id']
                    }
                ]
            }
            webscraper_webpage: {
                Row: {
                    access_timestamp: string
                    content_type: string
                    domain_id: number
                    http_status: number
                    id: number
                    language: string
                    last_updated: string
                    link_headers: string
                    meta_tags: string
                    page_load_time: number | null
                    page_size: number | null
                    page_specific_cookies: string
                    redirection_info: string
                    url: string
                }
                Insert: {
                    access_timestamp: string
                    content_type: string
                    domain_id: number
                    http_status: number
                    id?: number
                    language: string
                    last_updated: string
                    link_headers: string
                    meta_tags: string
                    page_load_time?: number | null
                    page_size?: number | null
                    page_specific_cookies: string
                    redirection_info: string
                    url: string
                }
                Update: {
                    access_timestamp?: string
                    content_type?: string
                    domain_id?: number
                    http_status?: number
                    id?: number
                    language?: string
                    last_updated?: string
                    link_headers?: string
                    meta_tags?: string
                    page_load_time?: number | null
                    page_size?: number | null
                    page_specific_cookies?: string
                    redirection_info?: string
                    url?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'webscraper_webpage_domain_id_b14e7d7a_fk_webscraper_domain_id'
                        columns: ['domain_id']
                        isOneToOne: false
                        referencedRelation: 'webscraper_domain'
                        referencedColumns: ['id']
                    }
                ]
            }
            website_management_additionalip: {
                Row: {
                    hosting_provider_id: number
                    id: number
                    ip_address: unknown
                }
                Insert: {
                    hosting_provider_id: number
                    id?: number
                    ip_address: unknown
                }
                Update: {
                    hosting_provider_id?: number
                    id?: number
                    ip_address?: unknown
                }
                Relationships: [
                    {
                        foreignKeyName: 'website_management_a_hosting_provider_id_5ace2b24_fk_website_m'
                        columns: ['hosting_provider_id']
                        isOneToOne: false
                        referencedRelation: 'website_management_hostingprovider'
                        referencedColumns: ['id']
                    }
                ]
            }
            website_management_clientwebsite: {
                Row: {
                    client_id: number
                    id: number
                    industry: string
                    notes: string | null
                    offer_type: string
                    title: string
                    website_url: string
                }
                Insert: {
                    client_id: number
                    id?: number
                    industry: string
                    notes?: string | null
                    offer_type: string
                    title: string
                    website_url: string
                }
                Update: {
                    client_id?: number
                    id?: number
                    industry?: string
                    notes?: string | null
                    offer_type?: string
                    title?: string
                    website_url?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'website_management_c_client_id_3eb879bb_fk_client_ma'
                        columns: ['client_id']
                        isOneToOne: false
                        referencedRelation: 'client_management_client'
                        referencedColumns: ['id']
                    }
                ]
            }
            website_management_cmsplatform: {
                Row: {
                    admin_login_url: string
                    cms_platform: string
                    id: number
                    notes: string | null
                    primary_admin_password: string
                    primary_admin_username: string
                    specific_version: string
                    update_settings: string
                    website_id: number
                }
                Insert: {
                    admin_login_url: string
                    cms_platform: string
                    id?: number
                    notes?: string | null
                    primary_admin_password: string
                    primary_admin_username: string
                    specific_version: string
                    update_settings: string
                    website_id: number
                }
                Update: {
                    admin_login_url?: string
                    cms_platform?: string
                    id?: number
                    notes?: string | null
                    primary_admin_password?: string
                    primary_admin_username?: string
                    specific_version?: string
                    update_settings?: string
                    website_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'website_management_c_website_id_e474127a_fk_website_m'
                        columns: ['website_id']
                        isOneToOne: false
                        referencedRelation: 'website_management_clientwebsite'
                        referencedColumns: ['id']
                    }
                ]
            }
            website_management_controlpanelaccess: {
                Row: {
                    id: number
                    password: string
                    server_access_id: number
                    url: string
                    username: string
                }
                Insert: {
                    id?: number
                    password: string
                    server_access_id: number
                    url: string
                    username: string
                }
                Update: {
                    id?: number
                    password?: string
                    server_access_id?: number
                    url?: string
                    username?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'website_management_c_server_access_id_8874ee08_fk_website_m'
                        columns: ['server_access_id']
                        isOneToOne: false
                        referencedRelation: 'website_management_serveraccessdetail'
                        referencedColumns: ['id']
                    }
                ]
            }
            website_management_dnsrecord: {
                Row: {
                    dns_setting_id: number
                    id: number
                    record_type: string
                    record_value: string
                    ttl_setting: string
                }
                Insert: {
                    dns_setting_id: number
                    id?: number
                    record_type: string
                    record_value: string
                    ttl_setting: string
                }
                Update: {
                    dns_setting_id?: number
                    id?: number
                    record_type?: string
                    record_value?: string
                    ttl_setting?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'website_management_d_dns_setting_id_b69d4b5a_fk_website_m'
                        columns: ['dns_setting_id']
                        isOneToOne: false
                        referencedRelation: 'website_management_dnssetting'
                        referencedColumns: ['id']
                    }
                ]
            }
            website_management_dnssetting: {
                Row: {
                    id: number
                    name_server_details: string
                    notes: string | null
                    website_id: number
                }
                Insert: {
                    id?: number
                    name_server_details: string
                    notes?: string | null
                    website_id: number
                }
                Update: {
                    id?: number
                    name_server_details?: string
                    notes?: string | null
                    website_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'website_management_d_website_id_3b433d7d_fk_website_m'
                        columns: ['website_id']
                        isOneToOne: false
                        referencedRelation: 'website_management_clientwebsite'
                        referencedColumns: ['id']
                    }
                ]
            }
            website_management_domainnameregistrar: {
                Row: {
                    account_credentials: string
                    account_login_url: string
                    domain_expiration_date: string
                    id: number
                    notes: string | null
                    registrar_company_name: string
                    renewal_settings: string
                    support_contact_details: string
                    website_id: number
                }
                Insert: {
                    account_credentials: string
                    account_login_url: string
                    domain_expiration_date: string
                    id?: number
                    notes?: string | null
                    registrar_company_name: string
                    renewal_settings: string
                    support_contact_details: string
                    website_id: number
                }
                Update: {
                    account_credentials?: string
                    account_login_url?: string
                    domain_expiration_date?: string
                    id?: number
                    notes?: string | null
                    registrar_company_name?: string
                    renewal_settings?: string
                    support_contact_details?: string
                    website_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'website_management_d_website_id_e85ac3ae_fk_website_m'
                        columns: ['website_id']
                        isOneToOne: false
                        referencedRelation: 'website_management_clientwebsite'
                        referencedColumns: ['id']
                    }
                ]
            }
            website_management_ftpaccess: {
                Row: {
                    id: number
                    ip: unknown
                    password: string
                    port: number
                    server_access_id: number
                    username: string
                }
                Insert: {
                    id?: number
                    ip: unknown
                    password: string
                    port: number
                    server_access_id: number
                    username: string
                }
                Update: {
                    id?: number
                    ip?: unknown
                    password?: string
                    port?: number
                    server_access_id?: number
                    username?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'website_management_f_server_access_id_37730dc4_fk_website_m'
                        columns: ['server_access_id']
                        isOneToOne: false
                        referencedRelation: 'website_management_serveraccessdetail'
                        referencedColumns: ['id']
                    }
                ]
            }
            website_management_hostingprovider: {
                Row: {
                    account_credentials: string
                    account_login_url: string
                    any_secondary_or_backup_logins: string | null
                    hosting_provider_name: string
                    hosting_type: string
                    id: number
                    main_server_ip_address: unknown
                    notes: string | null
                    primary_account_login: string
                    support_contact_details: string
                    website_id: number
                }
                Insert: {
                    account_credentials: string
                    account_login_url: string
                    any_secondary_or_backup_logins?: string | null
                    hosting_provider_name: string
                    hosting_type: string
                    id?: number
                    main_server_ip_address: unknown
                    notes?: string | null
                    primary_account_login: string
                    support_contact_details: string
                    website_id: number
                }
                Update: {
                    account_credentials?: string
                    account_login_url?: string
                    any_secondary_or_backup_logins?: string | null
                    hosting_provider_name?: string
                    hosting_type?: string
                    id?: number
                    main_server_ip_address?: unknown
                    notes?: string | null
                    primary_account_login?: string
                    support_contact_details?: string
                    website_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'website_management_h_website_id_49e8e631_fk_website_m'
                        columns: ['website_id']
                        isOneToOne: false
                        referencedRelation: 'website_management_clientwebsite'
                        referencedColumns: ['id']
                    }
                ]
            }
            website_management_offer: {
                Row: {
                    id: number
                    notes: string | null
                    offer_type: string
                    website_id: number
                }
                Insert: {
                    id?: number
                    notes?: string | null
                    offer_type: string
                    website_id: number
                }
                Update: {
                    id?: number
                    notes?: string | null
                    offer_type?: string
                    website_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'website_management_o_website_id_49a141e6_fk_website_m'
                        columns: ['website_id']
                        isOneToOne: false
                        referencedRelation: 'website_management_clientwebsite'
                        referencedColumns: ['id']
                    }
                ]
            }
            website_management_product: {
                Row: {
                    category: string
                    date_added: string
                    description: string
                    ecommerce_id: string
                    id: number
                    notes: string | null
                    price: number
                    product_name: string
                    sku: string
                    website_id: number
                }
                Insert: {
                    category: string
                    date_added: string
                    description: string
                    ecommerce_id: string
                    id?: number
                    notes?: string | null
                    price: number
                    product_name: string
                    sku: string
                    website_id: number
                }
                Update: {
                    category?: string
                    date_added?: string
                    description?: string
                    ecommerce_id?: string
                    id?: number
                    notes?: string | null
                    price?: number
                    product_name?: string
                    sku?: string
                    website_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'website_management_p_website_id_8e277778_fk_website_m'
                        columns: ['website_id']
                        isOneToOne: false
                        referencedRelation: 'website_management_clientwebsite'
                        referencedColumns: ['id']
                    }
                ]
            }
            website_management_serveraccessdetail: {
                Row: {
                    id: number
                    notes: string | null
                    website_id: number
                }
                Insert: {
                    id?: number
                    notes?: string | null
                    website_id: number
                }
                Update: {
                    id?: number
                    notes?: string | null
                    website_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'website_management_s_website_id_da964f59_fk_website_m'
                        columns: ['website_id']
                        isOneToOne: false
                        referencedRelation: 'website_management_clientwebsite'
                        referencedColumns: ['id']
                    }
                ]
            }
            website_management_serverbackup: {
                Row: {
                    access_details_for_backup_storage: string
                    backup_retention_period: string
                    frequency: string
                    id: number
                    notes: string | null
                    storage_location: string
                    website_id: number
                }
                Insert: {
                    access_details_for_backup_storage: string
                    backup_retention_period: string
                    frequency: string
                    id?: number
                    notes?: string | null
                    storage_location: string
                    website_id: number
                }
                Update: {
                    access_details_for_backup_storage?: string
                    backup_retention_period?: string
                    frequency?: string
                    id?: number
                    notes?: string | null
                    storage_location?: string
                    website_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'website_management_s_website_id_a6f6d12a_fk_website_m'
                        columns: ['website_id']
                        isOneToOne: false
                        referencedRelation: 'website_management_clientwebsite'
                        referencedColumns: ['id']
                    }
                ]
            }
            website_management_service: {
                Row: {
                    category: string
                    date_added: string
                    description: string
                    duration: string
                    id: number
                    notes: string | null
                    price_range: string
                    service_name: string
                    website_id: number
                }
                Insert: {
                    category: string
                    date_added: string
                    description: string
                    duration: string
                    id?: number
                    notes?: string | null
                    price_range: string
                    service_name: string
                    website_id: number
                }
                Update: {
                    category?: string
                    date_added?: string
                    description?: string
                    duration?: string
                    id?: number
                    notes?: string | null
                    price_range?: string
                    service_name?: string
                    website_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'website_management_s_website_id_aca75019_fk_website_m'
                        columns: ['website_id']
                        isOneToOne: false
                        referencedRelation: 'website_management_clientwebsite'
                        referencedColumns: ['id']
                    }
                ]
            }
            website_management_sshaccess: {
                Row: {
                    id: number
                    ip: unknown
                    password_or_key: string
                    port: number
                    server_access_id: number
                    username: string
                }
                Insert: {
                    id?: number
                    ip: unknown
                    password_or_key: string
                    port: number
                    server_access_id: number
                    username: string
                }
                Update: {
                    id?: number
                    ip?: unknown
                    password_or_key?: string
                    port?: number
                    server_access_id?: number
                    username?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'website_management_s_server_access_id_5a8bd29b_fk_website_m'
                        columns: ['server_access_id']
                        isOneToOne: false
                        referencedRelation: 'website_management_serveraccessdetail'
                        referencedColumns: ['id']
                    }
                ]
            }
            website_management_sslcertificatedetail: {
                Row: {
                    certificate_provider: string
                    certificate_type: string
                    expiration_date: string
                    id: number
                    notes: string | null
                    ssl_account_credentials: string
                    ssl_certificate_installation_location: string
                    website_id: number
                }
                Insert: {
                    certificate_provider: string
                    certificate_type: string
                    expiration_date: string
                    id?: number
                    notes?: string | null
                    ssl_account_credentials: string
                    ssl_certificate_installation_location: string
                    website_id: number
                }
                Update: {
                    certificate_provider?: string
                    certificate_type?: string
                    expiration_date?: string
                    id?: number
                    notes?: string | null
                    ssl_account_credentials?: string
                    ssl_certificate_installation_location?: string
                    website_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'website_management_s_website_id_ccbdad18_fk_website_m'
                        columns: ['website_id']
                        isOneToOne: false
                        referencedRelation: 'website_management_clientwebsite'
                        referencedColumns: ['id']
                    }
                ]
            }
            website_management_webpage: {
                Row: {
                    accessibility_score: number
                    additional_info: Json | null
                    audience: string
                    backlinks: number
                    client_website_id: number
                    content_length: number | null
                    h1_tag: string
                    http_status_code: number | null
                    id: number
                    inbound_internal_links: number
                    language: string
                    last_page_update: string | null
                    load_time: number | null
                    meta_description: string
                    mobile_responsive: boolean
                    outbound_external_links: number
                    outbound_internal_links: number
                    page_purpose: string
                    page_url: string
                    primary_cta: string
                    redirects: string
                    response_code: number | null
                    seo_score: number
                    structured_data_score: number
                    technology_stack: string
                    title_tag: string
                }
                Insert: {
                    accessibility_score: number
                    additional_info?: Json | null
                    audience: string
                    backlinks: number
                    client_website_id: number
                    content_length?: number | null
                    h1_tag: string
                    http_status_code?: number | null
                    id?: number
                    inbound_internal_links: number
                    language: string
                    last_page_update?: string | null
                    load_time?: number | null
                    meta_description: string
                    mobile_responsive: boolean
                    outbound_external_links: number
                    outbound_internal_links: number
                    page_purpose: string
                    page_url: string
                    primary_cta: string
                    redirects: string
                    response_code?: number | null
                    seo_score: number
                    structured_data_score: number
                    technology_stack: string
                    title_tag: string
                }
                Update: {
                    accessibility_score?: number
                    additional_info?: Json | null
                    audience?: string
                    backlinks?: number
                    client_website_id?: number
                    content_length?: number | null
                    h1_tag?: string
                    http_status_code?: number | null
                    id?: number
                    inbound_internal_links?: number
                    language?: string
                    last_page_update?: string | null
                    load_time?: number | null
                    meta_description?: string
                    mobile_responsive?: boolean
                    outbound_external_links?: number
                    outbound_internal_links?: number
                    page_purpose?: string
                    page_url?: string
                    primary_cta?: string
                    redirects?: string
                    response_code?: number | null
                    seo_score?: number
                    structured_data_score?: number
                    technology_stack?: string
                    title_tag?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'website_management_w_client_website_id_a64e8f01_fk_website_m'
                        columns: ['client_website_id']
                        isOneToOne: false
                        referencedRelation: 'website_management_clientwebsite'
                        referencedColumns: ['id']
                    }
                ]
            }
            website_management_webpage_keywords: {
                Row: {
                    id: number
                    keyword_id: number
                    webpage_id: number
                }
                Insert: {
                    id?: number
                    keyword_id: number
                    webpage_id: number
                }
                Update: {
                    id?: number
                    keyword_id?: number
                    webpage_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'website_management_w_keyword_id_d4e82b81_fk_keyword_a'
                        columns: ['keyword_id']
                        isOneToOne: false
                        referencedRelation: 'keyword_analysis_keyword'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'website_management_w_webpage_id_82bc91bd_fk_website_m'
                        columns: ['webpage_id']
                        isOneToOne: false
                        referencedRelation: 'website_management_webpage'
                        referencedColumns: ['id']
                    }
                ]
            }
            workflows_action: {
                Row: {
                    function_io_id: number
                    id: number
                    io_destination: string
                    io_source: string
                    user_input_prompt: string | null
                    variable_id: number
                }
                Insert: {
                    function_io_id: number
                    id?: number
                    io_destination: string
                    io_source: string
                    user_input_prompt?: string | null
                    variable_id: number
                }
                Update: {
                    function_io_id?: number
                    id?: number
                    io_destination?: string
                    io_source?: string
                    user_input_prompt?: string | null
                    variable_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'workflows_action_function_io_id_37a7736a_fk_workflows'
                        columns: ['function_io_id']
                        isOneToOne: false
                        referencedRelation: 'workflows_functionparams'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'workflows_action_variable_id_f388240a_fk_workflows'
                        columns: ['variable_id']
                        isOneToOne: false
                        referencedRelation: 'workflows_variabledefinitions'
                        referencedColumns: ['id']
                    }
                ]
            }
            workflows_availablesystasks: {
                Row: {
                    id: number
                    is_automated: boolean
                    is_deleted: boolean
                    name: string
                }
                Insert: {
                    id?: number
                    is_automated: boolean
                    is_deleted: boolean
                    name: string
                }
                Update: {
                    id?: number
                    is_automated?: boolean
                    is_deleted?: boolean
                    name?: string
                }
                Relationships: []
            }
            workflows_functioniometadata: {
                Row: {
                    created_by_id: number | null
                    description: string | null
                    function_io_id: number
                    id: number
                    last_update: string
                    purpose: string | null
                    updated_by_id: number | null
                }
                Insert: {
                    created_by_id?: number | null
                    description?: string | null
                    function_io_id: number
                    id?: number
                    last_update: string
                    purpose?: string | null
                    updated_by_id?: number | null
                }
                Update: {
                    created_by_id?: number | null
                    description?: string | null
                    function_io_id?: number
                    id?: number
                    last_update?: string
                    purpose?: string | null
                    updated_by_id?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'workflows_functionio_created_by_id_e0aad1de_fk_auth_user'
                        columns: ['created_by_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'workflows_functionio_function_io_id_e504b862_fk_workflows'
                        columns: ['function_io_id']
                        isOneToOne: true
                        referencedRelation: 'workflows_functionparams'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'workflows_functionio_updated_by_id_4dcd6488_fk_auth_user'
                        columns: ['updated_by_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    }
                ]
            }
            workflows_functionmetadata: {
                Row: {
                    created_by_id: number | null
                    custom_params: Json | null
                    description: string | null
                    function_id: number
                    id: number
                    last_update: string
                    permissions: Json | null
                    purpose: string | null
                    status: string
                    type: string | null
                    updated_by_id: number | null
                }
                Insert: {
                    created_by_id?: number | null
                    custom_params?: Json | null
                    description?: string | null
                    function_id: number
                    id?: number
                    last_update: string
                    permissions?: Json | null
                    purpose?: string | null
                    status: string
                    type?: string | null
                    updated_by_id?: number | null
                }
                Update: {
                    created_by_id?: number | null
                    custom_params?: Json | null
                    description?: string | null
                    function_id?: number
                    id?: number
                    last_update?: string
                    permissions?: Json | null
                    purpose?: string | null
                    status?: string
                    type?: string | null
                    updated_by_id?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'workflows_functionme_created_by_id_dc24966b_fk_auth_user'
                        columns: ['created_by_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'workflows_functionme_function_id_99c94f0b_fk_workflows'
                        columns: ['function_id']
                        isOneToOne: true
                        referencedRelation: 'workflows_functionregistry'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'workflows_functionme_updated_by_id_189472e7_fk_auth_user'
                        columns: ['updated_by_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    }
                ]
            }
            workflows_functionparams: {
                Row: {
                    actual_name: string
                    data_type: string
                    function_id: number
                    id: number
                    io_type: string
                    is_required: boolean
                }
                Insert: {
                    actual_name: string
                    data_type: string
                    function_id: number
                    id?: number
                    io_type: string
                    is_required: boolean
                }
                Update: {
                    actual_name?: string
                    data_type?: string
                    function_id?: number
                    id?: number
                    io_type?: string
                    is_required?: boolean
                }
                Relationships: [
                    {
                        foreignKeyName: 'workflows_functionpa_function_id_3089717e_fk_workflows'
                        columns: ['function_id']
                        isOneToOne: false
                        referencedRelation: 'workflows_functionregistry'
                        referencedColumns: ['id']
                    }
                ]
            }
            workflows_functionregistry: {
                Row: {
                    app_name: string | null
                    entity_name: string
                    id: number
                    is_class: boolean
                    is_deleted: boolean
                    method_name: string | null
                    module_path: string | null
                    name: string
                }
                Insert: {
                    app_name?: string | null
                    entity_name: string
                    id?: number
                    is_class: boolean
                    is_deleted: boolean
                    method_name?: string | null
                    module_path?: string | null
                    name: string
                }
                Update: {
                    app_name?: string | null
                    entity_name?: string
                    id?: number
                    is_class?: boolean
                    is_deleted?: boolean
                    method_name?: string | null
                    module_path?: string | null
                    name?: string
                }
                Relationships: []
            }
            workflows_systaskinstance: {
                Row: {
                    end_time: string | null
                    function_call_detail_id: number
                    id: number
                    start_time: string
                    status: string
                    success_score: number
                    systask_id: number
                    workflow_instance_id: number
                }
                Insert: {
                    end_time?: string | null
                    function_call_detail_id: number
                    id?: number
                    start_time: string
                    status: string
                    success_score: number
                    systask_id: number
                    workflow_instance_id: number
                }
                Update: {
                    end_time?: string | null
                    function_call_detail_id?: number
                    id?: number
                    start_time?: string
                    status?: string
                    success_score?: number
                    systask_id?: number
                    workflow_instance_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'workflows_systaskins_function_call_detail_0f31a674_fk_workflows'
                        columns: ['function_call_detail_id']
                        isOneToOne: false
                        referencedRelation: 'workflows_taskfunctionsequence'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'workflows_systaskins_systask_id_3d0434e5_fk_workflows'
                        columns: ['systask_id']
                        isOneToOne: false
                        referencedRelation: 'workflows_availablesystasks'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'workflows_systaskins_workflow_instance_id_c503a0be_fk_workflows'
                        columns: ['workflow_instance_id']
                        isOneToOne: false
                        referencedRelation: 'workflows_workflowinstance'
                        referencedColumns: ['id']
                    }
                ]
            }
            workflows_systaskmetadata: {
                Row: {
                    created_by_id: number | null
                    custom_params: Json | null
                    description: string | null
                    id: number
                    last_update: string
                    permissions: Json | null
                    purpose: string | null
                    status: string
                    systask_id: number
                    type: string
                    updated_by_id: number | null
                }
                Insert: {
                    created_by_id?: number | null
                    custom_params?: Json | null
                    description?: string | null
                    id?: number
                    last_update: string
                    permissions?: Json | null
                    purpose?: string | null
                    status: string
                    systask_id: number
                    type: string
                    updated_by_id?: number | null
                }
                Update: {
                    created_by_id?: number | null
                    custom_params?: Json | null
                    description?: string | null
                    id?: number
                    last_update?: string
                    permissions?: Json | null
                    purpose?: string | null
                    status?: string
                    systask_id?: number
                    type?: string
                    updated_by_id?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'workflows_systaskmet_created_by_id_61a34086_fk_auth_user'
                        columns: ['created_by_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'workflows_systaskmet_systask_id_6e4e4203_fk_workflows'
                        columns: ['systask_id']
                        isOneToOne: true
                        referencedRelation: 'workflows_availablesystasks'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'workflows_systaskmet_updated_by_id_dcd0fc1e_fk_auth_user'
                        columns: ['updated_by_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    }
                ]
            }
            workflows_taskactionsequence: {
                Row: {
                    action_id: number
                    depends_on_id: number | null
                    id: number
                    sequence_order: number
                    systask_id: number
                }
                Insert: {
                    action_id: number
                    depends_on_id?: number | null
                    id?: number
                    sequence_order: number
                    systask_id: number
                }
                Update: {
                    action_id?: number
                    depends_on_id?: number | null
                    id?: number
                    sequence_order?: number
                    systask_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'workflows_taskaction_action_id_7ab7497d_fk_workflows'
                        columns: ['action_id']
                        isOneToOne: false
                        referencedRelation: 'workflows_action'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'workflows_taskaction_depends_on_id_a80d8436_fk_workflows'
                        columns: ['depends_on_id']
                        isOneToOne: false
                        referencedRelation: 'workflows_taskactionsequence'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'workflows_taskaction_systask_id_c3d356e5_fk_workflows'
                        columns: ['systask_id']
                        isOneToOne: false
                        referencedRelation: 'workflows_availablesystasks'
                        referencedColumns: ['id']
                    }
                ]
            }
            workflows_taskfunctionsequence: {
                Row: {
                    depends_on_id: number | null
                    function_id: number
                    id: number
                    task_id: number
                }
                Insert: {
                    depends_on_id?: number | null
                    function_id: number
                    id?: number
                    task_id: number
                }
                Update: {
                    depends_on_id?: number | null
                    function_id?: number
                    id?: number
                    task_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'workflows_taskfuncti_depends_on_id_530b52be_fk_workflows'
                        columns: ['depends_on_id']
                        isOneToOne: false
                        referencedRelation: 'workflows_taskfunctionsequence'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'workflows_taskfuncti_function_id_619e55cd_fk_workflows'
                        columns: ['function_id']
                        isOneToOne: false
                        referencedRelation: 'workflows_functionregistry'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'workflows_taskfuncti_task_id_61c9a805_fk_workflows'
                        columns: ['task_id']
                        isOneToOne: false
                        referencedRelation: 'workflows_availablesystasks'
                        referencedColumns: ['id']
                    }
                ]
            }
            workflows_variabledefinitions: {
                Row: {
                    data_status: string | null
                    data_type: string
                    id: number
                    name: string
                    purpose: string | null
                }
                Insert: {
                    data_status?: string | null
                    data_type: string
                    id?: number
                    name: string
                    purpose?: string | null
                }
                Update: {
                    data_status?: string | null
                    data_type?: string
                    id?: number
                    name?: string
                    purpose?: string | null
                }
                Relationships: []
            }
            workflows_variablemetadata: {
                Row: {
                    created_by_id: number | null
                    custom_params: Json | null
                    description: string | null
                    example_data: string | null
                    example_pretty: string | null
                    id: number
                    last_update: string
                    permissions: Json | null
                    status: string
                    updated_by_id: number | null
                    variable_id: number
                }
                Insert: {
                    created_by_id?: number | null
                    custom_params?: Json | null
                    description?: string | null
                    example_data?: string | null
                    example_pretty?: string | null
                    id?: number
                    last_update: string
                    permissions?: Json | null
                    status: string
                    updated_by_id?: number | null
                    variable_id: number
                }
                Update: {
                    created_by_id?: number | null
                    custom_params?: Json | null
                    description?: string | null
                    example_data?: string | null
                    example_pretty?: string | null
                    id?: number
                    last_update?: string
                    permissions?: Json | null
                    status?: string
                    updated_by_id?: number | null
                    variable_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'workflows_variableme_created_by_id_20bc24c0_fk_auth_user'
                        columns: ['created_by_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'workflows_variableme_updated_by_id_e3c240dc_fk_auth_user'
                        columns: ['updated_by_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'workflows_variableme_variable_id_53eb2743_fk_workflows'
                        columns: ['variable_id']
                        isOneToOne: true
                        referencedRelation: 'workflows_variabledefinitions'
                        referencedColumns: ['id']
                    }
                ]
            }
            workflows_varinstance: {
                Row: {
                    id: number
                    value: string
                    variable_id: number
                    workflow_instance_id: number
                }
                Insert: {
                    id?: number
                    value: string
                    variable_id: number
                    workflow_instance_id: number
                }
                Update: {
                    id?: number
                    value?: string
                    variable_id?: number
                    workflow_instance_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'workflows_varinstanc_variable_id_b4274324_fk_workflows'
                        columns: ['variable_id']
                        isOneToOne: false
                        referencedRelation: 'workflows_variabledefinitions'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'workflows_varinstanc_workflow_instance_id_dcaa8ac5_fk_workflows'
                        columns: ['workflow_instance_id']
                        isOneToOne: false
                        referencedRelation: 'workflows_workflowinstance'
                        referencedColumns: ['id']
                    }
                ]
            }
            workflows_workflowinstance: {
                Row: {
                    end_time: string | null
                    errors: Json | null
                    id: number
                    start_time: string
                    status: string
                    user_id: number | null
                    workflow_id: number
                }
                Insert: {
                    end_time?: string | null
                    errors?: Json | null
                    id?: number
                    start_time: string
                    status: string
                    user_id?: number | null
                    workflow_id: number
                }
                Update: {
                    end_time?: string | null
                    errors?: Json | null
                    id?: number
                    start_time?: string
                    status?: string
                    user_id?: number | null
                    workflow_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'workflows_workflowin_workflow_id_2fff7f1d_fk_workflows'
                        columns: ['workflow_id']
                        isOneToOne: false
                        referencedRelation: 'workflows_workflowstructure'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'workflows_workflowinstance_user_id_c55ab175_fk_auth_user_id'
                        columns: ['user_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    }
                ]
            }
            workflows_workflowmetadata: {
                Row: {
                    created_by_id: number | null
                    custom_params: Json | null
                    description: string | null
                    id: number
                    last_update: string
                    permissions: Json | null
                    purpose: string | null
                    status: string
                    updated_by_id: number | null
                    workflow_id: number
                }
                Insert: {
                    created_by_id?: number | null
                    custom_params?: Json | null
                    description?: string | null
                    id?: number
                    last_update: string
                    permissions?: Json | null
                    purpose?: string | null
                    status: string
                    updated_by_id?: number | null
                    workflow_id: number
                }
                Update: {
                    created_by_id?: number | null
                    custom_params?: Json | null
                    description?: string | null
                    id?: number
                    last_update?: string
                    permissions?: Json | null
                    purpose?: string | null
                    status?: string
                    updated_by_id?: number | null
                    workflow_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'workflows_workflowme_created_by_id_b6ccd360_fk_auth_user'
                        columns: ['created_by_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'workflows_workflowme_updated_by_id_f837543c_fk_auth_user'
                        columns: ['updated_by_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'workflows_workflowme_workflow_id_69f5ec8b_fk_workflows'
                        columns: ['workflow_id']
                        isOneToOne: true
                        referencedRelation: 'workflows_workflowstructure'
                        referencedColumns: ['id']
                    }
                ]
            }
            workflows_workflowstructure: {
                Row: {
                    id: number
                    is_automated: boolean
                    is_deleted: boolean
                    name: string
                    system_priority: number
                    updated_by_id: number | null
                }
                Insert: {
                    id?: number
                    is_automated: boolean
                    is_deleted: boolean
                    name: string
                    system_priority: number
                    updated_by_id?: number | null
                }
                Update: {
                    id?: number
                    is_automated?: boolean
                    is_deleted?: boolean
                    name?: string
                    system_priority?: number
                    updated_by_id?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'workflows_workflowst_updated_by_id_3e13ffa4_fk_auth_user'
                        columns: ['updated_by_id']
                        isOneToOne: false
                        referencedRelation: 'auth_user'
                        referencedColumns: ['id']
                    }
                ]
            }
            workflows_workflowtasksequence: {
                Row: {
                    async_count: number
                    depends_on_id: number | null
                    id: number
                    systask_id: number
                    task_priority: number
                    workflow_id: number
                }
                Insert: {
                    async_count: number
                    depends_on_id?: number | null
                    id?: number
                    systask_id: number
                    task_priority: number
                    workflow_id: number
                }
                Update: {
                    async_count?: number
                    depends_on_id?: number | null
                    id?: number
                    systask_id?: number
                    task_priority?: number
                    workflow_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'workflows_workflowta_depends_on_id_b4fceac7_fk_workflows'
                        columns: ['depends_on_id']
                        isOneToOne: false
                        referencedRelation: 'workflows_workflowtasksequence'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'workflows_workflowta_systask_id_9ce8e258_fk_workflows'
                        columns: ['systask_id']
                        isOneToOne: false
                        referencedRelation: 'workflows_availablesystasks'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'workflows_workflowta_workflow_id_0432fd7d_fk_workflows'
                        columns: ['workflow_id']
                        isOneToOne: false
                        referencedRelation: 'workflows_workflowstructure'
                        referencedColumns: ['id']
                    }
                ]
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

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
    PublicTableNameOrOptions extends
        | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
              Database[PublicTableNameOrOptions['schema']]['Views'])
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
          Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
          Row: infer R
      }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
      ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
            Row: infer R
        }
          ? R
          : never
      : never

export type TablesInsert<
    PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Insert: infer I
      }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
      ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
            Insert: infer I
        }
          ? I
          : never
      : never

export type TablesUpdate<
    PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Update: infer U
      }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
      ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
            Update: infer U
        }
          ? U
          : never
      : never

export type Enums<
    PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
        : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
      ? PublicSchema['Enums'][PublicEnumNameOrOptions]
      : never

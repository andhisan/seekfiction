export interface AdminConfig {
  web: {
    auth: string;
  };
  algolia: {
    app_id: string;
    admin_api_key: string;
    search_api_key: string;
  };
  simkl: {
    client_id: string;
  };
}

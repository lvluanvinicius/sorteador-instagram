declare interface FacebookAccounts {
  instagram_business_account: {
    id: string;
  };
  access_token: string;
  category: string;
  category_list: {
    id: string;
    name: string;
  }[];
  name: string;
  id: string;
  tasks: string[];
}

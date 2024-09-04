declare interface PrismaApiResponse<T> {
  data: T;
  total_pages: number;
  current_page: number;
}

declare interface ActionsResponse<T> {
  message: string;
  status: boolean;
  type: string;
  data: T;
  errors?: {
    [key: string]: string;
  };
}

declare interface PrismaActionResponse<T> {
  message: string;
  status: boolean;
  data: T;
}

declare interface InstagramReturnApi<T> {
  data: T;
  paging: {
    cursors: {
      before: string;
      after: string;
    };
  };
}

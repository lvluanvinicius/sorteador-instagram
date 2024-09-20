import { transformSearchParams } from "@/utils/urls";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { ChevronFirst, ChevronLast } from "lucide-react";
import { Button } from "@chakra-ui/react";

interface PaginateProps {
  pages: number;
  current_page: number;
}

export function Paginate({ pages, current_page }: PaginateProps) {
  const router = useRouter();

  function handlePage(action: string | null) {
    const currentPage = router.query as { page: string | null };

    if (action === "next") {
      if (currentPage.page) {
        const page = parseInt(currentPage.page);

        const change = page + 1;

        if (change > pages) {
          return;
        }

        handlePageChange(change.toString());
      } else {
        handlePageChange((2).toString());
      }
    } else if (action === "previous") {
      if (currentPage.page) {
        const page = parseInt(currentPage.page);

        handlePageChange((page - 1).toString());
      }
    } else {
      handlePageChange((2).toString());
    }
  }

  const handlePageChange = useCallback(
    (page: string) => {
      router.query.page = page;
      if (page === "1" || page === "0") {
        delete router.query.page;
      }

      const queryParams = transformSearchParams(router.query);

      router.push({
        pathname: router.pathname,
        query: queryParams,
      });
    },
    [router]
  );

  return (
    <div className="dark:bg-slate-700 rounded flex justify-center items-center py-1">
      <div className="flex justify-between items-center w-full px-2">
        <div className="text-sm">
          Página {current_page} de {pages} paginas
        </div>
        <div>
          <Button bg={"none"} onClick={() => handlePage("previous")}>
            <ChevronFirst size={20} />
          </Button>
          <Button bg={"none"} onClick={() => handlePage("next")}>
            <ChevronLast size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}

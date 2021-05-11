import { cleanObj } from "./index";
import { User } from "./../screens/project-list/search-panel";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";
import { useEffect } from "react";
export const useUsers = (param?: Partial<User>) => {
  const { run, ...result } = useAsync<Users[]>();
  const client = useHttp();
  useEffect(() => {
    run(
      client("users", {
        data: cleanObj(param || null),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  return result;
};

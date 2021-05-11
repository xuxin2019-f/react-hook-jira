import { cleanObj } from "./index";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";
import { Project } from "./../screens/project-list/list";
import { useEffect } from "react";
export const useProject = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const client = useHttp();
  useEffect(() => {
    run(
      client("projects", {
        data: cleanObj(param || null),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  return result;
};

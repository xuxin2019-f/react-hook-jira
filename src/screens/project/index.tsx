import React from "react";
import { Link } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router";
import { KanBanScreen } from "screens/kanban/index";
import { EpicScreen } from "screens/epic/index";
export const ProjectScreen = () => {
  return (
    <div>
      {/* 看板和任务组 如果加上/就是跟路由，不加就自动拼接到上层路由 */}
      <Link to={"kanban"} />
      <Link to={"epic"} />
      <Routes>
        {/* projects/:projectId/kanban | epic */}
        <Route path={"/kanban"} element={KanBanScreen} />
        <Route path={"/epic"} element={EpicScreen} />
        {/* 如果都不匹配，默认来到看板 */}
        <Navigate to={window.location.pathname + "/kanban"}></Navigate>
      </Routes>
    </div>
  );
};

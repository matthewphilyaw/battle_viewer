defmodule RoboViewer.PageController do
  use RoboViewer.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end

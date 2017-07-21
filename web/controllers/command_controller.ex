defmodule RoboViewer.CommandController do
  use RoboViewer.Web, :controller

  alias RoboViewer.Endpoint

  require Logger

  def update(conn, data) do
    Logger.info(inspect(data))
    Endpoint.broadcast! "command:center", "command", data
    conn
    |> put_status(:ok)
    |> json(%{ status: "ok" })
  end
end

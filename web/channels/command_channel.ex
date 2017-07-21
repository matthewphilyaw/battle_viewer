defmodule RoboViewer.CommandChannel do
  use RoboViewer.Web, :channel

  require Logger

  def join("command:center", _payload, socket) do
    Logger.info "channel joined"
    {:ok, socket}
  end
end
